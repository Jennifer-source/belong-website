import { useState } from "react";
import { ArrowRight, BookmarkCheck, Check, Compass, Languages, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import type { SavedItem, ScreenId, Topic } from "../types";
import { PathwayCard } from "../components/cards";
import { NEED_PATHWAYS } from "../data/pathways";
import { getTopicById } from "../data/topics";
import { JOURNEY_STAGES, PATH_AREAS, RESEARCH_QUESTION, UNCERTAINTY_OPTIONS } from "../data/orientation";
import { Button, DemoTag, Icon } from "../components/ui";

interface HomeProps {
  onNavigate: (s: ScreenId) => void;
  onExplain: (t: Topic) => void;
  saved: SavedItem[];
  uncertaintyIds: string[];
  onCheckIn: (ids: string[]) => void;
  journeyStage: number;
}

export function Home({
  onNavigate,
  onExplain,
  saved,
  uncertaintyIds,
  onCheckIn,
  journeyStage,
}: HomeProps) {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [draftSelection, setDraftSelection] = useState<string[]>(uncertaintyIds);

  const stage = JOURNEY_STAGES[Math.min(journeyStage, JOURNEY_STAGES.length - 1)];

  const selections = checkInOpen ? draftSelection : uncertaintyIds;
  const selectedOptions = UNCERTAINTY_OPTIONS.filter((o) => selections.includes(o.id));
  const recommendedTopics = Array.from(
    new Set(selectedOptions.flatMap((o) => o.recommendTopics))
  )
    .map((id) => getTopicById(id))
    .filter((t): t is Topic => Boolean(t))
    .slice(0, 3);

  const toggleDraft = (id: string) =>
    setDraftSelection((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="shell page">
      {/* -------- Hero + journey stage -------- */}
      <section className="welcome-hero" aria-labelledby="home-title">
        <div>
          <p className="eyebrow" style={{ marginBottom: "var(--s2)" }}>
            <Icon icon={Sparkles} size={13} /> {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h1 id="home-title" className="h-display" style={{ fontSize: "clamp(32px, 3.9vw, 48px)" }}>
            Start with what <em>you need right now.</em>
          </h1>
          <p className="lede" style={{ marginTop: "var(--s3)" }}>
            One place for the questions that feel too small, too unfamiliar, or too awkward to ask.
          </p>
        </div>

        {/* Journey model card — orientation, not gamification */}
        <div className="card progress-card">
          <div className="micro-label">Where you are</div>
          <p style={{ margin: "8px 0 4px", fontSize: 16, fontWeight: 700 }}>
            {stage.title}
            <span className="sr-only"> — journey stage {journeyStage + 1} of {JOURNEY_STAGES.length}</span>
          </p>
          <p className="tiny" style={{ color: "var(--muted)", margin: "0 0 12px", lineHeight: 1.55 }}>
            {stage.description}
          </p>
          <div className="journey-dots" aria-hidden="true">
            {JOURNEY_STAGES.map((s, i) => (
              <span
                key={s.id}
                className={`j-dot${i < journeyStage ? " done" : i === journeyStage ? " current" : ""}`}
                title={s.title}
              />
            ))}
          </div>
          <p className="tiny" style={{ color: "var(--muted-2)", margin: "12px 0 0", lineHeight: 1.55 }}>
            <strong>Here, BELONG offers:</strong> {stage.affordance}
          </p>
        </div>
      </section>

      {/* -------- Uncertainty check-in + recommendations -------- */}
      <section className="section" aria-labelledby="checkin-title">
        <div className="card checkin-card">
          <div className="checkin-left">
            <p className="eyebrow">
              <Icon icon={Compass} size={13} /> Your first-week path
            </p>
            <h2 id="checkin-title" className="h-section" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", marginTop: "var(--s2)" }}>
              What feels <em>hardest right now?</em>
            </h2>

            {!checkInOpen && (
              <>
                {uncertaintyIds.length === 0 ? (
                  <p className="body-muted" style={{ fontSize: 14.5, marginTop: "var(--s2)", maxWidth: "52ch" }}>
                    Pick whatever applies — it stays on this device and shapes what BELONG shows you first. Nothing
                    is shared, and you can change it any time.
                  </p>
                ) : (
                  <ul className="checkin-selections">
                    {selectedOptions.map((o) => (
                      <li key={o.id}>
                        <Check size={14} aria-hidden="true" /> {o.statement}
                        <span className="tiny" style={{ color: "var(--muted-2)" }}>
                          {" "}· {PATH_AREAS.find((a) => a.id === o.area)?.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button variant="secondary" size="sm" style={{ marginTop: "var(--s2)" }} onClick={() => { setDraftSelection(uncertaintyIds); setCheckInOpen(true); }}>
                  <RefreshCw size={14} aria-hidden="true" /> {uncertaintyIds.length === 0 ? "Do the check-in" : "Adjust your check-in"}
                </Button>
              </>
            )}

            {checkInOpen && (
              <>
                <div className="uncertainty-options compact" role="group" aria-labelledby="checkin-title">
                  {UNCERTAINTY_OPTIONS.map((o) => {
                    const active = draftSelection.includes(o.id);
                    return (
                      <button
                        key={o.id}
                        type="button"
                        className={`uncertainty-option${active ? " selected" : ""}`}
                        onClick={() => toggleDraft(o.id)}
                        aria-pressed={active}
                      >
                        <span className="uo-check" aria-hidden="true">{active && <Check size={14} />}</span>
                        <span className="uo-statement">{o.statement}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: "var(--s2)", marginTop: "var(--s2)" }}>
                  <Button size="sm" onClick={() => { onCheckIn(draftSelection); setCheckInOpen(false); }}>
                    Save check-in
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setCheckInOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Recommendations driven by the uncertainty model */}
          {!checkInOpen && selections.length > 0 && (
            <div className="checkin-recommendations">
              <div className="micro-label" style={{ marginBottom: 10 }}>
                Because you named it
              </div>
              {recommendedTopics.map((t) => (
                <button key={t.id} type="button" className="recommend-row" onClick={() => onExplain(t)}>
                  <span>
                    <strong>{t.title}</strong>
                    <span className="tiny" style={{ display: "block", color: "var(--muted)" }}>{t.summary}</span>
                  </span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              ))}
              {selectedOptions[0] && (
                <button type="button" className="text-link" style={{ marginTop: 8 }} onClick={() => onNavigate(selectedOptions[0].nextStep.screen)}>
                  {selectedOptions[0].nextStep.label} <ArrowRight size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* -------- Four pathways -------- */}
      <section aria-label="What do you need right now" className="section">
        <div className="pathway-grid">
          {NEED_PATHWAYS.map((p) => (
            <PathwayCard
              key={p.id}
              icon={p.icon}
              question={p.question}
              support={p.support}
              accent={p.id === "dont-understand"}
              onOpen={() => onNavigate(p.screen)}
            />
          ))}
        </div>
      </section>

      {/* -------- Explain this teaser -------- */}
      <section className="explain-teaser" aria-labelledby="explain-title">
        <div>
          <p className="eyebrow" style={{ marginBottom: "var(--s2)" }}>
            <Icon icon={Languages} size={13} /> The idea behind BELONG
          </p>
          <h2 id="explain-title" className="h-section">
            Information is useful. <em>Context makes it usable.</em>
          </h2>
          <p className="lede" style={{ marginTop: "var(--s2)" }}>
            Every explanation opens one question at a time — five levels, from “what is this?” to “when should I
            ask someone?” — each labelled so you know whether you're reading general context, university
            guidance, or a prompt to talk to a person.
          </p>
          <Button
            variant="secondary"
            style={{ marginTop: "var(--s3)" }}
            onClick={() => {
              const t = getTopicById("residence-card");
              if (t) onExplain(t);
            }}
          >
            Try “Explain this” <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>

        <div className="card explain-preview">
          <div className="micro-label" style={{ marginBottom: 6 }}>
            Try one
          </div>
          {["residence-card", "transport-card", "campus-etiquette"]
            .map((id) => getTopicById(id))
            .filter((t): t is Topic => Boolean(t))
            .map((t) => (
              <div className="explain-preview-row" key={t.id}>
                <div>
                  <span
                    className="tiny"
                    style={{ fontWeight: 700, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                  >
                    {t.title}
                  </span>
                  <h3>{t.summary}</h3>
                </div>
                <button type="button" className="circle-btn" onClick={() => onExplain(t)} aria-label={`Explain: ${t.title}`}>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            ))}
          <p className="tiny" style={{ color: "var(--muted-2)", marginTop: 10 }}>
            Plain language · labelled sources · human fallback
          </p>
        </div>
      </section>

      {/* -------- Saved strip -------- */}
      <section className="section" aria-labelledby="saved-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">
              <Icon icon={BookmarkCheck} size={13} /> Saved for later
            </p>
            <h2 id="saved-title" className="h-section" style={{ marginTop: "var(--s2)" }}>
              Your shortlist
            </h2>
          </div>
        </div>
        {saved.length === 0 ? (
          <p className="body-muted" style={{ fontSize: 14.5 }}>
            Nothing saved yet. Save a topic from Explore and it will wait for you here — privately, on this device.
          </p>
        ) : (
          <ul className="divided-list" style={{ marginTop: "var(--s2)" }}>
            {saved.map((item) => (
              <li
                key={item.id}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--s2)", padding: "14px 0" }}
              >
                <div>
                  <strong style={{ fontSize: 15 }}>{item.title}</strong>
                  <span className="small" style={{ color: "var(--muted)", display: "block" }}>
                    {item.detail}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onNavigate(item.screen)}>
                  Open <ArrowRight size={14} aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* -------- Research framing strip -------- */}
      <section className="section" aria-label="Research framing">
        <div className="card panel-sage handoff-note" style={{ alignItems: "center" }}>
          <Icon icon={ShieldCheck} size={20} />
          <p style={{ margin: 0 }}>
            <strong>Research prototype.</strong> “{RESEARCH_QUESTION}” — everything here is hypothetical design
            work exploring this question. No user studies have been conducted yet. <DemoTag>Concept</DemoTag>
          </p>
          <Button variant="ghost" size="sm" onClick={() => onNavigate("research")} style={{ marginLeft: "auto" }}>
            View research notes <ArrowRight size={14} aria-hidden="true" />
          </Button>
        </div>
      </section>
    </div>
  );
}
