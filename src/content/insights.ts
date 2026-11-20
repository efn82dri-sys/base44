import type { Localized } from "@/lib/i18n";

export interface Insight {
  slug: string;
  title: Localized;
  topic: Localized;
  excerpt: Localized;
  body: Localized;
  date: string;
  published: boolean;
}

/**
 * No insights are published yet. Add entries here (and set published: true)
 * once approved copy exists — the listing page and search pick them up.
 */
export const insights: Insight[] = [];

export const insightTopics = [
  { id: "all", label: { en: "All topics", fa: "همه موضوع‌ها" } as Localized },
  { id: "energy", label: { en: "Energy", fa: "انرژی" } as Localized },
  { id: "structure", label: { en: "Structure", fa: "سازه" } as Localized },
  { id: "design", label: { en: "Design process", fa: "فرایند طراحی" } as Localized },
];
