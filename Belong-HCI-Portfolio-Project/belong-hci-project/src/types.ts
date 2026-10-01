/** Domain types for the BELONG prototype. Data lives in `src/data`. */

export type ScreenId = "welcome" | "home" | "explore" | "community" | "help" | "research";

export type TopicCategoryId =
  | "everyday-life"
  | "transport"
  | "university"
  | "culture"
  | "documents"
  | "communication";

export interface TopicCategory {
  id: TopicCategoryId;
  label: string;
}

/* ============================================================
   Context layer — epistemic status of any content shown
   ============================================================ */

/**
 * Every explanation distinguishes three sources so the interface never
 * presents assumptions as authoritative facts.
 */
export type ContextSource = "general" | "official" | "human";

export interface ContextSourceMeta {
  id: ContextSource;
  label: string;
  /** Short plain-language gloss of what this label promises. */
  gloss: string;
}

/* ============================================================
   Journey model — Arrival → Belonging
   ============================================================ */

export type JourneyStageId =
  | "arrival"
  | "orientation"
  | "understanding"
  | "everyday-confidence"
  | "community"
  | "belonging";

export interface JourneyStage {
  id: JourneyStageId;
  title: string;
  /** One-line description of what this stage feels like / is about. */
  description: string;
  /** What BELONG offers at this stage (maps to screens/features). */
  affordance: string;
}

/* ============================================================
   "Your first-week path" — uncertainty model
   ============================================================ */

export type PathAreaId = "getting-oriented" | "everyday-life" | "university" | "communication" | "community";

export interface PathArea {
  id: PathAreaId;
  label: string;
}

/**
 * One uncertainty the student may name during a check-in.
 * Maps to content recommendations — this is the model that lets the
 * interface respond to "what feels hardest right now?" without
 * pretending to know the student.
 */
export interface UncertaintyOption {
  id: string;
  /** First-person phrasing, as a student might say it. */
  statement: string;
  area: PathAreaId;
  /** Topic ids recommended when this is selected. */
  recommendTopics: string[];
  /** Where the interface suggests going next. */
  nextStep: {
    label: string;
    screen: ScreenId;
  };
}

/* ============================================================
   Topics — the "Explain this" library
   ============================================================ */

export interface Topic {
  id: string;
  title: string;
  category: TopicCategory["id"];
  /** One-line summary shown on cards. */
  summary: string;
  /** 1–2 sentences of plain-language framing shown before the levels. */
  intro: string;
  /** LEVEL 1 — What is this? */
  whatItIs: string;
  /** LEVEL 2 — Why does it matter? */
  whyItMatters: string;
  /** LEVEL 3 — What should I do? */
  whatYouNeedToDo: string[];
  /** LEVEL 4 — What usually happens next? */
  whatHappensNext: string;
  /** LEVEL 5 — When should I ask someone? */
  whenToAskSomeone: string;
  /** UNIVERSITY GUIDANCE label — what the university itself publishes/points to. */
  universityGuidance: string;
  /** Optional contextual note on regional or institutional variation. */
  variesNote?: string;
  /** Relative complexity, used to sort Explore and Home suggestions. */
  level: "starter" | "everyday" | "involved";
  keywords: string[];
}

/* ============================================================
   Community — events as an interaction-design problem
   ============================================================ */

export type EventIntensity = "low" | "medium";

export type ConversationLevel = "quiet" | "balanced" | "chatty";

export type ActivityType =
  | "walk"
  | "meal"
  | "practical"
  | "language"
  | "creative"
  | "quiet-together";

export interface EventAttendeeRange {
  min: number;
  max: number;
}

export interface CommunityEvent {
  id: string;
  title: string;
  /** ISO date of the demo occurrence. */
  date: string;
  /** Start time, 24h, local campus time. */
  time: string;
  durationMinutes: number;
  location: string;
  locationNote: string;
  intensity: EventIntensity;
  /** NEW: conversation expectation, shown before joining. */
  conversationLevel: ConversationLevel;
  /** NEW: what you do together, shown before joining. */
  activityType: ActivityType;
  attendees: EventAttendeeRange;
  attendingCount: number;
  description: string;
  goodToKnow: string[];
  accessibility: string;
  tags: string[];
}

/* ============================================================
   Support — escalation model
   ============================================================ */

export type SupportKind = "office" | "peer" | "wellbeing" | "urgent";

/**
 * The escalation ladder: SELF-SERVICE → PEER SUPPORT → UNIVERSITY SUPPORT →
 * URGENT HELP. Tiers are ordered by rung.
 */
export type EscalationTierId = "self-service" | "peer" | "university" | "urgent";

export interface EscalationTier {
  id: EscalationTierId;
  rung: number;
  title: string;
  /** What this tier is right for. */
  bestFor: string;
  /** How the interface behaves at this tier. */
  behaviour: string;
  /** Signals that a student should move up a tier. */
  moveUpWhen: string;
}

export interface SupportResource {
  id: string;
  kind: SupportKind;
  /** Which escalation tier this resource sits on. */
  tier: EscalationTierId;
  title: string;
  /** When to go here, in plain language. */
  whenToReachOut: string;
  description: string;
  /** What a student can prepare before reaching out — lowers the barrier. */
  prepareChecklist: string[];
  channels: SupportChannel[];
  /** Realistic demo contact, clearly demo in the UI. */
  contactHint: string;
  hours: string;
}

export interface SupportChannel {
  id: string;
  label: string;
  detail: string;
  /** Suggested first message the student can adapt — reduces blank-page anxiety. */
  suggestedMessage?: string;
}

/* ============================================================
   Saved items & UI state
   ============================================================ */

export interface SavedItem {
  id: string;
  kind: "topic" | "event";
  title: string;
  screen: ScreenId;
  detail: string;
}

/* ============================================================
   Research documentation — placeholders, no fabricated findings
   ============================================================ */

export type ResearchDocId =
  | "participant-profile"
  | "interview-themes"
  | "affinity-map"
  | "journey-map"
  | "opportunity-areas"
  | "usability-testing"
  | "design-iterations";

export interface ResearchDocSlot {
  id: ResearchDocId;
  title: string;
  /** What this document will contain after the study. */
  plannedContent: string;
  /** Method note — how it will be produced. */
  method: string;
  /** Honest current status of this artifact. */
  status: "planned" | "awaiting-data" | "in-progress";
}
