import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-loading-page" aria-label="Loading login" />}>
      <LoginForm />
    </Suspense>
  );
}
