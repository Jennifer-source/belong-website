import { useId } from "react";
import {
  ArrowRight, ArrowUpRight, BookmarkPlus, BookmarkCheck, Check,
  Compass, Footprints, Heart, HelpCircle, Landmark, MapPin,
  PhoneCall, Sparkles, Users, Accessibility as AccessibilityIcon,
} from "lucide-react";
import type { CommunityEvent, EscalationTierId, SupportResource, Topic } from "../types";
import { CATEGORY_ICONS } from "../data/pathways";
import { topicCategories } from "../data/topics";
import { ACTIVITY_TYPE_LABELS, CONVERSATION_LEVEL_LABELS } from "../data/events";
import { ESCALATION_TIERS } from "../data/support";
import { formatDuration, formatEventDate, formatTime12h } from "../lib/dates";
import { Button, ContextTag, DemoTag, Icon, Modal } from "./ui";
import { CategoryIcon } from "./layout";

/* ============================================================
   TopicCard — Explore & Home
   ============================================================ */
const LEVEL_LABEL: Record<Topic["level"], string> = {
  starter: "Good first step",
  everyday: "Everyday",
  involved: "Takes planning",
};

interface TopicCardProps {
  topic: Topic;
  onExplain: (topic: Topic) => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function TopicCard({ topic, onExplain, isSaved, onToggleSave }: TopicCardProps) {
  const category = topicCategories.find((c) => c.id === topic.category);
  return (
    <article className="card card-interactive topic-card">
      <div className="topic-top">
        <span className="topic-icon" aria-hidden="true">
          <CategoryIcon name={CATEGORY_ICONS[topic.category] ?? "file-text"} size={20} />
        </span>
        <button
          type="button"
          className="icon-btn"
          style={{ width: 36, height: 36 }}
          onClick={onToggleSave}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove “${topic.title}” from saved` : `Save “${topic.title}”`}
          title={isSaved ? "Saved" : "Save"}
        >
          {isSaved ? <BookmarkCheck size={16} aria-hidden="true" /> : <BookmarkPlus size={16} aria-hidden="true" />}
        </button>
      </div>

      <div style={{ marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {category && <span className={`chip-static tag-${topic.category}`}>{category.label}</span>}
      </div>

      <h3>{topic.title}</h3>
      <p className="topic-summary">{topic.summary}</p>

      <div className="topic-foot">
        <span className="topic-level">{LEVEL_LABEL[topic.level]}</span>
        <button type="button" className="text-link" onClick={() => onExplain(topic)}>
          Explain this <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

/* ============================================================
   EventCard — Community list
   The card itself is plain content; the interactive elements are two
   real buttons (details, interest). No fake nesting, clean tab order.
   ============================================================ */
interface EventCardProps {
  event: CommunityEvent;
  interested: boolean;
  onToggleInterest: () => void;
  onOpen: () => void;
}

export function EventCard({ event, interested, onToggleInterest, onOpen }: EventCardProps) {
  const d = formatEventDate(event.date);
  const headingId = useId();
  return (
    <article className="card event-card">
      <div className="event-when">
        <span className="event-day">
          {d.relative === "today" ? "Today" : d.relative === "tomorrow" ? "Tmrw" : d.dayNumber}
          {d.relative === "later" && <span className="event-month"> {d.monthName.slice(0, 3)}</span>}
        </span>
        <span className="event-time">
          {event.time} · {formatDuration(event.durationMinutes)}
        </span>
      </div>

      <div className="event-main">
        <h3 id={headingId}>{event.title}</h3>
        <div className="event-meta">
          <span className={`chip-intensity intensity-${event.intensity}`}>
            <span className="dot" aria-hidden="true" />
            {CONVERSATION_LEVEL_LABELS[event.conversationLevel].split("—")[0].trim()}
          </span>
          <span className="meta-item">
            <Users size={13} aria-hidden="true" /> {event.attendees.min}–{event.attendees.max}
          </span>
          <span className="dot-sep" aria-hidden="true" />
          <span className="meta-item">
            <MapPin size={13} aria-hidden="true" /> {event.location}
          </span>
        </div>
      </div>

      <div className="event-side">
        <span className="event-going">{event.attendingCount} interested</span>
        <div className="event-side-actions">
          <Button variant="ghost" size="sm" onClick={onOpen} aria-describedby={headingId}>
            Details
          </Button>
          <Button
            variant={interested ? "secondary" : "primary"}
            size="sm"
            onClick={onToggleInterest}
            aria-pressed={interested}
            aria-describedby={headingId}
          >
            {interested ? (
              <>
                <Check size={15} aria-hidden="true" /> Interested
              </>
            ) : (
              "I'm interested"
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   EventDetailModal — the six-attribute safety preview:
   group size · activity type · conversation level · duration ·
   location · accessibility. All visible BEFORE joining (h2).
   ============================================================ */
interface EventDetailProps {
  event: CommunityEvent;
  interested: boolean;
  onToggleInterest: () => void;
  onClose: () => void;
}

export function EventDetailModal({ event, interested, onToggleInterest, onClose }: EventDetailProps) {
  const titleId = useId();
  const d = formatEventDate(event.date);
  return (
    <Modal labelledBy={titleId} onClose={onClose} closeLabel="Close event details">
      <div style={{ padding: "var(--s4)" }}>
        <div className="eyebrow" style={{ marginBottom: "var(--s2)" }}>
          <Icon icon={Sparkles} size={13} /> Community <DemoTag>Demo event</DemoTag>
        </div>

        <div className="event-detail-head">
          <h2 id={titleId} className="h-section" style={{ fontSize: "clamp(22px, 3vw, 30px)" }}>
            {event.title}
          </h2>
          <span className={`chip-intensity intensity-${event.intensity}`}>
            <span className="dot" aria-hidden="true" />
            {event.intensity === "low" ? "Low pressure" : "Some interaction"}
          </span>
        </div>

        <p className="lede" style={{ fontSize: 15, marginTop: "var(--s2)" }}>
          {event.description}
        </p>

        {/* Six-attribute preview — the psychological-safety layer */}
        <div className="event-detail-grid six">
          <div className="event-detail-cell">
            <span className="micro-label">Participants</span>
            <strong>
              {event.attendees.min}–{event.attendees.max} students
            </strong>
            <div className="small" style={{ color: "var(--muted)", marginTop: 2 }}>
              {event.attendingCount} interested right now
            </div>
          </div>
          <div className="event-detail-cell">
            <span className="micro-label">Activity</span>
            <strong>{ACTIVITY_TYPE_LABELS[event.activityType]}</strong>
            <div className="small" style={{ color: "var(--muted)", marginTop: 2 }}>
              What you'll actually be doing
            </div>
          </div>
          <div className="event-detail-cell">
            <span className="micro-label">Conversation</span>
            <strong>{CONVERSATION_LEVEL_LABELS[event.conversationLevel]}</strong>
            <div className="small" style={{ color: "var(--muted)", marginTop: 2 }}>
              You can opt out of talking at any point
            </div>
          </div>
          <div className="event-detail-cell">
            <span className="micro-label">When</span>
            <strong>
              {d.weekdayLong}, {d.dayNumber} {d.monthName}
            </strong>
            <div className="small" style={{ color: "var(--muted)", marginTop: 2 }}>
              {formatTime12h(event.time)} · {formatDuration(event.durationMinutes)}
            </div>
          </div>
          <div className="event-detail-cell">
            <span className="micro-label">Where</span>
            <strong>{event.location}</strong>
            <div className="small" style={{ color: "var(--muted)", marginTop: 2 }}>
              {event.locationNote}
            </div>
          </div>
          <div className="event-detail-cell">
            <span className="micro-label">Leaving early</span>
            <strong>Always fine</strong>
            <div className="small" style={{ color: "var(--muted)", marginTop: 2 }}>
              Nobody comments; no explanation owed
            </div>
          </div>
        </div>

        <div className="micro-label" style={{ marginBottom: 10 }}>
          Good to know before you go
        </div>
        <ul className="good-to-know">
          {event.goodToKnow.map((g, i) => (
            <li key={i}>
              <Check size={16} aria-hidden="true" />
              <span>{g}</span>
            </li>
          ))}
        </ul>

        <div className="accessibility-note">
          <AccessibilityIcon size={17} aria-hidden="true" />
          <span>
            <strong style={{ fontWeight: 700 }}>Access notes: </strong>
            {event.accessibility}
          </span>
        </div>

        <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "var(--s3) 0 var(--s2)" }} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s2)", alignItems: "center" }}>
          <Button onClick={onToggleInterest} aria-pressed={interested}>
            {interested ? (
              <>
                <Check size={15} aria-hidden="true" /> You're on the list
              </>
            ) : (
              "I'm interested"
            )}
          </Button>
          <span className="small" style={{ color: "var(--muted)" }}>
            Expressing interest isn't a commitment — you can change your mind any time.
          </span>
        </div>
      </div>
    </Modal>
  );
}

/* ============================================================
   SupportCard — Help, grouped by escalation tier
   ============================================================ */
const SUPPORT_ICON = {
  office: Landmark,
  peer: Users,
  wellbeing: Heart,
  urgent: PhoneCall,
} as const;

interface SupportCardProps {
  resource: SupportResource;
  onChannelOpen: (resource: SupportResource, channelLabel: string) => void;
}

export function SupportCard({ resource, onChannelOpen }: SupportCardProps) {
  const IconCmp = SUPPORT_ICON[resource.kind];
  const tier = ESCALATION_TIERS.find((t) => t.id === resource.tier);
  return (
    <article className={`card support-card support-kind-${resource.kind}`}>
      <div className="support-head">
        <span className="support-icon" aria-hidden="true">
          <IconCmp size={21} strokeWidth={1.75} />
        </span>
        <div>
          <h3>{resource.title}</h3>
          <span className="tiny" style={{ color: "var(--muted)" }}>
            {resource.hours}
          </span>
        </div>
      </div>

      {tier && (
        <div className="tier-tag">
          <ContextTag source={resource.tier === "peer" ? "human" : "official"} />
          <span className="tiny" style={{ color: "var(--muted-2)" }}>
            Rung {tier.rung} of 4
          </span>
        </div>
      )}

      <p className="when">
        <strong style={{ color: "var(--ink)", fontWeight: 600 }}>When to reach out: </strong>
        {resource.whenToReachOut}
      </p>
      <p className="when">{resource.description}</p>

      <details className="support-prep">
        <summary>What to have ready</summary>
        <ul className="support-prep-list">
          {resource.prepareChecklist.map((p, i) => (
            <li key={i}>
              <Check size={14} aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </details>

      <div className="channels">
        {resource.channels.map((ch) => (
          <button
            key={ch.id}
            type="button"
            className="support-channel"
            onClick={() => onChannelOpen(resource, ch.label)}
          >
            <span>
              <span className="channel-label">{ch.label}</span>
              <span className="channel-detail" style={{ display: "block" }}>
                {ch.detail}
              </span>
            </span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        ))}
      </div>

      <p className="tiny" style={{ color: "var(--muted-2)", margin: 0 }}>
        {resource.contactHint}
      </p>
    </article>
  );
}

/* ============================================================
   PathwayCard — Home needs
   ============================================================ */
const PATHWAY_ICON = {
  compass: Compass,
  help: HelpCircle,
  users: Users,
  heart: Heart,
} as const;

interface PathwayCardProps {
  icon: keyof typeof PATHWAY_ICON;
  question: string;
  support: string;
  onOpen: () => void;
  accent?: boolean;
}

export function PathwayCard({ icon, question, support, onOpen, accent }: PathwayCardProps) {
  const IconCmp = PATHWAY_ICON[icon];
  return (
    <button type="button" className={`pathway${accent ? " explain-pathway" : ""}`} onClick={onOpen}>
      <span className="pathway-icon" aria-hidden="true">
        <IconCmp size={20} strokeWidth={1.75} />
      </span>
      <span className="pathway-body">
        <span className="pathway-question">{question}</span>
        <span className="pathway-support">{support}</span>
      </span>
      <ArrowRight size={18} className="pathway-arrow" aria-hidden="true" />
    </button>
  );
}

/* ============================================================
   EscalationLadder — SELF-SERVICE → PEER → UNIVERSITY → URGENT
   Each rung states what it is for and when to move up (h5).
   ============================================================ */

export function EscalationLadder({ onGo }: { onGo: (tier: EscalationTierId) => void }) {
  return (
    <ol className="escalation-ladder">
      {ESCALATION_TIERS.map((t) => (
        <li key={t.id} className={`card ladder-rung rung-${t.id}`}>
          <div className="rung-head">
            <span className="rung-num" aria-hidden="true">
              {t.rung}
            </span>
            <div>
              <h3>{t.title}</h3>
              <p className="tiny" style={{ color: "var(--muted-2)", margin: 0 }}>
                {t.bestFor}
              </p>
            </div>
          </div>
          <p className="rung-behaviour">{t.behaviour}</p>
          <div className="rung-foot">
            <span className="tiny move-up">
              <Icon icon={Footprints} size={13} /> {t.moveUpWhen}
            </span>
            {t.id !== "urgent" && (
              <button type="button" className="text-link" onClick={() => onGo(t.id)}>
                {t.id === "self-service" ? "Open Explore" : t.id === "peer" ? "Find a peer" : "University contacts"}
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
