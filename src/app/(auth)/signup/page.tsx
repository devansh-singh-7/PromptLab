"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, KeyRound, LoaderCircle, Mail, ShieldAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthShell from "@/components/auth/AuthShell";
import {
  createSession,
  getGoogleRedirectCredential,
  signInWithGoogle,
  signUpWithPassword,
} from "@/lib/auth/client";
import { getSafeRedirect } from "@/lib/auth/redirect";

const schema = z.object({
  email: z.string().trim().email("That email doesn't look quite right"),
  password: z.string().min(6, "Use at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm your password"),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof schema>;

function authError(error: unknown) {
  const code = error instanceof Error && "code" in error ? String(error.code) : "";
  if (code === "auth/email-already-in-use") return "An account already exists for this email. Try signing in instead.";
  if (code === "auth/invalid-email") return "That email doesn't look quite right.";
  if (code === "auth/weak-password") return "Choose a stronger password with at least 6 characters.";
  if (code === "auth/unauthorized-domain") return "Google sign-in is not enabled for this site yet.";
  if (code === "auth/popup-blocked") return "Your browser blocked the Google sign-in window. Please allow popups and try again.";
  if (code === "auth/network-request-failed") return "Unable to reach auth services. Please check your network connection.";
  if (code === "auth/popup-closed-by-user") return "";
  return "We couldn't create your account. Please try again.";
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="auth-loading-page" aria-label="Loading signup" />}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const redirect = getSafeRedirect(searchParams.get("next"));
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const finish = async (credential: Awaited<ReturnType<typeof signUpWithPassword>>) => {
    await createSession(credential.user);
    setStatus("success");
    window.setTimeout(() => { window.location.assign(redirect); }, 400);
  };

  const submit = async (values: FormValues) => {
    setFormError("");
    setStatus("loading");
    try {
      await finish(await signUpWithPassword(values.email, values.password));
    } catch (error) {
      setStatus("idle");
      const message = authError(error);
      if (message) setFormError(message);
    }
  };

  const continueWithGoogle = async () => {
    setFormError("");
    setStatus("loading");
    try {
      const credential = await signInWithGoogle();
      if (!credential) return;
      await finish(credential);
    } catch (error) {
      setStatus("idle");
      const message = authError(error);
      if (message) setFormError(message);
    }
  };

  useEffect(() => {
    let active = true;
    void getGoogleRedirectCredential()
      .then(async (credential) => {
        if (!active || !credential) return;
        await finish(credential);
      })
      .catch((error) => {
        if (!active) return;
        setStatus("idle");
        const message = authError(error);
        if (message) setFormError(message);
      });
    return () => { active = false; };
  }, [redirect]);

  return (
    <AuthShell pipState={status === "success" ? "cheer" : "wave"}>
      <div className="auth-card">
        <div className="auth-card-heading">
          <span className="auth-card-kicker">Join PromptLab</span>
          <h2>Create your account</h2>
          <p>Start learning prompt engineering through hands-on, practical software challenges.</p>
        </div>

        {formError && (
          <div className="auth-form-alert" role="alert">
            <ShieldAlert size={17} className="shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
          <FieldError message={errors.email?.message} />
          <div className={`auth-field ${errors.email ? "has-error" : ""}`}>
            <Mail size={18} className="auth-field-icon shrink-0" aria-hidden="true" />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              aria-label="Email address"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </div>

          <div>
            <div className={`auth-field ${errors.password ? "has-error" : ""}`}>
              <KeyRound size={18} className="auth-field-icon shrink-0" aria-hidden="true" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Password (6+ characters)"
                aria-label="Password"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <FieldError message={errors.password?.message} />
          </div>

          <div>
            <div className={`auth-field ${errors.confirmPassword ? "has-error" : ""}`}>
              <KeyRound size={18} className="auth-field-icon shrink-0" aria-hidden="true" />
              <input
                type={showConfirmation ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm password"
                aria-label="Confirm password"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowConfirmation((value) => !value)}
                aria-label={showConfirmation ? "Hide confirmation" : "Show confirmation"}
              >
                {showConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <FieldError message={errors.confirmPassword?.message} />
          </div>

          <button className="auth-submit" type="submit" disabled={status !== "idle"}>
            {status === "loading" ? <LoaderCircle className="spin" size={19} /> : status === "success" ? (
              <span className="inline-flex items-center gap-2"><Check size={19} /> Account created</span>
            ) : "Create account"}
          </button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>

        <button className="auth-google" type="button" onClick={continueWithGoogle} disabled={status !== "idle"}>
          <GoogleMark /> Continue with Google
        </button>

        <p className="auth-create">
          Already have an account?{" "}
          <a href={`/login?next=${encodeURIComponent(redirect)}`}>Sign in</a>
        </p>
        <p className="auth-privacy">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </AuthShell>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="auth-field-error" role="alert">{message}</p> : null;
}

function GoogleMark() {
  return (
    <svg className="google-mark shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.35 12.27c0-.73-.07-1.43-.2-2.1H12v3.98h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.27Z" />
      <path fill="#34A853" d="M12 21.77c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.77Z" />
      <path fill="#FBBC05" d="M6.53 13.86A5.86 5.86 0 0 1 6.22 12c0-.65.11-1.28.31-1.86V7.61H3.29A9.77 9.77 0 0 0 2.25 12c0 1.58.38 3.08 1.04 4.39l3.24-2.53Z" />
      <path fill="#EA4335" d="M12 6.11c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.2 14.63 2.23 12 2.23a9.74 9.74 0 0 0-8.71 5.38l3.24 2.53C7.3 7.83 9.46 6.11 12 6.11Z" />
    </svg>
  );
}
