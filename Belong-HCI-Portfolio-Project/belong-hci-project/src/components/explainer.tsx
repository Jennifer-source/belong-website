import { useEffect, useId, useState } from "react";
import {
  ArrowRight, BookmarkPlus, BookmarkCheck, ChevronDown, Landmark, Lock,
} from "lucide-react";
import type { Topic } from "../types";
import { CATEGORY_ICONS } from "../data/pathways";
import { topicCategories } from "../data/topics";
import { Button, ContextTag, DemoTag, Modal, Skeleton } from "./ui";
import { CategoryIcon } from "./layout";

/**
 * The signature interaction — a five-level progressive-disclosure model. The
 * student controls depth: each level answers one question, and the next is
 * opt-in. A level rail shows where you are; any reached level can be revisited.
 *
 * TRACEABILITY
 *  - Hypothesis: information overload in week one exceeds working memory.
 *    Design response: one question per level, revealed on demand (h4).
 *  - Hypothesis: students may hesitate to ask basic questions. Design
 *    response: private self-service before any human escalation (h1).
 *  - Hypothesis: bureaucratic language amplifies uncertainty. Design
 *    response: every level carries an epistemic label — General context /
 *    University guidance / Ask a human — so assumptions are never presented
 *    as authoritative facts (h3).
 */
const LEVELS = [
  { id: 1, question: "What is this?", source: "general" as const },
  { id: 2, question: "Why does it matter?", source: "general" as const },
  { id: 3, question: "What should I do?", source: "official" as const },
  { id: 4, question: "What usually happens next?", source: "general" as const },
  { id: 5, question: "When should I ask someone?", source: "human" as const },
];

