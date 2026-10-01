import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import type { ScreenId } from "../types";
import { Modal } from "./ui";

/* ============================================================
   Icon registry (data-layer names → Lucide components)
   ============================================================ */
import {
  Bookmark, BookOpen, Bus, FileText, Globe, GraduationCap,
  MessageSquare, ShoppingBasket,
} from "lucide-react";

const CATEGORY_ICON_COMPONENTS = {
  "shopping-basket": ShoppingBasket,
  bus: Bus,
  "graduation-cap": GraduationCap,
  globe: Globe,
  "file-text": FileText,
  "message-square": MessageSquare,
} as const;

export type CategoryIconKey = keyof typeof CATEGORY_ICON_COMPONENTS;

export function CategoryIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Cmp = CATEGORY_ICON_COMPONENTS[name as CategoryIconKey] ?? BookOpen;
  return <Cmp size={size} strokeWidth={1.75} aria-hidden="true" />;
}

/* ============================================================
   TopBar
   ============================================================ */
export const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "explore", label: "Explore" },
  { id: "community", label: "Community" },
  { id: "help", label: "Help" },
];

interface TopBarProps {
  screen: ScreenId;
  onNavigate: (s: ScreenId) => void;
  savedCount: number;
}

export function TopBar({ screen, onNavigate, savedCount }: TopBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel when the screen changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [screen]);

  // Close the panel on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = onNavigate;

  return (
    <>
      <header className={`topbar${scrolled ? " scrolled" : ""}`}>
        <div className="shell topbar-inner">
          <button type="button" className="brand" onClick={() => go("home")} aria-label="BELONG — go to Home">
            <span className="brand-mark" aria-hidden="true">B</span>
            BELONG
          </button>

          <nav className="topnav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                aria-current={screen === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="topbar-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => go("help")}
              aria-label="Get help from a human"
              title="Get help"
            >
              <Phone size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`icon-btn${savedCount > 0 ? " has-badge" : ""}`}
              onClick={() => go("explore")}
              aria-label={savedCount > 0 ? `Saved items: ${savedCount} — open Explore` : "Saved items — open Explore"}
              title="Saved"
            >
              <Bookmark size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="mobile-nav" className="mobile-nav">
          <nav className="mobile-nav-list" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                aria-current={screen === item.id ? "page" : undefined}
              >
                {item.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

/* ============================================================
   Footer
   ============================================================ */
export function Footer({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  const [a11yOpen, setA11yOpen] = useState(false);
  const a11yTitleId = "a11y-statement-title";

  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div>
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true">B</span>
            BELONG
          </div>
          <p className="footer-note" style={{ marginTop: 12 }}>
            An interaction-design prototype exploring how digital tools can help international students feel
            oriented, connected, and confident in their first weeks. All content is illustrative.
          </p>
        </div>
        <div className="footer-links">
          <button type="button" onClick={() => onNavigate("research")}>
            Research notes
          </button>
          <button type="button" onClick={() => onNavigate("help")}>
            Get help
          </button>
          <button type="button" onClick={() => setA11yOpen(true)}>
            Accessibility
          </button>
        </div>
      </div>

      {a11yOpen && (
        <Modal labelledBy={a11yTitleId} onClose={() => setA11yOpen(false)} closeLabel="Close accessibility statement">
          <div style={{ padding: "var(--s4)" }}>
            <h2 id={a11yTitleId} className="h-section" style={{ fontSize: "clamp(20px, 2.6vw, 26px)" }}>
              Accessibility statement
            </h2>
            <p className="lede" style={{ fontSize: 14.5, marginTop: "var(--s2)" }}>
              This prototype is built to WCAG-informed practice: semantic landmarks, a visible focus state,
              keyboard operability (Escape closes dialogs), ARIA labelling for icon-only controls, reduced-motion
              support, and contrast-checked palette pairings.
            </p>
            <p className="body-muted" style={{ fontSize: 14, marginTop: "var(--s2)" }}>
              As an exploratory prototype it has not yet been audited with assistive-technology users — that
              evaluation is part of the planned usability testing. Barriers found during testing will be
              documented and fixed in the iteration log.
            </p>
          </div>
        </Modal>
      )}
    </footer>
  );
}
