import type { ScreenId } from "../types";

export interface NeedPathway {
  id: string;
  /** The question as a student would phrase it. */
  question: string;
  support: string;
  /** Where the pathway leads. */
  screen: ScreenId;
  icon: "compass" | "help" | "users" | "heart";
  /** Uncertainty option this pathway corresponds to, if any. */
  uncertaintyId?: string;
}

export const NEED_PATHWAYS: NeedPathway[] = [
  {
    id: "where-do-i-go",
    question: "Where do I go?",
    support: "Find the next practical step without searching five portals.",
    screen: "explore",
    icon: "compass",
    uncertaintyId: "where-to-go",
  },
  {
    id: "dont-understand",
    question: "I don't understand this",
    support: "Plain-language context in five levels, from what it is to when to ask.",
    screen: "explore",
    icon: "help",
    uncertaintyId: "how-things-work",
  },
  {
    id: "meet-people",
    question: "I want to meet people",
    support: "Low-pressure ways to be around people — joining stays reversible.",
    screen: "community",
    icon: "users",
    uncertaintyId: "not-met-anyone",
  },
  {
    id: "need-help",
    question: "I need help",
    support: "Human support, matched to the kind of question you're carrying.",
    screen: "help",
    icon: "heart",
    uncertaintyId: "need-practical-help",
  },
];

/** Icon names used for topic categories, mapped to Lucide icons in the UI layer. */
export type CategoryIconName =
  | "shopping-basket"
  | "bus"
  | "graduation-cap"
  | "globe"
  | "file-text"
  | "message-square";

export const CATEGORY_ICONS: Record<string, CategoryIconName> = {
  "everyday-life": "shopping-basket",
  transport: "bus",
  university: "graduation-cap",
  culture: "globe",
  documents: "file-text",
  communication: "message-square",
};
