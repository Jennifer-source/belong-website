# BELONG — Designing Digital Belonging for International Students

**Research question:** *How might interaction design help international students feel oriented, connected, and confident during their first weeks in a new country?*

Tagline: **You don't have to figure everything out alone.**

This repository is a production-style front-end prototype for a portfolio case study. It is intentionally framed as an **exploratory HCI concept** — it never claims completed research, participant quotes, statistics, or usability scores.

## What is included

- Welcome experience ("I'm new here") with the research question made visible
- **Orientation-journey onboarding**: Arrival → Orientation → Understanding → Everyday confidence → Community → Belonging — an orientation model, deliberately not gamified (no points, streaks, or rewards)
- **Uncertainty model ("Your first-week path")**: a private check-in — "What feels hardest right now?" — over five areas, driving content recommendations and the journey-stage card; social-comfort preference shapes Community
- **"Explain this"** — the signature interaction, rebuilt as **five-level progressive disclosure** (What is this? → Why does it matter? → What should I do? → What usually happens next? → When should I ask someone?) with a level rail, opt-in depth, and a visible handoff to human support
- **Context layer**: every explanation level is labelled *General context*, *University guidance*, or *Ask a human* — assumptions are never presented as authoritative facts
- Explore: searchable, filterable knowledge library with progressive disclosure and narrative empty states
- Community: events preview six attributes before joining — group size, activity type, conversation level, duration, location, accessibility — plus a comfort-level filter and reversible interest
- Help: the **escalation model** — Self-service → Peer support → University support → Urgent help — each rung stating what it is for and when to move up
- Research documentation area: structured placeholders for participant profile, interview themes, affinity map, journey map, opportunity areas, usability testing, and design iterations — each naming its method and status
- **Case-study traceability**: hypothesis → design opportunity → design response → planned evaluation method, plus implementation location — both in the UI (Research page) and as structured data (`src/data/traceability.ts`). A "Prototype status" statement on the Research page states plainly that all research claims are hypotheses until validated.
- `research/` folder: the documentation model for future evidence — one subfolder per artifact (participants, transcripts, affinity map, usability testing, …), none populated until real data exists. See `research/README.md`.
- **Usability testing plan**: three scenario tasks and their measures in `research-plan.md` — scripts and results are published only after sessions run
- Accessibility: semantic landmarks, skip link, focus management and focus trap in dialogs, ARIA labelling, `aria-current` navigation, reduced-motion support, keyboard operability (Esc closes dialogs)
- UX states: default / hover / focus / active / loading / success / empty / error-style empty results

## Architecture

```
src/
  main.tsx            App root: routing, onboarding, modals, toasts, journey inference
  types.ts            Domain types (Topic, CommunityEvent, EscalationTier, JourneyStage, …)
  data/               Content separate from presentation
    topics.ts         "Explain this" content library (12 topics, five-level structure)
    events.ts         Community events + activity/conversation labels
    support.ts        Support resources + escalation tiers + onboarding steps
    orientation.ts    Research question, context sources, journey stages,
                      path areas, uncertainty options → recommendations
    traceability.ts   Hypothesis → design-response entries + research doc slots
    pathways.ts       Home pathways + category icon mapping
  components/
    ui.tsx            Button, Chip, ContextTag, Modal (focus trap), Toast,
                      EmptyState, Skeleton, DemoTag, ResearchPlaceholder
    layout.tsx        TopBar (desktop + mobile nav), Footer, icon registry
    cards.tsx         TopicCard, EventCard, EventDetailModal, SupportCard,
                      PathwayCard, EscalationLadder
    explainer.tsx     The signature five-level "Explain this" modal
  screens/            Welcome, Onboarding, Home, Explore, Community, Help, Research
  hooks/
    useDemoState.ts   Persisted demo state (uncertainty, comfort, saved, interest)
  lib/
    router.ts         Hash router + scroll helper
    toast.ts          Toast queue + simulated loading hook
    dates.ts          Event date formatting
  styles.css          Design tokens, components, screens, responsive, motion
```

Stack: **React 18 · TypeScript (strict) · Vite · hand-rolled modular CSS · lucide-react**.

## Traceability convention

Design decisions are annotated in code with `TRACEABILITY — Hypothesis: … / Design response: …` comments (see `explainer.tsx`, `events.ts`, `support.ts`, `Community.tsx`, `Help.tsx`) and collected in `src/data/traceability.ts`, which also renders the traceability table on the Research page. Keep the two in sync when the design changes.

## Design system

All values live as CSS custom properties at the top of `src/styles.css`; components
reference tokens rather than raw values.

**Color.** `#F7F4ED` paper · `#172A2B` ink · `#79B8AF` teal · `#E7EFEA` sage ·
`#EF7567` coral accent · `#4C615F`/`#566865` muted text (AA against paper) ·
`#C98A2D` amber, used only for "planned/pending" research states.

**Type.** DM Sans (UI and body); Playfair Display italic, used sparingly for one
emphasised clause per headline. Display sizes are fluid via `clamp()`; body text is
14–16px with 1.6 line height; micro-labels are 11px caps with 0.1em tracking.

**Spacing.** An 8px rhythm (`--s1`…`--s6` = 4/8/12/16/24/32/48px scale); `1200px` max
content width with consistent gutters.

**Radius.** Three tokens only — small (8px), medium (10px), large (14px) — plus a pill
radius for chips and status tags.

**Buttons.** Three variants (primary, secondary, ghost) × two sizes, sharing one
border-radius, focus ring, and minimum height; states: default / hover / focus-visible /
active / disabled.

**Cards.** One card family (`paper`, `panel`, `panel-sage`) sharing border, radius, and
padding tokens; interactive cards are real `<button>`/`<article>` semantics, not
clickable-looking divs.

**Motion.** Three duration tokens (fast/medium/slow) on one easing curve; animation
communicates state and transition only (toast entry, modal fade, level reveal). The
whole sheet collapses under `prefers-reduced-motion: reduce`.

**Breakpoints.** 1080px (grids drop to 2 columns), 900px (desktop nav → mobile menu),
640px (single-column stacks, event-card row reflow). Verified overflow-free at 375,
390, 768, 1024, 1440, and 1920px.

Every interactive element meets a 44px minimum touch target on coarse pointers; body text clears WCAG AA contrast against the paper background; dialogs are native `<dialog>` elements with manual focus trapping; anchored sections carry `scroll-margin-top` so the sticky header never covers them.

## Research plan to document in the portfolio

Do not claim the interface content as completed research until you conduct it.

1. Recruit 8–12 international students and recent movers.
2. Conduct semi-structured interviews (see `research-plan.md`).
3. Transcribe and affinity-map.
4. Synthesize themes around information overload, fear of asking, social uncertainty, cultural ambiguity.
5. Translate themes into opportunity areas.
6. Prototype and test the "Explain this" interaction with 5–8 participants.
7. Iterate and document what changed — including what didn't work.

Supporting channels open a handoff dialog that shows the channel details and a suggested first message (copyable), with the demo boundary stated explicitly — the button always produces an understandable result.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev       # start dev server
npm run typecheck # strict TypeScript check
npm run build     # typecheck + production build
npm run preview   # serve the production build
```

## Content status

All topics, events, and support contacts are **representative demo content**, marked as such in the interface. Replace with locally verified guidance before any real deployment. The emergency-numbers entry is deliberately generic — always verify local emergency numbers on arrival.

## Important

The prototype uses representative content. Replace assumptions with real participant evidence before presenting research findings to academic reviewers.
