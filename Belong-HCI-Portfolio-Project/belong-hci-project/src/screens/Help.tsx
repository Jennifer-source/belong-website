import { useState } from "react";
import { HandHeart } from "lucide-react";
import type { EscalationTierId, SupportChannel, SupportResource } from "../types";
import { supportResources } from "../data/support";
import { EscalationLadder, SupportCard } from "../components/cards";
import { ChannelModal, Icon } from "../components/ui";

/**
 * TRACEABILITY (h5): the escalation model — self-service → peer → university
 * → urgent — is the page's spine. Each rung says what it's for and when to
 * move up, so the student learns when the system stops being the right tool.
 */
export function Help() {
  /** The channel the student tapped — opens an honest demo handoff modal. */
  const [openChannel, setOpenChannel] = useState<{ resource: SupportResource; channel: SupportChannel } | null>(null);

  const handleChannel = (resource: SupportResource, channelLabel: string) => {
    const channel = resource.channels.find((c) => c.label === channelLabel) ?? null;
    if (channel) setOpenChannel({ resource, channel });
  };

  const byTier = (tier: EscalationTierId) => supportResources.filter((r) => r.tier === tier);

  const goTier = (tier: EscalationTierId) => {
    const el = document.getElementById(`tier-${tier}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="shell page">
      <section className="page-hero">
        <p className="eyebrow">Help</p>
        <h1 className="h-display" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
          Some questions are contextual.{" "}
          <em>You don't always have to solve them yourself.</em>
        </h1>
        <p className="lede">
          BELONG is one tool on a ladder of support. The rungs below show the whole climb — including where this
          app ends and people begin.
        </p>
      </section>

      {/* -------- Escalation model -------- */}
      <section className="section" aria-labelledby="ladder-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">The escalation model</p>
            <h2 id="ladder-title" className="h-section" style={{ fontSize: "clamp(22px, 2.8vw, 32px)", marginTop: "var(--s2)" }}>
              From reading to asking, <em>in four rungs.</em>
            </h2>
          </div>
        </div>
        <EscalationLadder onGo={goTier} />
      </section>

      {/* -------- University + urgent support resources -------- */}
      <section className="section" aria-labelledby="contacts-title" id="tier-university">
        <div className="section-head">
          <h2 id="contacts-title" className="h-section" style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}>
            University support
          </h2>
          <span className="tiny" style={{ color: "var(--muted)" }}>
            Demo contacts — placeholders for your institution's real services
          </span>
        </div>
        <div className="support-grid">
          {byTier("university").map((r) => (
            <SupportCard key={r.id} resource={r} onChannelOpen={handleChannel} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="peer-title" id="tier-peer">
        <div className="section-head">
          <h2 id="peer-title" className="h-section" style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}>
            Peer support
          </h2>
        </div>
        <div className="support-grid" style={{ gridTemplateColumns: "1fr" }}>
          {byTier("peer").map((r) => (
            <SupportCard key={r.id} resource={r} onChannelOpen={handleChannel} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="urgent-title" id="tier-urgent">
        <div className="section-head">
          <h2 id="urgent-title" className="h-section" style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}>
            Urgent help
          </h2>
        </div>
        <div className="support-grid" style={{ gridTemplateColumns: "1fr" }}>
          {byTier("urgent").map((r) => (
            <SupportCard key={r.id} resource={r} onChannelOpen={handleChannel} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="handoff-title">
        <div className="card panel handoff-note">
          <Icon icon={HandHeart} size={20} />
          <p style={{ margin: 0 }}>
            <strong id="handoff-title">When self-service stops being the right tool.</strong> If an explanation
            doesn't fit your situation — or you've read it three times and it still feels shaky — that's the
            signal to stop reading and ask. Every “Explain this” ends at a rung of the ladder above.
          </p>
        </div>
      </section>

      {openChannel && (
        <ChannelModal
          channelLabel={openChannel.channel.label}
          resourceTitle={openChannel.resource.title}
          detail={openChannel.channel.detail}
          message={openChannel.channel.suggestedMessage}
          onClose={() => setOpenChannel(null)}
        />
      )}
    </div>
  );
}
