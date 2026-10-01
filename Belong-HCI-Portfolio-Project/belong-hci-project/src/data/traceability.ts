import type { ResearchDocSlot } from "../types";

/**
 * TRACEABILITY — the spine of the portfolio.
 *
 * Each entry links a research hypothesis (a question the design takes
 * seriously — NOT a finding) to a concrete design decision in this
 * prototype, and to where that decision lives in the code. The case study
 * will later connect these to actual evidence; until then they remain
 * hypotheses with design responses.
 */
export interface HypothesisEntry {
  id: string;
  hypothesis: string;
  /** The opening the hypothesis suggests — stated as an opportunity, not a solution. */
  opportunity: string;
  designResponse: string;
  /** Where the decision is implemented — code and visible surface. */
  implementedIn: string[];
  /** Interaction-design principle the response leans on. */
  principle: string;
  /** How the response would be evaluated once participant research runs.
      These are planned measures, NOT results. */
  evaluation: string;
}

export const HYPOTHESES: HypothesisEntry[] = [
  {
    id: "h1",
    hypothesis:
      "Students may hesitate to ask basic questions, fearing the question reveals them as uninformed.",
    opportunity: "Provide contextual understanding before any human interaction is required.",
    designResponse:
      "Anonymous contextual explanations available before any human escalation; the interface answers the “too small to ask” questions without requiring the student to disclose uncertainty to a person first.",
    implementedIn: [
      "components/explainer.tsx — five-level progressive disclosure",
      "data/orientation.ts — uncertainty check-in is private and unlabeled",
    ],
    principle: "Preserve dignity while building understanding.",
    evaluation:
      "Comprehension of an unfamiliar system after using “Explain this” alone; whether the willingness to ask a person afterwards increases, and at which level.",
  },
  {
    id: "h2",
    hypothesis: "Social events can feel intimidating when social expectations are unknown in advance.",
    opportunity: "Make social expectations visible before any participation decision.",
    designResponse:
      "Show group size, activity type, conversation level, duration, location, and access notes before any join decision; keep expressing interest reversible.",
    implementedIn: [
      "components/cards.tsx — EventCard + EventDetailModal six-attribute preview",
      "screens/Community.tsx — comfort-level filter",
    ],
    principle: "Make social participation a legible interaction, not a leap.",
    evaluation:
      "Perceived comfort and confidence immediately before expressing interest; whether reversible interest lowers the cost of the first “yes”.",
  },
  {
    id: "h3",
    hypothesis:
      "Bureaucratic language amplifies uncertainty more than the underlying task itself.",
    opportunity: "Separate what a thing is from what an authority requires.",
    designResponse:
      "All explanations use plain-language paraphrase, then explicitly label what is general context versus official guidance versus human support.",
    implementedIn: [
      "components/explainer.tsx — context layer with three source labels",
      "data/topics.ts — every topic authored in the five-level structure",
    ],
    principle: "Distinguish understanding from authority; never present assumptions as facts.",
    evaluation:
      "Whether participants can correctly sort statements into general context / official guidance / ask-a-human after reading.",
  },
  {
    id: "h4",
    hypothesis:
      "Information overload in week one exceeds working memory; a single wall of text fails.",
    opportunity: "Let the student set the pace and depth of any explanation.",
    designResponse:
      "Progressive disclosure: five levels, opened one at a time, with the current level always visible and skippable — the student controls depth.",
    implementedIn: ["components/explainer.tsx — level state machine with “Show next” affordance"],
    principle: "Reduce cognitive load by letting the user set the pace.",
    evaluation:
      "Where participants stop revealing levels; time-to-first-practical-action after reaching the “what should I do” level.",
  },
  {
    id: "h5",
    hypothesis:
      "Self-service fails silently: students don't know when to stop reading and start asking.",
    opportunity: "Signal when reading should end and asking should begin.",
    designResponse:
      "A four-rung escalation ladder (self-service → peer → university → urgent), each rung stating what it is for and when to move up; every explanation ends at a rung.",
    implementedIn: [
      "components/cards.tsx — SupportCard grouped by tier",
      "screens/Help.tsx — escalation model section",
      "components/explainer.tsx — final level lands on a rung",
    ],
    principle: "Design the handoff as deliberately as the self-service.",
    evaluation:
      "Given three scenario prompts, whether participants choose the appropriate rung of the ladder for each.",
  },
  {
    id: "h6",
    hypothesis:
      "Not knowing what feels uncertain is itself a stressor; students benefit from naming it privately.",
    opportunity: "Let students name what is hard without disclosure, judgment, or an account.",
    designResponse:
      "“Your first-week path”: a five-area uncertainty model with a private check-in (“What feels hardest right now?”) that shapes recommendations without judgment.",
    implementedIn: [
      "screens/Onboarding.tsx — path + uncertainty selection",
      "screens/Home.tsx — check-in and recommendation strip",
      "hooks/useDemoState.ts — persisted, private to the device",
    ],
    principle: "Reflection first, recommendation second.",
    evaluation:
      "Check-in completion and revision rates; whether participants judge the resulting recommendations as relevant to what they named.",
  },
  {
    id: "h7",
    hypothesis:
      "Empty results read as personal failure at exactly the moments confidence is lowest.",
    opportunity: "Treat every dead end as a doorway to the next possible step.",
    designResponse:
      "Empty states name the situation, normalise it, and offer the smallest possible next action — never a bare “no results”.",
    implementedIn: ["screens/Community.tsx + screens/Explore.tsx — narrative empty states"],
    principle: "Every dead end gets a door.",
    evaluation:
      "Recovery rate: the share of empty-state moments where the participant continues to a next action rather than abandoning the task.",
  },
];

