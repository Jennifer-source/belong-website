import React, { useEffect, useId, useRef, useState } from "react";
import { Check, CheckCircle2, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ContextSource } from "../types";
import { CONTEXT_SOURCES } from "../data/orientation";

/* ============================================================
   Button
   ============================================================ */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger-ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const cls = ["btn", `btn-${variant}`, size !== "md" ? `btn-${size}` : "", loading ? "is-loading" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {children}
    </button>
  );
}

/* ============================================================
   Icon — sized wrapper around lucide
   ============================================================ */
export function Icon({
  icon: LucideIconCmp,
  size = 18,
  label,
  className,
}: {
  icon: LucideIcon;
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <LucideIconCmp
      size={size}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      strokeWidth={1.75}
    />
  );
}

/* ============================================================
   Chip — filter pill (button) or static tag
   ============================================================ */
export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Chip({ label, selected = false, onPress }: ChipProps) {
  if (!onPress) {
    return <span className="chip">{label}</span>;
  }
  return (
    <button type="button" className="chip" aria-pressed={selected} onClick={onPress}>
      {label}
    </button>
  );
}

/* ============================================================
   ContextTag — the epistemic label (General context /
   University guidance / Ask a human)
   ============================================================ */
export function ContextTag({ source }: { source: ContextSource }) {
  const meta = CONTEXT_SOURCES.find((s) => s.id === source);
  if (!meta) return null;
  return (
    <span className={`context-tag context-${source}`} title={meta.gloss}>
      <span className="context-dot" aria-hidden="true" />
      {meta.label}
      <span className="sr-only"> — {meta.gloss}</span>
    </span>
  );
}

/* ============================================================
   Modal — accessible dialog with focus trap and restore
   ============================================================ */
export interface ModalProps {
  labelledBy: string;
  onClose: () => void;
  children: React.ReactNode;
  closeLabel?: string;
}

export function Modal({ labelledBy, onClose, children, closeLabel = "Close dialog" }: ModalProps) {
  const panelRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => !el.hasAttribute("disabled"));

    panelRef.current?.focus();

    /** The Tab-trap above only sees key presses. Focus can also escape when a
        focused control is removed from the DOM — e.g. the Explainer's "Show
        level" button is replaced by a note once all five levels are revealed.
        Pull focus back so keyboard users are never stranded behind the overlay. */
    const containFocus = (e: FocusEvent) => {
      if (e.target instanceof Node && panelRef.current?.contains(e.target)) return;
      panelRef.current?.focus();
    };
    document.addEventListener("focusin", containFocus);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Removed before restoring focus so this cleanup's own focus() call is
      // not intercepted by the guard.
      document.removeEventListener("focusin", containFocus);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <dialog
        ref={panelRef}
        open
        aria-labelledby={labelledBy}
        aria-modal="true"
        tabIndex={-1}
        className="modal-panel"
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label={closeLabel}>
          <X size={18} aria-hidden="true" />
        </button>
        {children}
      </dialog>
    </div>
  );
}

/* ============================================================
   Toast
   ============================================================ */
export function Toast({ message }: { message: string }) {
  return (
    <div className="toast" role="status">
      <CheckCircle2 size={16} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

/* ============================================================
   EmptyState — narrative, never a bare "no results"
   ============================================================ */
export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: EmptyIcon, title, body, action }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-icon">
        <EmptyIcon size={20} strokeWidth={1.75} />
      </div>
      <p className="empty-title">{title}</p>
      <p className="empty-body">{body}</p>
      {action}
    </div>
  );
}

/* ============================================================
   Skeleton — loading placeholder
   ============================================================ */
export function Skeleton({ label }: { label?: string }) {
  return (
    <div aria-hidden={label ? undefined : true} aria-label={label} role={label ? "status" : undefined}>
      <div className="skeleton-line" style={{ width: "38%" }} />
      <div className="skeleton-line" style={{ width: "72%" }} />
      <div className="skeleton-line" style={{ width: "60%" }} />
    </div>
  );
}

