import { createPublicKey, createVerify } from "node:crypto";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function adminAuth() {
  const app = getApps()[0] ?? initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
  return getAuth(app);
}

type FirebaseClaims = {
  aud: string;
  exp: number;
  iss: string;
  sub: string;
  user_id?: string;
};

let certificates: { expiresAt: number; values: Record<string, string> } | null = null;

async function verifyWithFirebaseCertificates(idToken: string): Promise<FirebaseClaims> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error("Firebase project configuration is missing.");

  const [encodedHeader, encodedPayload, encodedSignature] = idToken.split(".");
  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw new Error("Invalid Firebase token.");
  }

  const header = JSON.parse(Buffer.from(encodedHeader, "base64url").toString()) as { alg?: string; kid?: string };
  const claims = JSON.parse(Buffer.from(encodedPayload, "base64url").toString()) as FirebaseClaims;
  if (header.alg !== "RS256" || !header.kid || claims.aud !== projectId ||
      claims.iss !== `https://securetoken.google.com/${projectId}` ||
      !claims.sub || claims.sub !== claims.user_id || claims.exp <= Math.floor(Date.now() / 1000)) {
    throw new Error("Invalid Firebase token claims.");
  }

  if (!certificates || certificates.expiresAt <= Date.now()) {
    const response = await fetch("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com");
    if (!response.ok) throw new Error("Unable to fetch Firebase signing keys.");
    const values = await response.json() as Record<string, string>;
    const cacheControl = response.headers.get("cache-control") ?? "";
    const maxAge = Number(cacheControl.match(/max-age=(\d+)/)?.[1] ?? 3600);
    certificates = { values, expiresAt: Date.now() + maxAge * 1000 };
  }

  const certificate = certificates.values[header.kid];
  if (!certificate) throw new Error("Unknown Firebase signing key.");
  const verifier = createVerify("RSA-SHA256");
  verifier.update(`${encodedHeader}.${encodedPayload}`);
  verifier.end();
  if (!verifier.verify(createPublicKey(certificate), Buffer.from(encodedSignature, "base64url"))) {
    throw new Error("Invalid Firebase token signature.");
  }
  return claims;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.idToken !== "string" || body.idToken.length < 20) {
    return NextResponse.json({ error: "Invalid session request." }, { status: 400 });
  }

  try {
    const hasAdminCredentials = process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY;
    const decoded = hasAdminCredentials
      ? await adminAuth().verifyIdToken(body.idToken)
      : await verifyWithFirebaseCertificates(body.idToken);
    const response = NextResponse.json({ ok: true });
    response.cookies.set("promptlab_session", body.idToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });
    response.headers.set("X-User-Id", "uid" in decoded ? decoded.uid : decoded.sub);
    return response;
  } catch (error) {
    console.error("Firebase session verification failed.", error);
    return NextResponse.json({ error: "Unable to establish session." }, { status: 401 });
  }
}
