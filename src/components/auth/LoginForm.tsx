"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, KeyRound, LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthShell, { type AuthPipState } from "./AuthShell";
import { createSession, signInWithGoogle, signInWithPassword } from "@/lib/auth/client";
import { getSafeRedirect } from "@/lib/auth/redirect";

const schema = z.object({
  email: z.string().trim().email("That email doesn't look quite right"),
  password: z.string().min(1, "Enter your password to continue"),
});
type FormValues = z.infer<typeof schema>;

function friendlyAuthError(error: unknown) {
  const code = error instanceof Error && "code" in error ? String(error.code) : "";
  if (code === "auth/too-many-requests") return "Too many attempts for now. Wait a little, or reset your password.";
  if (code === "auth/network-request-failed") return "We couldn't reach the sign-in service. Check your connection and try again.";
  if (code === "auth/user-disabled") return "This account is currently disabled. Please contact support.";
  if (code === "auth/popup-closed-by-user") return null;
  return "Email or password didn't match. Try again or reset your password.";
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = getSafeRedirect(searchParams.get("next"));
  const reduced = useReducedMotion();
  const [pipState, setPipState] = useState<AuthPipState>("wave");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [emailTouched, setEmailTouched] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, trigger } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const email = watch("email");

  useEffect(() => {
    if (formError) setPipState("encourage");
  }, [formError]);

  const submit = async (values: FormValues) => {
    setFormError("");
    setStatus("loading");
    try {
      const credential = await signInWithPassword(values.email, values.password);
      await createSession(credential.user);
      setStatus("success");
      setPipState("cheer");
      window.setTimeout(() => { window.location.assign(redirect); }, 500);
    } catch (error) {
      setStatus("idle");
      const message = friendlyAuthError(error);
      if (message) setFormError(message);
      else setPipState("wave");
    }
  };

  const continueWithGoogle = async () => {
    setFormError("");
    setStatus("loading");
    try {
      const credential = await signInWithGoogle();
      if (!credential) return;
      await createSession(credential.user);
      setStatus("success");
      setPipState("cheer");
      window.setTimeout(() => { window.location.assign(redirect); }, 500);
    } catch (error) {
      setStatus("idle");
      const message = friendlyAuthError(error);
      if (message) setFormError(message);
    }
  };

  const emailRegistration = register("email", {
    onBlur: async () => {
      setEmailTouched(true);
      await trigger("email");
    },
  });
  const passwordRegistration = register("password");

  return (
    <AuthShell pipState={pipState}>
      <motion.div className="auth-card" initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 250, damping: 24 }}>
        <div className="auth-mobile-pip"><span className="auth-mobile-kicker">PromptLab</span><AuthPip state={pipState} /></div>
        <div className="auth-card-heading"><span className="auth-card-kicker">Good to see you</span><h2>Log in to your lab.</h2><p>Ready when you are. Your progress is waiting.</p></div>
        {formError && <motion.div className="auth-form-alert" role="alert" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}><ShieldCheck size={17} />{formError}</motion.div>}
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="auth-field-stagger" style={{ "--field-delay": "0ms" } as React.CSSProperties}>
            <div className={`auth-field ${errors.email ? "has-error" : ""} ${emailTouched && email && !errors.email ? "has-success" : ""}`}>
              <Mail size={18} className="auth-field-icon" />
              <input id="email" type="email" inputMode="email" autoComplete="email" placeholder=" " {...emailRegistration} onFocus={() => setPipState("think")} />
              <label htmlFor="email">Email address</label>
              {emailTouched && email && !errors.email && <Check className="auth-field-check" size={17} />}
            </div>
            {errors.email && <p className="auth-field-error" role="alert">{errors.email.message}</p>}
          </div>
          <div className="auth-field-stagger" style={{ "--field-delay": "70ms" } as React.CSSProperties}>
            <div className={`auth-field ${errors.password ? "has-error" : ""}`}>
              <KeyRound size={18} className="auth-field-icon" />
              <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder=" " {...passwordRegistration} ref={(element) => { passwordRegistration.ref(element); passwordRef.current = element; }} onFocus={() => setPipState("rest")} onKeyDown={(event) => setCapsLock(event.getModifierState("CapsLock"))} onKeyUp={(event) => setCapsLock(event.getModifierState("CapsLock"))} />
              <label htmlFor="password">Password</label>
              <button type="button" className="auth-password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {capsLock && <motion.p className="caps-hint" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>Caps Lock is on</motion.p>}
            {errors.password && <p className="auth-field-error" role="alert">{errors.password.message}</p>}
          </div>
          <div className="auth-form-options"><a href={`/forgot-password?next=${encodeURIComponent(redirect)}`}>Forgot password?</a></div>
          <button className={`auth-submit ${status === "success" ? "is-success" : ""}`} type="submit" disabled={isSubmitting || status === "loading" || status === "success"}>{status === "loading" ? <LoaderCircle className="spin" size={19} /> : status === "success" ? <Check size={19} /> : "Log in"}</button>
        </form>
        <div className="auth-divider"><span>or continue with</span></div>
        <button className="auth-google" type="button" onClick={continueWithGoogle} disabled={status !== "idle"}><GoogleMark /> Continue with Google</button>
        <p className="auth-create">New to PromptLab? <a href={`/signup?next=${encodeURIComponent(redirect)}`}>Create an account</a></p>
        <p className="auth-privacy">By continuing, you agree to learn with curiosity and kindness.</p>
      </motion.div>
    </AuthShell>
  );
}

function AuthPip({ state }: { state: AuthPipState }) {
  return <div className="auth-card-pip"><AuthPipInner state={state} /></div>;
}
function AuthPipInner({ state }: { state: AuthPipState }) {
  return <div aria-hidden="true"><span className={`pip-dot pip-${state}`} /><span className="pip-label">{state === "think" ? "Thinking with you" : state === "cheer" ? "You’re in!" : "Pip says hi"}</span></div>;
}
function GoogleMark() {
  return <svg className="google-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.27c0-.73-.07-1.43-.2-2.1H12v3.98h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.16c1.85-1.7 2.9-4.2 2.9-7.27Z" /><path fill="#34A853" d="M12 21.75c2.64 0 4.86-.87 6.48-2.36l-3.16-2.45c-.87.58-1.98.92-3.32.92-2.55 0-4.7-1.72-5.47-4.03H3.26v2.53A9.79 9.79 0 0 0 12 21.75Z" /><path fill="#FBBC05" d="M6.53 13.83a5.88 5.88 0 0 1 0-3.66V7.64H3.26a9.78 9.78 0 0 0 0 8.72l3.27-2.53Z" /><path fill="#EA4335" d="M12 6.14c1.44 0 2.73.5 3.75 1.48l2.81-2.81C16.85 3.12 14.63 2.25 12 2.25a9.79 9.79 0 0 0-8.74 5.39l3.27 2.53C7.3 7.86 9.45 6.14 12 6.14Z" /></svg>;
}
