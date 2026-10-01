import type { CommunityEvent } from "../types";

/**
 * Representative community events for the prototype.
 * Placeholder data — in a real deployment these would come from verified
 * organisers, and the "attending" counts would be live values.
 *
 * TRACEABILITY — Hypothesis: social events can feel intimidating when social
 * expectations are unknown in advance. Design response: every event exposes
 * group size, activity type, conversation level, duration, location and access
 * notes BEFORE any join decision, and expressing interest stays reversible.
 */
export const communityEvents: CommunityEvent[] = [
  {
    id: "quiet-coffee-walk",
    title: "Quiet coffee walk",
    date: "2026-10-01",
    time: "17:30",
    durationMinutes: 75,
    location: "Campus garden, north gate",
    locationNote: "Look for the small BELONG sign on the bench nearest the gate.",
    intensity: "low",
    conversationLevel: "quiet",
    activityType: "walk",
    attendees: { min: 4, max: 8 },
    attendingCount: 6,
    description:
      "A slow walk with coffee, with built-in quiet stretches. Come as you are; leave whenever you need to. Nobody is asked to introduce themselves.",
    goodToKnow: [
      "There's no programme — just walking and optional talking.",
      "Leaving early is completely normal and nobody comments on it.",
      "If you'd rather listen than talk, that's a normal way to attend.",
    ],
    accessibility: "Step-free paths throughout. Seated option available in the garden if walking isn't comfortable.",
    tags: ["in person", "outdoors", "week one friendly"],
  },
  {
    id: "lunch-without-small-talk",
    title: "Lunch without small talk",
    date: "2026-10-02",
    time: "12:15",
    durationMinutes: 45,
    location: "Student commons, quiet room",
    locationNote: "Second floor — the room has a 'quiet lunch' sign on the door.",
    intensity: "low",
    conversationLevel: "quiet",
    activityType: "meal",
    attendees: { min: 3, max: 6 },
    attendingCount: 5,
    description:
      "Lunch together without the pressure to perform. Eat, read, sketch, or chat if you feel like it. Phones welcome, silence welcome.",
    goodToKnow: [
      "Conversation is optional; eating together quietly is the point.",
      "Buy lunch or bring it — either is fine.",
      "Ends on time so you can make afternoon classes.",
    ],
    accessibility: "Lift access to the second floor. Dietary needs can be noted when you express interest.",
    tags: ["in person", "indoors", "short"],
  },
  {
    id: "city-basics-together",
    title: "City basics together",
    date: "2026-10-04",
    time: "10:00",
    durationMinutes: 150,
    location: "Meet at central station, main hall",
    locationNote: "Under the departures board — a guide holds a small green sign.",
    intensity: "medium",
    conversationLevel: "balanced",
    activityType: "practical",
    attendees: { min: 6, max: 12 },
    attendingCount: 9,
    description:
      "A guided walk through the errands everyone has: getting a transport card, finding the cheap supermarket, seeing where the post office is. Practical, and easier alongside others.",
    goodToKnow: [
      "You'll walk roughly 2 km at an easy pace, with sit-down breaks.",
      "No purchases needed — it's a familiarisation trip, not shopping.",
      "A peer guide leads it and answers the 'obvious' questions without ceremony.",
    ],
    accessibility: "Mostly step-free; the station has lifts. Tell the guide if you'd prefer the step-free route.",
    tags: ["in person", "practical", "guided"],
  },
  {
    id: "language-exchange-cafe",
    title: "Language exchange café",
    date: "2026-10-07",
    time: "18:00",
    durationMinutes: 90,
    location: "Café Aurora, 5 min from campus",
    locationNote: "Ask for the long table at the back — it's reserved.",
    intensity: "medium",
    conversationLevel: "chatty",
    activityType: "language",
    attendees: { min: 8, max: 16 },
    attendingCount: 12,
    description:
      "Practise the local language with patient native speakers who are learning yours. A table card signals your languages; switching mid-sentence is encouraged.",
    goodToKnow: [
      "All levels welcome, including 'I only know three words'.",
      "It's fine to switch to English when tired — most people do mid-evening.",
      "Buying one drink supports the café that hosts us.",
    ],
    accessibility: "Step-free entrance; the back table has chairs with backs and armrests. Menu in several languages at the bar.",
    tags: ["in person", "languages", "recurring"],
  },
  {
    id: "cook-and-eat-simple",
    title: "Cook & eat: five easy dinners",
    date: "2026-10-09",
    time: "17:00",
    durationMinutes: 120,
    location: "Commons teaching kitchen",
    locationNote: "Basement level — follow the smell of garlic.",
    intensity: "medium",
    conversationLevel: "balanced",
    activityType: "meal",
    attendees: { min: 6, max: 10 },
    attendingCount: 7,
    description:
      "Cook five cheap, simple dinners together and eat them family-style. Recipes are chosen to work with basic equipment and any major supermarket.",
    goodToKnow: [
      "Ingredients provided; take leftovers home.",
      "Recipes shared afterwards in a group chat you can join or leave.",
      "Come hungry — this one ends with a proper meal together.",
    ],
    accessibility: "Lift access to the basement. Standing and seating both possible; tell us about allergies when you express interest.",
    tags: ["in person", "food", "recurring"],
  },
  {
    id: "letters-home-writing-hour",
    title: "Letters home: quiet writing hour",
    date: "2026-10-11",
    time: "16:00",
    durationMinutes: 60,
    location: "University library, room 2.14",
    locationNote: "Second floor, past the quiet study area.",
    intensity: "low",
    conversationLevel: "quiet",
    activityType: "quiet-together",
    attendees: { min: 2, max: 8 },
    attendingCount: 3,
    description:
      "An hour to write home — a letter, an email, a diary entry, or a message you've been putting off. Paper, tea, and quiet company provided.",
    goodToKnow: [
      "You don't have to share what you write.",
      "Materials provided if you'd like to try a real letter.",
      "A calm slot for missing home, in company rather than alone.",
    ],
    accessibility: "Lift access. Adjustable desks available in the room.",
    tags: ["in person", "indoors", "quiet"],
  },
];

/* ============================================================
   Labels for the six-attribute safety preview
   ============================================================ */

export const ACTIVITY_TYPE_LABELS: Record<CommunityEvent["activityType"], string> = {
  walk: "Walking together",
  meal: "Shared meal",
  practical: "Practical errands",
  language: "Language practice",
  creative: "Making things",
  "quiet-together": "Quiet, together",
};

export const CONVERSATION_LEVEL_LABELS: Record<CommunityEvent["conversationLevel"], string> = {
  quiet: "Low pressure — quiet is welcome",
  balanced: "Some conversation, no pressure to perform",
  chatty: "Talkative by design — but opt out any time",
};
