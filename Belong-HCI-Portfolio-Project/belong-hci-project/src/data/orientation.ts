import type {
  ContextSourceMeta,
  JourneyStage,
  PathArea,
  UncertaintyOption,
} from "../types";

/* ============================================================
   The research question — referenced throughout the interface
   ============================================================ */

export const RESEARCH_QUESTION =
  "How might interaction design help international students feel oriented, connected, and confident during their first weeks in a new country?";

/* ============================================================
   Context layer — epistemic labels
   ============================================================ */

/**
 * Three-source model: the interface must distinguish general context from
 * official information from human support. See Explainer for how the labels
 * gate disclosure levels.
 */
export const CONTEXT_SOURCES: ContextSourceMeta[] = [
  {
    id: "general",
    label: "General context",
    gloss: "Background understanding — not an official rule.",
  },
  {
    id: "official",
    label: "University guidance",
    gloss: "Points to what your university or authority publishes.",
  },
  {
    id: "human",
    label: "Ask a human",
    gloss: "A person can check your specific situation.",
  },
];

/* ============================================================
   Journey model — Arrival → Belonging
   An orientation model, not gamification: no points, streaks,
   or rewards. It describes a transition the student is already in.
   ============================================================ */

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "arrival",
    title: "Arrival",
    description: "You've landed. Everything is new and the checklist is long.",
    affordance: "The essential first documents and errands, in plain language.",
  },
  {
    id: "orientation",
    title: "Orientation",
    description: "You know the few streets around campus — and little else.",
    affordance: "One calm place for the questions that feel too small to ask.",
  },
  {
    id: "understanding",
    title: "Understanding",
    description: "Systems start making sense when someone explains the context.",
    affordance: "“Explain this” — five levels, from what it is to when to ask.",
  },
  {
    id: "everyday-confidence",
    title: "Everyday confidence",
    description: "Errands stop being projects. The city starts fitting you.",
    affordance: "Practical topics sorted by how much planning they need.",
  },
  {
    id: "community",
    title: "Community",
    description: "You're ready to be around people — on terms you control.",
    affordance: "Events that show group size and conversation level first.",
  },
  {
    id: "belonging",
    title: "Belonging",
    description: "The quiet weeks end. Some faces are familiar now.",
    affordance: "Recurring, low-pressure ways to keep showing up.",
  },
];

/* ============================================================
   "Your first-week path" — uncertainty model
   ============================================================ */

export const PATH_AREAS: PathArea[] = [
  { id: "getting-oriented", label: "Getting oriented" },
  { id: "everyday-life", label: "Everyday life" },
  { id: "university", label: "University" },
  { id: "communication", label: "Communication" },
  { id: "community", label: "Community" },
];

/**
 * The check-in: "What feels hardest right now?"
 * Each answer drives recommendations — the uncertainty model in action.
 *
 * TRACEABILITY — Hypothesis: students may hesitate to ask basic questions.
 * Design response: anonymous self-assessment ("what feels hardest") before any
 * human escalation, so the interface adapts without the student disclosing
 * anything to a person first.
 */
export const UNCERTAINTY_OPTIONS: UncertaintyOption[] = [
  {
    id: "where-to-go",
    statement: "I don't know where to go",
    area: "getting-oriented",
    recommendTopics: ["transport-card", "recycling-rules", "residence-card"],
    nextStep: { label: "Open Explore", screen: "explore" },
  },
  {
    id: "how-things-work",
    statement: "I don't understand how things work",
    area: "everyday-life",
    recommendTopics: ["residence-card", "bank-account", "recycling-rules"],
    nextStep: { label: "Try “Explain this”", screen: "explore" },
  },
  {
    id: "nervous-asking",
    statement: "I'm nervous about asking",
    area: "university",
    recommendTopics: ["office-hours", "student-email", "course-registration"],
    nextStep: { label: "See how to ask", screen: "explore" },
  },
  {
    id: "not-met-anyone",
    statement: "I haven't met anyone",
    area: "community",
    recommendTopics: ["making-friends", "classroom-participation"],
    nextStep: { label: "Browse gently", screen: "community" },
  },
  {
    id: "need-practical-help",
    statement: "I need practical help",
    area: "everyday-life",
    recommendTopics: ["phone-sim", "bank-account"],
    nextStep: { label: "Find human support", screen: "help" },
  },
];
