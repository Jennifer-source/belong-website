# BELONG — Research Documentation Model

This folder is the **contract between the prototype and future research**. It defines
the artifacts a participant study will produce, where each one belongs, and the rules
for adding them without breaking the project's honesty guarantee:

> Nothing in BELONG may present a research claim as a finding before evidence exists.

## Status: awaiting first study

Every artifact listed below is currently a **placeholder with a named method**. The
in-app equivalents live on the Research page (`#/research`) and in
`src/data/traceability.ts` (`RESEARCH_DOCS`, each with `status: "planned"`). Nothing in
this folder — or in the app — may invent participants, quotes, interviews, statistics,
usability scores, or findings.

## Folder contract

When the study runs, each artifact gets a subfolder here:

```
research/
  participants/        Recruitment log, screening questionnaire, consent records
  interview-guide/     Final prompt set + rationale for changes from the draft
  transcripts/         Consent-anonymised transcripts (or redacted excerpts)
  affinity-map/        Clustered observations; photos/scans of the mapping wall
  themes/              Thematic analysis write-up with supporting excerpts
  journey-map/         The first-weeks journey as reported by participants
  opportunity-areas/   "How might we…" statements, each traceable to a theme
  usability-testing/   Task scripts, session notes, measures, per-participant data
  iterations/          Change log: what changed, why, and what was reverted
```

Start each subfolder with a `README.md` stating collection date(s), method, and
consent boundaries before adding any content.

## How evidence enters the prototype

1. **Add the artifact** to the matching subfolder in this directory, with consent
   boundaries documented.
2. **Update the app slot** in `src/data/traceability.ts` (`RESEARCH_DOCS`): replace the
   `plannedContent` placeholder with a one-paragraph summary, set
   `status: "planned"` → `"in-progress"` (data being collected) or a completed state,
   and link the artifact path.
3. **Update the traceability table**: only after evidence exists may a hypothesis move
   from `hypothesis` to `finding` framing — and only the specific claim the evidence
   supports. Partial support is stated as partial.
4. **Update the Prototype Status statement** on the Research page if the overall
   status of the project changes.

## What may never appear in this project

- Invented participant counts, quotes, percentages, or success rates
- Usability scores without a documented session log
- "Users said/feel…" claims attributed to a study that has not run
- Findings presented as universal across countries, institutions, or individuals —
  findings are situated: name the sample, the place, and the limits

## Link to the testing plan

The measures and task scripts are defined in [`research-plan.md`](../research-plan.md)
(Evaluation → Usability testing tasks). When the study runs, record results in
`research/usability-testing/` and replace the corresponding `RESEARCH_DOCS` slot.
