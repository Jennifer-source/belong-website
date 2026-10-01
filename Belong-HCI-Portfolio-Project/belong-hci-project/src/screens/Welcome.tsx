import { ArrowRight, Compass, MapPin, Users } from "lucide-react";
import { JOURNEY_STAGES, RESEARCH_QUESTION } from "../data/orientation";
import { Button } from "../components/ui";

interface WelcomeProps {
  onStartOnboarding: () => void;
  onBrowse: () => void;
}

/**
 * TRACEABILITY (h1, h6): the first screen does two things — it names the
 * research question the product exists to explore, and it offers the private
 * uncertainty check-in before anything social or adaptive happens.
 */
export function Welcome({ onStartOnboarding, onBrowse }: WelcomeProps) {
  return (
    <div className="welcome">
      <div className="welcome-inner">
        <div className="welcome-copy">
          <p className="eyebrow">
            <span aria-hidden="true">◦</span> A prototype, exploring a question
          </p>
          <h1 className="h-display">
            <em>You don't have to figure everything out alone.</em>
          </h1>
          <p className="lede">
            BELONG is a design prototype for international students — plain-language explanations for unfamiliar
            systems, low-pressure ways to meet people, and a clear path to human help when you need it.
          </p>
          <blockquote className="rq-quote">
            <span className="sr-only">The research question behind this prototype: </span>
            “{RESEARCH_QUESTION}”
          </blockquote>
          <div className="welcome-actions">
            <Button size="lg" onClick={onStartOnboarding}>
              I'm new here <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="lg" onClick={onBrowse}>
              Skip — take me straight in
            </Button>
          </div>
          <ul className="welcome-trust">
            <li>
              <span aria-hidden="true">•</span> Explanations in plain language, labelled general context or official guidance
            </li>
            <li>
              <span aria-hidden="true">•</span> Joining things stays reversible — browse without committing
            </li>
            <li>
              <span aria-hidden="true">•</span> Human support is one step away, always
            </li>
          </ul>
        </div>

        <div className="welcome-visual" aria-hidden="true">
          <div className="wv-disc" />
          <div className="wv-center">
            <span className="wv-word">belong</span>
          </div>
          <div className="wv-card c1">
            <MapPin size={15} /> Where do I go?
          </div>
          <div className="wv-card c2">
            <Users size={15} /> Meet people, gently
          </div>
          <div className="wv-card c3">
            <Compass size={15} /> I don't understand this
          </div>
        </div>
      </div>

      {/* Journey strip — the orientation model at a glance */}
      <div className="shell">
        <ol className="welcome-journey" aria-label="The six stages of the first weeks">
          {JOURNEY_STAGES.map((s, i) => (
            <li key={s.id}>
              <span className="wj-num" aria-hidden="true">{i + 1}</span>
              <span className="wj-title">{s.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
