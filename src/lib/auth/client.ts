import { getApps, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
  type User,
  type UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseAuth() {
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    throw new Error("Firebase client configuration is missing.");
  }
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  return getAuth(app);
}

export async function signInWithPassword(email: string, password: string) {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithPassword(email: string, password: string) {
  const auth = getFirebaseAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle(): Promise<UserCredential | null> {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    const code = error instanceof Error && "code" in error ? String(error.code) : "";
    if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment") {
      await signInWithRedirect(auth, provider);
      return null;
    }
    throw error;
  }
}

export async function getGoogleRedirectCredential(): Promise<UserCredential | null> {
  const auth = getFirebaseAuth();
  return getRedirectResult(auth);
}

export async function createSession(user: UserCredential["user"]) {
  const token = await user.getIdToken();
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: token }),
  });
  if (!response.ok) throw new Error("We couldn't start your session. Please try again.");
}

export function watchCurrentUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export async function updateUserProfile(profile: { displayName: string; photoURL: string | null }) {
  const auth = getFirebaseAuth();
  if (!auth.currentUser) throw new Error("Your session has expired. Please sign in again.");
  await updateProfile(auth.currentUser, profile);
  return auth.currentUser;
}

export async function signOutUser() {
  await signOut(getFirebaseAuth());
  const response = await fetch("/api/auth/session", { method: "DELETE" });
  if (!response.ok) throw new Error("We couldn't sign you out completely. Please try again.");
}
