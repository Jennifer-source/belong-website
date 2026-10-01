import { useCallback, useEffect, useState } from "react";
import type { ScreenId } from "../types";

/**
 * Minimal hash router. Keeps deep links (#/explore) and the back button
 * working without a router dependency — appropriate for a prototype.
 */
const VALID: ScreenId[] = ["welcome", "home", "explore", "community", "help", "research"];

function parse(): ScreenId {
  const raw = window.location.hash.replace(/^#\/?/, "") as ScreenId;
  return VALID.includes(raw) ? raw : "welcome";
}

export function useHashRoute() {
  const [screen, setScreen] = useState<ScreenId>(parse);

  useEffect(() => {
    const onHash = () => setScreen(parse());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((next: ScreenId) => {
    if (next === "welcome") {
      // The welcome screen is the app root.
      history.replaceState(null, "", window.location.pathname);
      setScreen("welcome");
    } else if (parse() !== next) {
      window.location.hash = `/${next}`;
    } else {
      setScreen(next);
    }
  }, []);

  return { screen, navigate };
}

/** Smooth-scrolls to top; instant when the user prefers reduced motion. */
export function scrollTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
