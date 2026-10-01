import { useCallback, useEffect, useRef, useState } from "react";

export interface ToastApi {
  toast: string | null;
  notify: (message: string) => void;
}

/** Single-slot toast queue: each message replaces the previous and auto-dismisses. */
export function useToast(durationMs = 2600): ToastApi {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const notify = useCallback(
    (message: string) => {
      window.clearTimeout(timer.current);
      setToast(message);
      timer.current = window.setTimeout(() => setToast(null), durationMs);
    },
    [durationMs]
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { toast, notify };
}
