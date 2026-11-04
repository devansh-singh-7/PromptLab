import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.idToken !== "string" || body.idToken.length < 20) {
    return NextResponse.json({ error: "Invalid session request." }, { status: 400 });
  }

  try {
    const decoded = await adminAuth().verifyIdToken(body.idToken);
    const response = NextResponse.json({ ok: true });
    response.cookies.set("promptlab_session", body.idToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });
    response.headers.set("X-User-Id", decoded.uid);
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to establish session." }, { status: 401 });
  }
}
