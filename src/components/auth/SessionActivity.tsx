"use client";

import { useEffect } from "react";
import {
  createSession,
  getLastActivity,
  INACTIVITY_LIMIT_MS,
  markActivity,
  signOutUser,
  watchCurrentUser,
} from "@/lib/auth/client";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export default function SessionActivity() {
  useEffect(() => {
    let active = true;
    let currentUser: Parameters<Parameters<typeof watchCurrentUser>[0]>[0] = null;
    let lastRefresh = 0;

    const expireSession = async () => {
      try {
        await signOutUser();
      } catch (error) {
        console.error("Automatic sign-out failed.", error);
      } finally {
        if (active) window.location.assign("/login");
      }
    };

    const recordActivity = () => {
      if (!currentUser) return;
      const now = Date.now();
      const lastActivity = getLastActivity();
      if (lastActivity !== null && now - lastActivity >= INACTIVITY_LIMIT_MS) {
        void expireSession();
        return;
      }
      markActivity();
      if (now - lastRefresh < REFRESH_INTERVAL_MS) return;
      lastRefresh = now;
      void createSession(currentUser).catch((error) => {
        console.error("Session refresh failed.", error);
      });
    };

    const unsubscribe = watchCurrentUser((user) => {
      currentUser = user;
      if (!user) return;
      const lastActivity = getLastActivity();
      if (lastActivity !== null && Date.now() - lastActivity >= INACTIVITY_LIMIT_MS) {
        void expireSession();
        return;
      }
      markActivity();
      lastRefresh = Date.now();
    });

    const events = ["pointerdown", "keydown", "scroll", "touchstart", "focus"];
    events.forEach((event) => window.addEventListener(event, recordActivity, { passive: true }));
    return () => {
      active = false;
      unsubscribe();
      events.forEach((event) => window.removeEventListener(event, recordActivity));
    };
  }, []);

  return null;
}
