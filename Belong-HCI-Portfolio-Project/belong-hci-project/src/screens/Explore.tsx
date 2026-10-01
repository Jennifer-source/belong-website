import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import type { Topic, TopicCategoryId } from "../types";
import { topicCategories, topics } from "../data/topics";
import { TopicCard } from "../components/cards";
import { Button, Chip, EmptyState, Skeleton } from "../components/ui";

interface ExploreProps {
  onExplain: (t: Topic) => void;
  savedIds: string[];
  onToggleSave: (topic: Topic) => void;
}

/** Simulates a short fetch so loading/skeleton states are demonstrable. */
function useTopicLoad() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(t);
  }, []);
  return loading;
}

/**
 * TRACEABILITY (h1, h4): the Explore library is the anonymous self-service
 * rung — every card opens the five-level explainer rather than a wall of text.
 */
export function Explore({ onExplain, savedIds, onToggleSave }: ExploreProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TopicCategoryId | "all">("all");
  const loading = useTopicLoad();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (!q) return true;
      const haystack = [t.title, t.summary, t.intro, ...t.keywords].join(" ").toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [query, category]);

  return (
    <div className="shell page">
      <section className="page-hero">
        <p className="eyebrow">Explore</p>
        <h1 className="h-display" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
          Make the unfamiliar <em>easier to approach.</em>
        </h1>
        <p className="lede">
          Short explanations for the systems around you — each one opens a question at a time, from “what is
          this?” to “when should I ask someone?”, with sources labelled.
        </p>
      </section>

      <div className="explore-tools">
        <div className="search-field">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            placeholder="Try “bank”, “email”, “bins”…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search topics"
          />
        </div>
        <p className="result-count" role="status">
          {loading ? "Loading topics…" : `${filtered.length} of ${topics.length} topics`}
        </p>
      </div>

      <div className="chip-row" role="group" aria-label="Filter by category">
        <Chip label="All" selected={category === "all"} onPress={() => setCategory("all")} />
        {topicCategories.map((c) => (
          <Chip
            key={c.id}
            label={c.label}
            selected={category === c.id}
            onPress={() => setCategory(category === c.id ? "all" : c.id)}
          />
        ))}
      </div>

      {loading ? (
        <div className="topic-grid" aria-label="Loading topics">
          {[0, 1, 2].map((i) => (
            <div className="card" key={i} style={{ padding: "var(--s3)", minHeight: 240 }}>
              <Skeleton />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nothing in the library matches that yet"
          body="The library is deliberately small for the prototype. Try a broader word, clear the filters — or take the question to a human on the Help page."
          action={
            <div style={{ display: "flex", gap: "var(--s2)", justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                Clear search & filters
              </Button>
              <Button variant="ghost" size="sm" onClick={() => (window.location.hash = "/help")}>
                Ask a human instead
              </Button>
            </div>
          }
        />
      ) : (
        <div className="topic-grid">
          {filtered.map((t) => (
            <TopicCard
              key={t.id}
              topic={t}
              onExplain={onExplain}
              isSaved={savedIds.includes(t.id)}
              onToggleSave={() => onToggleSave(t)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