interface ExplainerProps {
  topic: Topic;
  onClose: () => void;
  onFindHumanHelp: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

/** Brief simulated "preparing" state so the loading state is observable. */
const EXPLAIN_LOAD_MS = 550;

export function Explainer({ topic, onClose, onFindHumanHelp, isSaved, onToggleSave }: ExplainerProps) {
  const titleId = useId();
  const [loading, setLoading] = useState(true);
  /** Highest level revealed so far. */
  const [maxLevel, setMaxLevel] = useState(1);
  /** Which level was opened from the rail (defaults to the newest). */
  const [openLevel, setOpenLevel] = useState(1);

  // Reset when a different topic opens (the modal remounts per topic, so this
  // normally runs once — the dep guard keeps it correct if that ever changes).
  useEffect(() => {
    setLoading(true);
    setMaxLevel(1);
    setOpenLevel(1);
    const t = window.setTimeout(() => setLoading(false), EXPLAIN_LOAD_MS);
    return () => window.clearTimeout(t);
  }, [topic.id]);

  const category = topicCategories.find((c) => c.id === topic.category);
  const iconName = CATEGORY_ICONS[topic.category] ?? "file-text";

  const revealNext = () => {
    const next = Math.min(maxLevel + 1, 5);
    setMaxLevel(next);
    setOpenLevel(next);
  };

  return (
    <Modal labelledBy={titleId} onClose={onClose}>
      <div style={{ padding: "var(--s4) var(--s4) var(--s3)" }}>
        <div className="eyebrow" style={{ marginBottom: "var(--s2)" }}>
          Explain this
          <DemoTag>Demo topic</DemoTag>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--s2)" }}>
          <span
            aria-hidden="true"
            style={{
              flex: "none",
              width: 42,
              height: 42,
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              background: "var(--tint-everyday-bg)",
              color: "var(--tint-everyday-fg)",
            }}
          >
            <CategoryIcon name={iconName} size={20} />
          </span>
          <h2 id={titleId} className="h-section" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
            {topic.title}
          </h2>
        </div>

        <p className="lede" style={{ fontSize: 15, marginTop: "var(--s2)", marginBottom: 0 }}>
          {topic.intro}
        </p>

        {category && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s1)", marginTop: "var(--s2)" }}>
            <span className={`chip-static tag-${topic.category}`}>{category.label}</span>
          </div>
        )}

        {loading ? (
          <div style={{ marginTop: "var(--s3)" }} role="status" aria-label="Preparing explanation">
            <Skeleton />
            <p className="tiny" style={{ color: "var(--muted-2)", marginTop: 8 }}>
              Preparing plain-language context…
            </p>
          </div>
        ) : (
          <>
            {/* ---------- Level rail ---------- */}
            <nav className="level-rail" aria-label="Explanation levels">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`level-pill${l.id === openLevel ? " current" : ""}${l.id <= maxLevel ? " reached" : ""}`}
                  onClick={() => l.id <= maxLevel && setOpenLevel(l.id)}
                  disabled={l.id > maxLevel}
                  aria-current={l.id === openLevel ? "step" : undefined}
                >
                  <span className="level-num" aria-hidden="true">{l.id}</span>
                  <span className="sr-only">Level {l.id}: </span>
                  {l.question}
                </button>
              ))}
            </nav>

            {/* ---------- Active level ---------- */}
            {openLevel === 1 && (
              <LevelBlock level={1} question="What is this?" source="general">
                <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0 }}>{topic.whatItIs}</p>
              </LevelBlock>
            )}

            {openLevel === 2 && (
              <LevelBlock level={2} question="Why does it matter?" source="general">
                <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0 }}>{topic.whyItMatters}</p>
              </LevelBlock>
            )}

            {openLevel === 3 && (
              <LevelBlock level={3} question="What should I do?" source="official">
                <ol style={{ display: "grid", gap: 10, margin: 0, padding: 0, listStyle: "none" }}>
                  {topic.whatYouNeedToDo.map((step, i) => (
                    <li key={i} style={{ display: "flex", gap: 12 }}>
                      <span
                        aria-hidden="true"
                        style={{
                          flex: "none",
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "var(--sage)",
                          color: "var(--tint-everyday-fg)",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          marginTop: 2,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 14.5, lineHeight: 1.6 }}>{step}</span>
                    </li>
                  ))}
                </ol>
                {topic.universityGuidance && (
                  <p className="tiny" style={{ color: "var(--muted-2)", marginTop: 12, marginBottom: 0, lineHeight: 1.6 }}>
                    <strong>Where the official version lives:</strong> {topic.universityGuidance}
                  </p>
                )}
              </LevelBlock>
            )}

            {openLevel === 4 && (
              <LevelBlock level={4} question="What usually happens next?" source="general">
                <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0 }}>{topic.whatHappensNext}</p>
              </LevelBlock>
            )}

            {openLevel === 5 && (
              <LevelBlock level={5} question="When should I ask someone?" source="human">
                <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0 }}>{topic.whenToAskSomeone}</p>
              </LevelBlock>
            )}

            {/* ---------- Progressive controls ---------- */}
            <div className="disclosure-controls">
              {maxLevel < 5 ? (
                <Button onClick={revealNext}>
                  Show level {maxLevel + 1}: {LEVELS[maxLevel].question.replace(/\?$/, "")}
                  <ChevronDown size={16} aria-hidden="true" />
                </Button>
              ) : (
                <p className="tiny" style={{ color: "var(--muted-2)", margin: 0 }}>
                  All five levels — you can revisit any of them above.
                </p>
              )}
              {maxLevel < 5 && (
                <span className="tiny" style={{ color: "var(--muted-2)" }}>
                  {5 - maxLevel} more {5 - maxLevel === 1 ? "level" : "levels"} when you want {5 - maxLevel === 1 ? "it" : "them"}
                </span>
              )}
            </div>

            {topic.variesNote && (
              <p className="tiny" style={{ color: "var(--muted-2)", marginTop: "var(--s2)", lineHeight: 1.6 }}>
                {topic.variesNote}
              </p>
            )}

            <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "var(--s3) 0 var(--s2)" }} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s2)", alignItems: "center" }}>
              <Button variant="secondary" size="sm" onClick={onToggleSave}>
                {isSaved ? (
                  <>
                    <BookmarkCheck size={15} aria-hidden="true" /> Saved
                  </>
                ) : (
                  <>
                    <BookmarkPlus size={15} aria-hidden="true" /> Save this
                  </>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={onFindHumanHelp}>
                <Landmark size={15} aria-hidden="true" /> Ask a human
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </div>

            <p
              style={{
                fontSize: 12,
                color: "var(--muted)",
                background: "var(--paper)",
                border: "1px dashed var(--line-strong)",
                borderRadius: "var(--r-md)",
                padding: "10px 12px",
                lineHeight: 1.6,
                display: "flex",
                gap: 8,
                margin: "var(--s3) 0 0",
              }}
            >
              <Lock size={15} aria-hidden="true" style={{ flex: "none", marginTop: 2 }} />
              <span>
                <strong>Belong provides general context.</strong> Always verify official requirements with your
                university or local authority.
              </span>
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}

/**
 * One level of the explanation, with its epistemic label.
 * The ContextTag is not decoration — it is the context layer: it tells the
 * reader what kind of claim they are reading.
 */
function LevelBlock({
  level,
  question,
  source,
  children,
}: {
  level: number;
  question: string;
  source: "general" | "official" | "human";
  children: React.ReactNode;
}) {
  return (
    <section className="level-block" aria-label={`Level ${level}: ${question}`}>
      <div className="level-head">
        <span className="level-question">
          <span className="level-badge" aria-hidden="true">{level}</span>
          {question}
        </span>
        <ContextTag source={source} />
      </div>
      {children}
    </section>
  );
}
