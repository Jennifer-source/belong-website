import { useMemo, useState } from "react";
import { ArrowRight, Check, Compass } from "lucide-react";
import { JOURNEY_STAGES, PATH_AREAS, RESEARCH_QUESTION, UNCERTAINTY_OPTIONS } from "../data/orientation";
import { Button, DemoTag } from "../components/ui";
import { Icon } from "../components/ui";

/**
 * The HCI journey — Arrival → Orientation → Understanding → Everyday
 * confidence → Community → Belonging.
 *
 * Deliberately NOT gamified: no progress points, no completion rewards, no
 * streaks. It is an orientation model — it shows the student where they are
 * in a transition they are already living, and what BELONG offers at each
 * stage. The research question is shown once, briefly, to make the product's
 * intent legible.
 *
 * TRACEABILITY (h6): naming uncertainty privately is the first interaction —
 * before recommendations, before any social step.
 */
type Phase = "journey" | "uncertainty" | "comfort" | "done";

interface OnboardingProps {
  onComplete: (info: { uncertaintyIds: string[]; comfort: "quiet" | "balanced" | "chatty" | null }) => void;
  onSkip: () => void;
}

export function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [phase, setPhase] = useState<Phase>("journey");
  const [currentStage, setCurrentStage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [comfort, setComfort] = useState<"quiet" | "balanced" | "chatty" | null>(null);

  const isLastStage = currentStage === JOURNEY_STAGES.length - 1;

  const recommendedCount = useMemo(
    () => selected.reduce((acc, id) => acc + (UNCERTAINTY_OPTIONS.find((o) => o.id === id)?.recommendTopics.length ?? 0), 0),
    [selected]
  );

  const toggleSelect = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="onboarding page">
      <div className="shell onboarding-inner">
        {/* ---------- Phase 1: the journey model ---------- */}
        {phase === "journey" && (
          <section aria-labelledby="ob-title">
            <div className="onboarding-head">
              <p className="eyebrow">
                <Icon icon={Compass} size={13} /> Your first weeks <DemoTag>Orientation model</DemoTag>
              </p>
              <h1 id="ob-title" className="h-section" style={{ fontSize: "clamp(26px, 3.4vw, 40px)" }}>
                Six stages describe this transition.
              </h1>
              <p className="lede" style={{ fontSize: 15 }}>
                This isn't a track to complete — it's a map of the transition you're already in, and what BELONG
                offers at each point. You can't fall behind here.
              </p>
            </div>

            <ol className="journey-stages">
              {JOURNEY_STAGES.map((s, i) => (
                <li
                  key={s.id}
                  className={`journey-stage${i === currentStage ? " current" : ""}${i < currentStage ? " passed" : ""}`}
                >
                  <button
                    type="button"
                    className="journey-stage-btn"
                    onClick={() => setCurrentStage(i)}
                    aria-current={i === currentStage ? "step" : undefined}
                  >
                    <span className="stage-dot" aria-hidden="true">
                      {i < currentStage ? <Check size={12} /> : i + 1}
                    </span>
                    <span className="stage-title">{s.title}</span>
                  </button>
                  {i === currentStage && (
                    <div className="stage-detail">
                      <p className="stage-desc">{s.description}</p>
                      <p className="stage-affordance">
                        <strong>Here, BELONG offers:</strong> {s.affordance}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ol>

            <div className="onboarding-actions">
              <Button
                onClick={() => (isLastStage ? setPhase("uncertainty") : setCurrentStage((i) => i + 1))}
              >
                {isLastStage ? "Continue" : "Next stage"} <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button variant="ghost" onClick={onSkip}>
                Skip the walkthrough
              </Button>
            </div>
          </section>
        )}

        {/* ---------- Phase 2: the uncertainty check-in ---------- */}
        {phase === "uncertainty" && (
          <section aria-labelledby="ob-uncertainty">
            <div className="onboarding-head">
              <p className="eyebrow">
                <Icon icon={Compass} size={13} /> Your first-week path
              </p>
              <h1 id="ob-uncertainty" className="h-section" style={{ fontSize: "clamp(26px, 3.4vw, 40px)" }}>
                What feels <em>hardest right now?</em>
              </h1>
              <p className="lede" style={{ fontSize: 15 }}>
                Choose anything that applies — or nothing at all. This stays on your device and shapes what
                BELONG shows you first. There are no wrong answers, and nothing is shared.
              </p>
            </div>

            <div className="uncertainty-options" role="group" aria-label="What feels hardest right now?">
              {UNCERTAINTY_OPTIONS.map((o) => {
                const active = selected.includes(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    className={`uncertainty-option${active ? " selected" : ""}`}
                    onClick={() => toggleSelect(o.id)}
                    aria-pressed={active}
                  >
                    <span className="uo-check" aria-hidden="true">
                      {active && <Check size={14} />}
                    </span>
                    <span className="uo-statement">{o.statement}</span>
                    <span className="uo-area">{PATH_AREAS.find((a) => a.id === o.area)?.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="onboarding-actions">
              <Button onClick={() => setPhase("comfort")}>
                {selected.length > 0
                  ? `Continue — ${recommendedCount} matches found`
                  : "Continue without choosing"}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button variant="ghost" onClick={() => setPhase("journey")}>
                Back
              </Button>
            </div>
          </section>
        )}

        {/* ---------- Phase 3: social comfort ---------- */}
        {phase === "comfort" && (
          <section aria-labelledby="ob-comfort">
            <div className="onboarding-head">
              <p className="eyebrow">
                <Icon icon={Compass} size={13} /> Community
              </p>
              <h1 id="ob-comfort" className="h-section" style={{ fontSize: "clamp(26px, 3.4vw, 40px)" }}>
                How much conversation <em>sounds right now?</em>
              </h1>
              <p className="lede" style={{ fontSize: 15 }}>
                Events in BELONG are labelled by their conversation level. Tell us where to start the dial — you
                can change it any time, and browsing is always anonymous.
              </p>
            </div>

            <div className="comfort-options" role="radiogroup" aria-label="How much conversation sounds right now?">
              {(
                [
                  { id: "quiet", label: "Quiet for now", desc: "Show me low-pressure events first — where talking is optional." },
                  { id: "balanced", label: "A bit of both", desc: "A mix — some quiet, some livelier." },
                  { id: "chatty", label: "Ready to talk", desc: "Don't filter — show everything, including talkative events." },
                ] as const
              ).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`comfort-option${comfort === c.id ? " selected" : ""}`}
                  onClick={() => setComfort(c.id)}
                  role="radio"
                  aria-checked={comfort === c.id}
                >
                  <span className="co-label">{c.label}</span>
                  <span className="co-desc">{c.desc}</span>
                </button>
              ))}
            </div>

            <div className="onboarding-actions">
              <Button
                onClick={() => onComplete({ uncertaintyIds: selected, comfort })}
              >
                Enter BELONG <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button variant="ghost" onClick={() => setPhase("uncertainty")}>
                Back
              </Button>
            </div>
          </section>
        )}

        {/* ---------- Footer of every phase: the research question ---------- */}
        <p className="research-question-note tiny">
          <strong>Why this exists:</strong> “{RESEARCH_QUESTION}” — a design question, not a claim.
          <DemoTag>Research prototype</DemoTag>
        </p>
      </div>
    </div>
  );
}