/* ============================================================
   Research documentation — structured placeholders.
   NOTHING here is a fabricated finding. Each slot names the method
   that will produce the artifact and its honest current status.
   ============================================================ */

export const RESEARCH_DOCS: ResearchDocSlot[] = [
  {
    id: "participant-profile",
    title: "Participant profile",
    plannedContent:
      "Who was studied: recruitment criteria, programme mix, time since arrival, consent boundaries. Published only after data collection.",
    method: "Recruitment log + screening questionnaire (8–12 participants).",
    status: "planned",
  },
  {
    id: "interview-themes",
    title: "Interview themes",
    plannedContent:
      "Themes from semi-structured interviews, with representative (consented) quotes and the questions that elicited them.",
    method: "Semi-structured interviews; thematic analysis.",
    status: "planned",
  },
  {
    id: "affinity-map",
    title: "Affinity map",
    plannedContent:
      "Clustered observations from transcripts; how clusters became themes; links from clusters to design responses.",
    method: "Affinity mapping of transcribed interviews.",
    status: "planned",
  },
  {
    id: "journey-map",
    title: "Journey map",
    plannedContent:
      "The first-weeks journey as reported by participants: moments of uncertainty, workarounds, and emotional low points.",
    method: "Journey mapping from interview accounts.",
    status: "planned",
  },
  {
    id: "opportunity-areas",
    title: "Opportunity areas",
    plannedContent:
      "Design opportunities derived from themes — each phrased as “How might we…”, each traceable to evidence.",
    method: "Synthesis workshops following thematic analysis.",
    status: "planned",
  },
  {
    id: "usability-testing",
    title: "Usability testing",
    plannedContent:
      "Session structure, tasks, measures (comprehension, confidence, time-to-next-action, willingness to ask), and results when run.",
    method: "Moderated sessions with 5–8 participants.",
    status: "planned",
  },
  {
    id: "design-iterations",
    title: "Design iterations",
    plannedContent:
      "What changed between prototype versions and why — including changes that did not work and were reverted.",
    method: "Iteration log maintained through testing.",
    status: "planned",
  },
];