/* ============================================================
   DemoTag — marks conceptual/demo content
   ============================================================ */
export function DemoTag({ children = "Demo content" }: { children?: React.ReactNode }) {
  return <span className="demo-note">{children}</span>;
}

/* ============================================================
   ChannelModal — the honest result of tapping a support channel:
   the message template, ready to copy, with the demo boundary stated.
   ============================================================ */
export function ChannelModal({
  channelLabel,
  resourceTitle,
  detail,
  message,
  onClose,
}: {
  channelLabel: string;
  resourceTitle: string;
  detail: string;
  message?: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const msgId = useId();
  /** null = idle, "ok" = copied, "manual" = clipboard blocked; text pre-selected. */
  const [copied, setCopied] = useState<null | "ok" | "manual">(null);

  const copy = async () => {
    const text = message ?? detail;
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
    } catch {
      /* Non-secure context or permission denied — select the text and let the
         user finish the copy with Ctrl/Cmd+C. Never claim a copy didn't happen. */
      let selected = false;
      const el = document.getElementById(msgId);
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        try {
          selected = document.execCommand("copy");
        } catch {
          selected = false;
        }
        if (!selected) sel?.removeAllRanges();
      }
      setCopied(selected ? "ok" : "manual");
    }
    window.setTimeout(() => setCopied(null), 2600);
  };

  return (
    <Modal labelledBy={titleId} onClose={onClose} closeLabel={`Close ${channelLabel}`}>
      <div style={{ padding: "var(--s4)" }}>
        <p className="micro-label" style={{ marginBottom: 8 }}>
          {resourceTitle} · {channelLabel}
        </p>
        <h2 id={titleId} className="h-section" style={{ fontSize: "clamp(20px, 2.6vw, 26px)" }}>
          Ready when you are
        </h2>
        <p className="lede" style={{ fontSize: 14.5, marginTop: "var(--s2)" }}>
          {detail}
        </p>
        {message && (
          <>
            <p className="micro-label" style={{ margin: "var(--s3) 0 8px" }}>
              A first message you can adapt
            </p>
            <blockquote id={msgId} className="suggested-message">{message}</blockquote>
            <Button variant="secondary" size="sm" style={{ marginTop: "var(--s2)" }} onClick={copy}>
              {copied === "ok" ? (
                <>
                  <Check size={15} aria-hidden="true" /> Copied
                </>
              ) : copied === "manual" ? (
                "Text selected — press Ctrl/⌘+C"
              ) : (
                "Copy message"
              )}
            </Button>
          </>
        )}
        <p className="tiny" style={{ color: "var(--muted-2)", marginTop: "var(--s3)", marginBottom: 0, lineHeight: 1.6 }}>
          This is a design prototype — the contact details are illustrative. In a live version this step would
          hand you to the real service.
        </p>
      </div>
    </Modal>
  );
}

/* ============================================================
   ResearchPlaceholder — structured slot for future evidence.
   Makes explicit that a finding belongs here after the study,
   without fabricating anything.
   ============================================================ */
export function ResearchPlaceholder({
  title,
  plannedContent,
  method,
  compact = false,
}: {
  title: string;
  plannedContent: string;
  method: string;
  status?: "planned" | "awaiting-data" | "in-progress";
  compact?: boolean;
}) {
  return (
    <div className={`research-slot${compact ? " compact" : ""}`}>
      <div className="research-slot-head">
        <span className="micro-label">{title}</span>
        <span className="slot-status">Planned</span>
      </div>
      {!compact && (
        <>
          <p className="research-slot-body">{plannedContent}</p>
          <p className="tiny" style={{ color: "var(--muted-2)", margin: 0 }}>
            <strong>Method:</strong> {method}
          </p>
        </>
      )}
    </div>
  );
}


