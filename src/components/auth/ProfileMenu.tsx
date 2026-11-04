"use client";

import { LogOut, Settings, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { signOutUser, watchCurrentUser } from "@/lib/auth/client";
import { Avatar } from "@/components/design-system";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [profile, setProfile] = useState({ name: "Devansh Singh", email: "", photoURL: "" });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => watchCurrentUser((user) => {
    if (!user) return;
    setProfile({
      name: user.displayName || "PromptLab learner",
      email: user.email || "",
      photoURL: user.photoURL || "",
    });
  }), []);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  const signOut = async () => {
    setSigningOut(true);
    try {
      await signOutUser();
      window.location.assign("/");
    } catch {
      setSigningOut(false);
    }
  };

  return (
    <div className="profile-menu" ref={menuRef}>
      <button
        className="profile-menu-trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Open profile menu for ${profile.name}`}
        onClick={() => setOpen((value) => !value)}
      >
        <Avatar name={profile.name} initials={profile.name.slice(0, 2)} src={profile.photoURL} size="sm" alt={`${profile.name}'s profile`} />
      </button>
      {open && (
        <div className="profile-menu-popover" role="menu">
          <div className="profile-menu-heading">
            <Avatar name={profile.name} initials={profile.name.slice(0, 2)} src={profile.photoURL} size="md" alt="" />
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.email || "Signed-in learner"}</span>
            </div>
          </div>
          <div className="profile-menu-divider" />
          <a href="/profile" role="menuitem" className="profile-menu-item" onClick={() => setOpen(false)}>
            <UserRound size={16} /> Profile settings
          </a>
          <a href="/profile#preferences" role="menuitem" className="profile-menu-item" onClick={() => setOpen(false)}>
            <Settings size={16} /> Preferences
          </a>
          <button type="button" role="menuitem" className="profile-menu-item is-danger" onClick={signOut} disabled={signingOut}>
            <LogOut size={16} /> {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}
