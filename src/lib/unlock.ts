"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ai-sales-academy:unlocked";

/**
 * Demo-only codes. This runs entirely client-side (localStorage), so it is
 * NOT secure — anyone can read these codes from the bundled JS. Replace with
 * a real backend check (API route + database) before going live.
 */
const VALID_CODES = ["AISALES2026", "DEMO2026"];

export function useUnlock() {
  const [unlocked, setUnlocked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUnlocked(window.localStorage.getItem(STORAGE_KEY) === "true");
    setLoaded(true);
  }, []);

  function redeem(code: string): boolean {
    const isValid = VALID_CODES.includes(code.trim().toUpperCase());
    if (isValid) {
      window.localStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    }
    return isValid;
  }

  function reset() {
    window.localStorage.removeItem(STORAGE_KEY);
    setUnlocked(false);
  }

  return { unlocked, loaded, redeem, reset };
}
