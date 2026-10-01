import { useState } from "react";
import { Eye, SearchX, ShieldCheck, SlidersHorizontal } from "lucide-react";
import type { CommunityEvent } from "../types";
import { communityEvents } from "../data/events";
import { EventCard, EventDetailModal } from "../components/cards";
import { Button, DemoTag, EmptyState, Icon } from "../components/ui";

interface CommunityProps {
  interestedIds: string[];
  onToggleInterest: (event: CommunityEvent) => void;
  comfortLevel: "quiet" | "balanced" | "chatty" | null;
  onComfortChange: (level: "quiet" | "balanced" | "chatty" | null) => void;
}

const COMFORT_ORDER = ["quiet", "balanced", "chatty"] as const;

/**
 * TRACEABILITY (h2, h7):
 *  - Comfort filter: social participation as an interaction problem — the
 *    student sets the conversation level they want; events are pre-labelled.
 *  - Empty state: “No events match your comfort level yet” + the smallest
 *    next action, never a bare “no results”.
 */
export function Community({ interestedIds, onToggleInterest, comfortLevel, onComfortChange }: CommunityProps) {
  const [openEvent, setOpenEvent] = useState<CommunityEvent | null>(null);

  const filtered =
    comfortLevel === null || comfortLevel === "chatty"
      ? communityEvents
      : communityEvents.filter((ev) => {
          if (comfortLevel === "quiet") return ev.conversationLevel === "quiet";
          return ev.conversationLevel === "quiet" || ev.conversationLevel === "balanced";
        });

  return (
    <div className="shell page">
      <section className="page-hero">
        <p className="eyebrow">Community</p>
        <h1 className="h-display" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
          Connection without <em>social pressure.</em>
        </h1>
        <p className="lede">
          Every event shows its group size, activity, conversation level, duration, location, and access notes
          before you decide anything — and expressing interest is always reversible.
        </p>
      </section>

      <div className="card panel-sage handoff-note" style={{ marginBottom: "var(--s4)", alignItems: "center" }}>
        <Icon icon={Eye} size={20} />
        <p style={{ margin: 0 }}>
          <strong>You can browse anonymously.</strong> Nothing is shared with organisers until you choose to
          express interest — and even then, only your first name.
        </p>
        <DemoTag>Demo events</DemoTag>
      </div>

      {/* Comfort dial — the student sets the social intensity they want */}
      <section className="section" aria-labelledby="comfort-title" style={{ marginBottom: "var(--s4)" }}>
        <div className="comfort-bar">
          <span className="micro-label" id="comfort-title">
            <Icon icon={SlidersHorizontal} size={13} /> Match my comfort level
          </span>
          <div className="comfort-pills" role="radiogroup" aria-labelledby="comfort-title">
            <button
              type="button"
              className={`chip${comfortLevel === null ? " chip-on" : ""}`}
              role="radio"
              aria-checked={comfortLevel === null}
              onClick={() => onComfortChange(null)}
            >
              Show everything
            </button>
            {COMFORT_ORDER.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip${comfortLevel === c ? " chip-on" : ""}`}
                role="radio"
                aria-checked={comfortLevel === c}
                onClick={() => onComfortChange(c)}
              >
                {c === "quiet" ? "Quiet first" : c === "balanced" ? "Some conversation" : "All conversation levels"}
              </button>
            ))}
          </div>
          {comfortLevel && (
            <p className="tiny" style={{ color: "var(--muted-2)", margin: 0 }}>
              {comfortLevel === "quiet" && "Showing quiet events only."}
              {comfortLevel === "balanced" && "Showing quiet and medium-conversation events."}
              {comfortLevel === "chatty" && "Showing every conversation level, talkative ones included."}
            </p>
          )}
        </div>
      </section>

      <section aria-label="Upcoming events">
        <div className="section-head">
          <h2 className="h-section" style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}>
            Coming up
          </h2>
          <span className="tiny" style={{ color: "var(--muted)" }}>
            {filtered.length} of {communityEvents.length} events · representative demo data
          </span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No events match your comfort level yet"
            body="That's not a dead end — the calendar changes weekly. Try expanding your search, or browse everything to see what's coming."
            action={
              <div style={{ display: "flex", gap: "var(--s2)", justifyContent: "center", flexWrap: "wrap" }}>
                <Button variant="secondary" size="sm" onClick={() => onComfortChange(null)}>
                  Show all events
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onComfortChange("balanced")}>
                  Try “some conversation”
                </Button>
              </div>
            }
          />
        ) : (
          <div className="event-list">
            {filtered.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                interested={interestedIds.includes(ev.id)}
                onToggleInterest={() => onToggleInterest(ev)}
                onOpen={() => setOpenEvent(ev)}
              />
            ))}
          </div>
        )}
      </section>

      <section aria-label="How joining works" style={{ marginTop: "var(--s6)" }}>
        <div className="card panel handoff-note">
          <Icon icon={ShieldCheck} size={20} />
          <p style={{ margin: 0 }}>
            <strong>Designed for safer participation.</strong> Group size, activity type, conversation level,
            duration, location context and access notes are shown up front. Leaving early is normal here; “no”
            is a complete sentence.
          </p>
        </div>
      </section>

      {openEvent && (
        <EventDetailModal
          event={openEvent}
          interested={interestedIds.includes(openEvent.id)}
          onToggleInterest={() => onToggleInterest(openEvent)}
          onClose={() => setOpenEvent(null)}
        />
      )}
    </div>
  );
}
