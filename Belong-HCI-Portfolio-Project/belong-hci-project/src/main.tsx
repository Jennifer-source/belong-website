import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { CommunityEvent, Topic } from "./types";
import { getTopicById } from "./data/topics";
import { useDemoState } from "./hooks/useDemoState";
import { useToast } from "./lib/toast";
import { useHashRoute, scrollTop } from "./lib/router";
import { Footer, TopBar } from "./components/layout";
import { Toast } from "./components/ui";
import { Explainer } from "./components/explainer";
import { Welcome } from "./screens/Welcome";
import { Onboarding } from "./screens/Onboarding";
import { Home } from "./screens/Home";
import { Explore } from "./screens/Explore";
import { Community } from "./screens/Community";
import { Help } from "./screens/Help";
import { Research } from "./screens/Research";
import { UNCERTAINTY_OPTIONS } from "./data/orientation";
import "./styles.css";

/**
 * Journey-stage inference: the model never claims to know where the student
 * "really" is. The stage follows the areas the student named as hard — the
 * earliest named area is where they are — with progress and social comfort as
 * secondary signals. A soft recommendation, revisable at any time.
 */
const AREA_STAGE: Record<string, number> = {
  "getting-oriented": 0,
  university: 2,
  communication: 2,
  "everyday-life": 3,
  community: 4,
};

function inferJourneyStage(progressStep: number, uncertaintyIds: string[], comfort: string | null): number {
  // Named uncertainties place the student at the earliest area they struggle with.
  const namedStages = uncertaintyIds
    .map((id) => UNCERTAINTY_OPTIONS.find((o) => o.id === id)?.area)
    .filter((a): a is NonNullable<(typeof UNCERTAINTY_OPTIONS)[number]["area"]> => Boolean(a))
    .map((a) => AREA_STAGE[a] ?? 1);

  let idx = namedStages.length > 0 ? Math.min(...namedStages) : 1;

  // Progress nudges forward; comfort only lifts the stage once earlier
  // areas aren't named as uncertain.
  idx = Math.max(idx, progressStep >= 3 ? 3 : idx);
  if (comfort && namedStages.every((s) => s >= 3)) idx = Math.max(idx, 4);
  if (comfort && progressStep >= 4) idx = Math.max(idx, 5);
  return Math.min(idx, 5);
}

function App() {
  const { screen, navigate } = useHashRoute();
  const { toast, notify } = useToast();
  const demo = useDemoState();
  const { state } = demo;
  const savedItems = state.saved;

  const [explainTopic, setExplainTopic] = useState<Topic | null>(null);
  /** Onboarding runs when the student enters via "I'm new here". */
  const [onboardingActive, setOnboardingActive] = useState(false);

  const navigateScroll = useCallback(
    (s: Parameters<typeof navigate>[0]) => {
      navigate(s);
      scrollTop();
    },
    [navigate]
  );

  const openExplain = useCallback((t: Topic) => setExplainTopic(t), []);
  const closeExplain = useCallback(() => setExplainTopic(null), []);

  const toggleTopicSave = useCallback(
    (t: Topic) => {
      // Derive "added" from current state, not from inside the setState
      // updater — the updater runs asynchronously under React 18.
      const added = !savedItems.some((s) => s.id === `topic:${t.id}`);
      demo.toggleSaved({
        id: `topic:${t.id}`,
        kind: "topic",
        title: t.title,
        screen: "explore",
        detail: t.summary,
      });
      notify(added ? `Saved “${t.title}” to your shortlist` : `Removed “${t.title}” from your shortlist`);
    },
    [demo, notify, savedItems]
  );

  const toggleEventInterest = useCallback(
    (ev: CommunityEvent) => {
      // Same rule as toggleTopicSave: read current state before toggling,
      // because the setState updater is async under React 18.
      const added = !state.interestedEventIds.includes(ev.id);
      demo.toggleInterest(ev.id);
      notify(
        added
          ? `You're on the interest list for “${ev.title}” — no commitment yet`
          : "Interest removed — no one was notified"
      );
      if (!added) return;
      if (state.interestedEventIds.length === 0) {
        demo.advanceProgress();
      }
    },
    [demo, notify, state.interestedEventIds]
  );

  const goHelpFromExplainer = useCallback(() => {
    setExplainTopic(null);
    navigateScroll("help");
  }, [navigateScroll]);

  useEffect(() => {
    scrollTop();
  }, [screen, onboardingActive]);

  const journeyStage = inferJourneyStage(state.progressStep, state.uncertaintyIds, state.comfortLevel);
  const effectiveScreen = !state.hasEntered && screen === "home" ? "welcome" : screen;

  const toggleSaveById = useCallback(
    (topicId: string) => {
      const t = getTopicById(topicId);
      if (t) toggleTopicSave(t);
    },
    [toggleTopicSave]
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <TopBar
        screen={onboardingActive ? "home" : effectiveScreen}
        onNavigate={(s) => {
          setOnboardingActive(false);
          navigateScroll(s);
        }}
        savedCount={savedItems.length}
      />

      {/* One <main> landmark across every screen, so heading order is
          document-consistent: h1 per screen inside a single main region. */}
      <main id="main" className="app-main">
        {onboardingActive ? (
          <Onboarding
            onComplete={({ uncertaintyIds, comfort }) => {
              demo.saveCheckIn(uncertaintyIds);
              demo.setComfortLevel(comfort);
              demo.completeOnboarding();
              setOnboardingActive(false);
              navigateScroll("home");
              notify("You're set. Everything here can be changed later.");
            }}
            onSkip={() => {
              demo.completeOnboarding();
              setOnboardingActive(false);
              navigateScroll("home");
            }}
          />
        ) : effectiveScreen === "welcome" ? (
          <Welcome
            onStartOnboarding={() => {
              demo.enterExperience();
              setOnboardingActive(true);
              scrollTop();
            }}
            onBrowse={() => {
              demo.enterExperience();
              demo.completeOnboarding();
              navigateScroll("home");
            }}
          />
        ) : (
          <div className="app">
            {effectiveScreen === "home" && (
              <Home
                onNavigate={navigateScroll}
                onExplain={openExplain}
                saved={savedItems}
                uncertaintyIds={state.uncertaintyIds}
                onCheckIn={demo.saveCheckIn}
                journeyStage={journeyStage}
              />
            )}
            {effectiveScreen === "explore" && (
              <Explore
                onExplain={openExplain}
                savedIds={savedItems.filter((s) => s.kind === "topic").map((s) => s.id.replace("topic:", ""))}
                onToggleSave={toggleTopicSave}
              />
            )}
            {effectiveScreen === "community" && (
              <Community
                interestedIds={state.interestedEventIds}
                onToggleInterest={toggleEventInterest}
                comfortLevel={state.comfortLevel}
                onComfortChange={demo.setComfortLevel}
              />
            )}
            {effectiveScreen === "help" && <Help />}
            {effectiveScreen === "research" && <Research onNavigateHome={() => navigateScroll("home")} />}
          </div>
        )}
      </main>

      {effectiveScreen !== "welcome" && !onboardingActive && <Footer onNavigate={navigateScroll} />}

      {/* The explainer doesn't open over onboarding — the orientation flow
          stays single-focus. */}
      {explainTopic && !onboardingActive && (
        <Explainer
          topic={explainTopic}
          onClose={closeExplain}
          onFindHumanHelp={goHelpFromExplainer}
          isSaved={savedItems.some((s) => s.id === `topic:${explainTopic.id}`)}
          onToggleSave={() => toggleSaveById(explainTopic.id)}
        />
      )}

      {toast && <Toast message={toast} />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
