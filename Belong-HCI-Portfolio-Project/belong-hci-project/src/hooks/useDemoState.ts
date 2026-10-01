import { useCallback, useEffect, useState } from "react";
import type { SavedItem } from "../types";

const STORAGE_KEY = "belong.demo.state.v2";

export interface DemoState {
  /** Whether the welcome screen has been entered (persisted). */
  hasEntered: boolean;
  /** Whether the orientation-journey onboarding has been completed. */
  hasOnboarded: boolean;
  /** Index into the onboarding steps the student has reached. */
  progressStep: number;
  /** IDs selected in the latest "What feels hardest right now?" check-in. */
  uncertaintyIds: string[];
  /** When the check-in was last done (epoch ms). */
  checkedInAt: number | null;
  /** Community comfort filter: null = no preference set. */
  comfortLevel: "quiet" | "balanced" | "chatty" | null;
  saved: SavedItem[];
  interestedEventIds: string[];
}

const initialState: DemoState = {
  hasEntered: false,
  hasOnboarded: false,
  progressStep: 1,
  uncertaintyIds: [],
  checkedInAt: null,
  comfortLevel: null,
  saved: [],
  interestedEventIds: [],
};

function load(): DemoState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    return {
      hasEntered: Boolean(parsed.hasEntered),
      hasOnboarded: Boolean(parsed.hasOnboarded),
      progressStep: typeof parsed.progressStep === "number" ? parsed.progressStep : initialState.progressStep,
      uncertaintyIds: Array.isArray(parsed.uncertaintyIds) ? parsed.uncertaintyIds : [],
      checkedInAt: typeof parsed.checkedInAt === "number" ? parsed.checkedInAt : null,
      comfortLevel:
        parsed.comfortLevel === "quiet" || parsed.comfortLevel === "balanced" || parsed.comfortLevel === "chatty"
          ? parsed.comfortLevel
          : null,
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      interestedEventIds: Array.isArray(parsed.interestedEventIds) ? parsed.interestedEventIds : [],
    };
  } catch {
    return initialState;
  }
}

/** Demo state persisted to localStorage. All actions are reversible in the UI. */
export function useDemoState() {
  const [state, setState] = useState<DemoState>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable (private mode etc.) — prototype keeps working in memory */
    }
  }, [state]);

  const enterExperience = useCallback(() => {
    setState((s) => ({ ...s, hasEntered: true }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setState((s) => ({ ...s, hasOnboarded: true }));
  }, []);

  const advanceProgress = useCallback(() => {
    setState((s) => (s.progressStep < 4 ? { ...s, progressStep: s.progressStep + 1 } : s));
  }, []);

  /** Saves a check-in selection; selecting nothing is a valid answer. */
  const saveCheckIn = useCallback((ids: string[]) => {
    setState((s) => ({ ...s, uncertaintyIds: ids, checkedInAt: Date.now() }));
  }, []);

  const setComfortLevel = useCallback((level: DemoState["comfortLevel"]) => {
    setState((s) => ({ ...s, comfortLevel: level }));
  }, []);

  const toggleSaved = useCallback((item: SavedItem) => {
    setState((s) => {
      const exists = s.saved.some((x) => x.id === item.id);
      return {
        ...s,
        saved: exists ? s.saved.filter((x) => x.id !== item.id) : [...s.saved, item],
      };
    });
  }, []);

  const toggleInterest = useCallback((eventId: string) => {
    setState((s) => {
      const exists = s.interestedEventIds.includes(eventId);
      return {
        ...s,
        interestedEventIds: exists
          ? s.interestedEventIds.filter((id) => id !== eventId)
          : [...s.interestedEventIds, eventId],
      };
    });
  }, []);

  return {
    state,
    enterExperience,
    completeOnboarding,
    advanceProgress,
    saveCheckIn,
    setComfortLevel,
    toggleSaved,
    toggleInterest,
  };
}

export type DemoStateApi = ReturnType<typeof useDemoState>;
