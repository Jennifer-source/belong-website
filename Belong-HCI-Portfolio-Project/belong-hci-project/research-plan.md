# BELONG — Research Plan

## Research question

How might interaction design help international students feel oriented, connected, and confident during their first weeks in a new country?

This question is rendered in the interface (Welcome, Home, Research page) and drives the traceability table in `src/data/traceability.ts`, which links each design hypothesis to its design response and implementation site.

## Participants

- 8–12 international students
- Mix of undergraduate/postgraduate students
- Ideally include participants who arrived within the previous 12 months
- Optional secondary group: domestic students who regularly support international peers

## Interview prompts

1. Tell me about your first week after arriving.
2. What information was hardest to find?
3. Which tasks made you feel uncertain?
4. Was there a moment when you avoided asking for help?
5. Which digital tools helped?
6. When did you first feel comfortable or "at home"?
7. What cultural interaction was difficult to interpret?
8. What would you have wanted someone to explain?
9. What makes an online community feel safe enough to join?
10. If one digital experience could have been different, what would it be?

## Synthesis

Use:
- affinity mapping
- journey mapping
- thematic analysis
- opportunity statements

Potential themes are hypotheses only until supported by participant evidence.

## Prototype hypothesis

If unfamiliar university/cultural systems are explained using:
- what it is
- why it matters
- what to do next
- what usually happens
- when to seek human help

then students may report greater confidence and lower perceived uncertainty in their first weeks.

## Evaluation

Measure:
- comprehension
- perceived confidence
- task completion
- time to find next action
- willingness to ask for help
- perceived cultural/contextual clarity

Avoid claiming that the design "reduces isolation" without evidence. A portfolio case study should show the evidence and limitations.

## Evidence placeholders in the prototype

The Research page (`#/research`) contains a structured slot for each artifact this plan will produce: participant profile, interview themes, affinity map, journey map, opportunity areas, usability testing, and design iterations. Each slot names its method and current status. When data exists, replace the placeholder copy in `src/data/traceability.ts` (`RESEARCH_DOCS`) — the slots are designed to receive findings without fabricating any.

## Evaluation measures, updated

- **Oriented:** time to find the next practical step; comprehension of explained systems.
- **Connected:** willingness to express event interest; comfort-filter usage.
- **Confident:** perceived confidence before/after "Explain this"; willingness to ask for help (escalation ladder reach-through).

## Usability testing tasks (planned — no results exist yet)

Scenario-based tasks for moderated sessions with 5–8 participants. Each task maps to
the hypotheses it evaluates (`src/data/traceability.ts`). Scripts live with the results
in `research/usability-testing/` once the study runs.

### Task 1 — Make sense of an unfamiliar document *(H1, H3, H4)*

> "You have arrived in a new country and don't understand a residence-related document.
> Find out what it means."

Watch for: whether the participant opens "Explain this" without prompting, how deep
into the five levels they go, and whether they can restate the topic in their own
words afterwards (comprehension, not recall).

### Task 2 — Find a low-pressure social event *(H2)*

> "You want to attend a social activity but prefer a low-pressure environment. Find an
> appropriate event."

Watch for: use of the comfort filter and the event attributes (group size,
conversation level) versus title-guessing; confidence before expressing interest; and
whether the participant notices that interest is reversible.

### Task 3 — Choose the right support pathway *(H5)*

> "You are unsure whether you need official assistance. Find the appropriate support
> pathway."

Watch for: which rung of the escalation ladder the participant selects and why;
whether the context labels (general context / official guidance / ask a human) informed
the choice.

### Measures recorded per task

- Task completion (unassisted / assisted / failed)
- Time to first meaningful action and to task completion
- Navigation errors and backtracks
- Comprehension (participant restatement, scored against the topic's five levels)
- Confidence before and after (self-reported, e.g. 1–5)
- Perceived uncertainty (self-reported, 1–5)
- Willingness to continue / to ask a human (observable choice, not just stated intent)

Results are published only in `research/usability-testing/` — never in the interface —
and only after the sessions have run with consent.
