import { ArrowRight, FileWarning } from "lucide-react";
import { HYPOTHESES, RESEARCH_DOCS } from "../data/traceability";
import { JOURNEY_STAGES, RESEARCH_QUESTION } from "../data/orientation";
import { Button, ResearchPlaceholder } from "../components/ui";

interface ResearchProps {
  onNavigateHome: () => void;
}

/**
 * The research/documentation area. Two jobs:
 *  1. Show the traceability spine — hypothesis → design response → where it
 *     lives in the interface (code references included).
 *  2. Provide structured placeholders for every research artifact, each
 *     stating its method and status. Nothing is fabricated.
 */
export function Research({ onNavigateHome }: ResearchProps) {
  return (
    <div className="shell page">
      <section className="page-hero">
        <p className="eyebrow">Research documentation</p>
        <h1 className="h-display" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
          A research question, <em>an honest prototype.</em>
        </h1>
        <p className="lede">
          BELONG is an interaction-design prototype. This page holds the question it explores, the design
          decisions it led to, and structured placeholders for the evidence that a future participant study will
          add.
        </p>
      </section>

      {/* -------- The research question -------- */}
      <section className="section" aria-labelledby="rq-title">
        <div className="hypothesis-note" style={{ padding: "var(--s4)" }}>
          <p className="micro-label" style={{ marginBottom: 8 }}>
            Research question
          </p>
          <p style={{ margin: 0, fontSize: "clamp(18px, 2.2vw, 24px)", lineHeight: 1.4, fontFamily: "var(--font-serif)", fontStyle: "italic" }} id="rq-title">
            “{RESEARCH_QUESTION}”
          </p>
          <p className="tiny" style={{ color: "var(--muted-2)", marginTop: 12, marginBottom: 0 }}>
            This question — not a market — is the reason every screen here exists.
          </p>
        </div>
      </section>

      {/* -------- Journey model -------- */}
      <section className="section" aria-labelledby="journey-title">
        <p className="eyebrow">Orientation model</p>
        <h2 id="journey-title" className="h-section" style={{ marginTop: "var(--s2)", fontSize: "clamp(22px, 2.8vw, 32px)" }}>
          The journey the interface models
        </h2>
        <div className="journey-map">
          {JOURNEY_STAGES.map((s, i) => (
            <div key={s.id} className="journey-map-row">
              <span className="jm-num" aria-hidden="true">{i + 1}</span>
              <div>
                <strong>{s.title}</strong>
                <p className="small" style={{ color: "var(--muted)", margin: "2px 0 0" }}>
                  {s.description} <em>Belong offers: {s.affordance}</em>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------- Traceability: hypothesis → opportunity → response → evaluation -------- */}
      <section className="section" aria-labelledby="trace-title">
        <p className="eyebrow">Case-study traceability</p>
        <h2 id="trace-title" className="h-section" style={{ marginTop: "var(--s2)", fontSize: "clamp(22px, 2.8vw, 32px)" }}>
          Hypothesis → opportunity → design response → evaluation
        </h2>
        <p className="lede" style={{ marginTop: "var(--s2)" }}>
          Each entry is a hypothesis the design takes seriously — never a finding. The response is implemented
          where noted, and the same table lives as structured data in <code>src/data/traceability.ts</code>.
        </p>
        <div className="trace-list">
          {HYPOTHESES.map((h) => (
            <article key={h.id} className="card trace-entry">
              <ol className="trace-chain">
                <li className="chain-step">
                  <span className="micro-label">Hypothesis · {h.id.toUpperCase()}</span>
                  <p className="trace-hypothesis">{h.hypothesis}</p>
                </li>
                <li className="chain-step">
                  <span className="micro-label">Design opportunity</span>
                  <p className="trace-opp">{h.opportunity}</p>
                </li>
                <li className="chain-step">
                  <span className="micro-label" style={{ color: "var(--sage-deep)" }}>Design response</span>
                  <p className="trace-response">{h.designResponse}</p>
                  <ul className="trace-impl">
                    {h.implementedIn.map((impl, i) => (
                      <li key={i}><code>{impl}</code></li>
                    ))}
                  </ul>
                  <p className="tiny" style={{ color: "var(--muted-2)", margin: "8px 0 0" }}>
                    <strong>Principle:</strong> {h.principle}
                  </p>
                </li>
                <li className="chain-step chain-step-eval">
                  <span className="micro-label">Evaluation (planned)</span>
                  <p className="trace-eval">{h.evaluation}</p>
                </li>
              </ol>
            </article>
          ))}
        </div>
      </section>

      {/* -------- Evidence placeholders -------- */}
      <section className="section" aria-labelledby="evidence-title">
        <p className="eyebrow">Evidence slots</p>
        <h2 id="evidence-title" className="h-section" style={{ marginTop: "var(--s2)", fontSize: "clamp(22px, 2.8vw, 32px)" }}>
          Research evidence to be added after participant study
        </h2>
        <div className="evidence-note" role="note">
          <FileWarning size={18} aria-hidden="true" />
          <span>
            Nothing below is a finding. Each slot names the method that will produce it and its current status —
            when the study runs, findings replace these placeholders in place.
          </span>
        </div>
        <div className="evidence-grid">
          {RESEARCH_DOCS.map((d) => (
            <ResearchPlaceholder
              key={d.id}
              title={d.title}
              plannedContent={d.plannedContent}
              method={d.method}
              status={d.status}
            />
          ))}
        </div>
      </section>

      {/* -------- Prototype status -------- */}
      <section className="section" aria-labelledby="status-title">
        <div className="hypothesis-note" style={{ padding: "var(--s3) var(--s4)" }}>
          <p className="micro-label" id="status-title" style={{ marginBottom: 8 }}>
            Prototype status
          </p>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65 }}>
            BELONG is an <strong>exploratory HCI prototype</strong>. Research claims shown in this project are
            hypotheses until validated through participant research and usability testing. All topics, events,
            and contacts are representative demo content, not verified local guidance.
          </p>
        </div>
      </section>

      <section className="section">
        <Button variant="secondary" onClick={onNavigateHome}>
          <ArrowRight size={16} aria-hidden="true" style={{ transform: "rotate(180deg)" }} /> Back to BELONG
        </Button>
      </section>
    </div>
  );
}
