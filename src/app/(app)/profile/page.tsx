"use client";

import { Check, LoaderCircle, Save, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, ThemeToggle } from "@/components/design-system";
import { updateUserProfile, watchCurrentUser } from "@/lib/auth/client";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");

  useEffect(() => watchCurrentUser((user) => {
    if (!user) return;
    setName(user.displayName || "");
    setPhotoURL(user.photoURL || "");
    setEmail(user.email || "");
  }), []);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setStatus("saving");
    try {
      await updateUserProfile({ displayName: name.trim() || "PromptLab learner", photoURL: photoURL.trim() || null });
      setStatus("saved");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch (saveError) {
      setStatus("idle");
      setError(saveError instanceof Error ? saveError.message : "We couldn't save your profile.");
    }
  };

  return (
    <main className="profile-page">
      <header className="profile-page-header">
        <Link className="brand-lockup" href="/dashboard" aria-label="Back to dashboard">
          <span className="brand-mark"><span /></span>
          <span>PromptLab</span>
        </Link>
        <div className="profile-page-actions">
          <ThemeToggle />
          <Link className="profile-back-link" href="/dashboard">Back to dashboard</Link>
        </div>
      </header>

      <section className="profile-page-content">
        <div className="profile-page-heading">
          <span className="eyebrow-chip"><UserRound size={14} /> Your workspace identity</span>
          <h1>Profile settings</h1>
          <p>Keep your name and avatar up to date so PromptLab feels like your own lab.</p>
        </div>

        <form className="profile-settings-grid" onSubmit={save}>
          <section className="profile-card profile-card-preview">
            <div className="profile-preview-frame">
              <Avatar name={name || "PromptLab learner"} initials={(name || "PL").slice(0, 2)} src={photoURL} size="lg" alt="Profile preview" />
            </div>
            <strong>{name || "PromptLab learner"}</strong>
            <span>{email || "Signed-in learner"}</span>
            <p>Your avatar URL is used when Firebase supports a profile photo.</p>
          </section>

          <section className="profile-card">
            <h2>Personal details</h2>
            <p className="profile-card-copy">These details appear in your signed-in workspace.</p>
            <label className="profile-field">
              <span>Display name</span>
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" maxLength={60} />
            </label>
            <label className="profile-field">
              <span>Avatar URL</span>
              <input value={photoURL} onChange={(event) => setPhotoURL(event.target.value)} placeholder="https://..." type="url" />
            </label>
            <label className="profile-field">
              <span>Email address</span>
              <input value={email} readOnly aria-readonly="true" />
            </label>
            {error && <p className="profile-error" role="alert">{error}</p>}
            <button className="profile-save-button" type="submit" disabled={status === "saving"}>
              {status === "saving" ? <LoaderCircle className="spin" size={18} /> : status === "saved" ? <Check size={18} /> : <Save size={18} />}
              {status === "saving" ? "Saving..." : status === "saved" ? "Saved" : "Save profile"}
            </button>
          </section>

          <section className="profile-card" id="preferences">
            <h2>Preferences</h2>
            <p className="profile-card-copy">Choose your appearance from the theme control above. More learning preferences can live here as they become available.</p>
            <div className="profile-preference-row">
              <div><strong>Appearance</strong><span>Light, dark, or system theme</span></div>
              <ThemeToggle />
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}
