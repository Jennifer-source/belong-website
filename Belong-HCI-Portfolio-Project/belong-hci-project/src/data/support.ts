import type { EscalationTier, SupportResource } from "../types";

/**
 * The escalation ladder — SELF-SERVICE → PEER SUPPORT → UNIVERSITY SUPPORT →
 * URGENT HELP.
 *
 * TRACEABILITY — Hypothesis: self-service fails silently; students don't know
 * when to stop reading and start asking. Design response: each rung states
 * what it is for and when to move up, and every explanation lands on a rung.
 */
export const ESCALATION_TIERS: EscalationTier[] = [
  {
    id: "self-service",
    rung: 1,
    title: "Self-service",
    bestFor: "Understanding what something is, on your own, at your own pace.",
    behaviour:
      "“Explain this” gives plain-language context in five levels. No account, no disclosure, no social cost.",
    moveUpWhen: "Move up when the explanation doesn't match your situation, or it stops feeling certain.",
  },
  {
    id: "peer",
    rung: 2,
    title: "Peer support",
    bestFor: "“What's it actually like?” — experience, workarounds, reassurance.",
    behaviour:
      "Ask a peer guide who arrived the way you just did. Low stakes; they volunteered to be asked.",
    moveUpWhen: "Move up when you need an official answer, not an experienced one.",
  },
  {
    id: "university",
    rung: 3,
    title: "University support",
    bestFor: "Anything official: documents, deadlines, wellbeing, appeals.",
    behaviour:
      "The international office and counselling service answer for their institutions — and nothing is too basic.",
    moveUpWhen: "Move up when it can't wait for office hours.",
  },
  {
    id: "urgent",
    rung: 4,
    title: "Urgent help",
    bestFor: "Safety, health, or anything that can't wait.",
    behaviour: "Immediate contacts, no appointment, no waiting.",
    moveUpWhen: "This is the top of the ladder — it exists so the others can stay calm.",
  },
];

/**
 * Human-support layer. Demo contact details are illustrative placeholders —
 * marked as demo in the interface, never presented as a live service.
 */
export const supportResources: SupportResource[] = [
  {
    id: "peer-guide",
    kind: "peer",
    tier: "peer",
    title: "Peer Guide",
    whenToReachOut:
      "The questions a website can't quite answer: what something is actually like, what they wish they'd known, how they handled it.",
    description:
      "A senior student who arrived here the way you just did. They remember what the first weeks felt like, and they volunteered to be asked.",
    prepareChecklist: [
      "Whatever you're actually wondering — there's no too-small question",
      "Nothing else; no preparation needed",
    ],
    channels: [
      {
        id: "pg-message",
        label: "Ask a question",
        detail: "Matched with a guide from a similar programme — usually within two days",
        suggestedMessage:
          "Hi! I've just arrived and I'm wondering about ____ . How did you handle it in your first weeks?",
      },
      {
        id: "pg-coffee",
        label: "First-week coffee chat",
        detail: "A one-time 20-minute chat, online or in person — no commitment after that",
      },
    ],
    contactHint: "Demo programme — connect this to your student mentoring scheme.",
    hours: "Guides reply in their own time — usually within two days",
  },
  {
    id: "international-office",
    kind: "office",
    tier: "university",
    title: "International Office",
    whenToReachOut:
      "University procedures, documents, deadlines, visas, and anything official that you don't want to get wrong.",
    description:
      "The office whose job is exactly these questions. They answer them every day, in several languages, and nothing is too basic to ask.",
    prepareChecklist: [
      "Your student ID number",
      "The email or letter you're asking about",
      "A one-line summary of what you need",
    ],
    channels: [
      {
        id: "io-email",
        label: "Email",
        detail: "international.office@university.example — replies in 2–3 working days",
        suggestedMessage:
          "Hello — I'm an international student starting this term (ID: ____). I have a question about ____ . Could you tell me what I need to do? Thank you!",
      },
      {
        id: "io-dropin",
        label: "Drop-in hours",
        detail: "Mon–Thu, 10:00–14:00, Admin Building, Room 1.02",
      },
    ],
    contactHint: "Demo contact — replace with your institution's real details.",
    hours: "Mon–Fri, 09:00–16:00",
  },
  {
    id: "wellbeing-support",
    kind: "wellbeing",
    tier: "university",
    title: "Wellbeing Support",
    whenToReachOut:
      "When the quiet weeks aren't just quiet anymore, or stress about deadlines, money, or family is sitting on your chest.",
    description:
      "Free, confidential counselling for students, with staff experienced in culture shock, homesickness, and the specific weight of being far from your usual support network.",
    prepareChecklist: [
      "Nothing — you can simply say you'd like to talk",
      "Optional: a rough note of what's been hardest lately",
    ],
    channels: [
      {
        id: "wb-book",
        label: "Book a first conversation",
        detail: "A 30-minute, no-obligation introductory chat",
        suggestedMessage:
          "Hello — I'd like to book a first conversation. Some times that work for me are ____ .",
      },
      {
        id: "wb-dropin",
        label: "Same-day drop-in",
        detail: "Counselling centre, 13:00–15:00 on weekdays, first come first served",
      },
    ],
    contactHint: "Demo contact — link your institution's counselling service here.",
    hours: "Mon–Fri, 09:00–17:00",
  },
  {
    id: "urgent-help",
    kind: "urgent",
    tier: "urgent",
    title: "Urgent Help",
    whenToReachOut:
      "Safety, health, or anything that can't wait for an office to open. This is the layer you hope never to need.",
    description:
      "Immediate contacts for emergencies, urgent medical care, and crisis support — plus the numbers worth saving in your phone during week one.",
    prepareChecklist: [
      "Save these numbers in your phone now, in week one",
      "Learn your address in the local language — it matters in an emergency",
    ],
    channels: [
      {
        id: "uh-emergency",
        label: "Emergency services",
        detail: "112 — the standard emergency number across Europe; check your local equivalent",
      },
      {
        id: "uh-crisis",
        label: "Crisis support line",
        detail: "A confidential line for moments when you need to talk to someone now",
      },
      {
        id: "uh-campus",
        label: "Campus security, 24/7",
        detail: "For anything on campus, day or night",
      },
    ],
    contactHint: "Demo numbers — always verify local emergency numbers on arrival.",
    hours: "Always available",
  },
];


