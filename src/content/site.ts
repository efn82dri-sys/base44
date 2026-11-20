import type { Localized } from "@/lib/i18n";

export const site = {
  name: { en: "ISB Group", fa: "گروه ISB" } as Localized,
  shortName: { en: "ISB", fa: "ISB" } as Localized,
  tagline: {
    en: "Architecture · Energy · Structure",
    fa: "معماری · انرژی · سازه",
  } as Localized,
  defaultTitle: {
    en: "ISB Group — Architecture, Energy & Structure",
    fa: "گروه ISB — معماری، انرژی و سازه",
  } as Localized,
  defaultDescription: {
    en: "An interdisciplinary architecture, engineering and consulting practice integrating architectural design, energy performance and structural resilience.",
    fa: "استودیویی میان‌رشته‌ای در معماری، مهندسی و مشاوره که طراحی معماری، عملکرد انرژی و تاب‌آوری سازه را یکپارچه می‌کند.",
  } as Localized,
  social: [
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/isb.group/" },
  ],
};

export const nav = {
  about: { en: "About", fa: "درباره ما" } as Localized,
  expertise: { en: "Expertise", fa: "تخصص‌ها" } as Localized,
  projects: { en: "Projects", fa: "پروژه‌ها" } as Localized,
  lab: { en: "Sustainability Lab", fa: "آزمایشگاه پایداری" } as Localized,
  team: { en: "Team", fa: "تیم" } as Localized,
  insights: { en: "Insights", fa: "بینش‌ها" } as Localized,
  contact: { en: "Contact", fa: "تماس" } as Localized,
};

export const navItems: { key: string; href: string; label: Localized }[] = [
  { key: "about", href: "/about", label: nav.about },
  { key: "expertise", href: "/expertise", label: nav.expertise },
  { key: "projects", href: "/projects", label: nav.projects },
  { key: "lab", href: "/sustainability-lab", label: nav.lab },
  { key: "team", href: "/team", label: nav.team },
  { key: "insights", href: "/insights", label: nav.insights },
];

export const footerColumns = {
  practice: {
    en: "Practice",
    fa: "استودیو",
  } as Localized,
  disciplines: {
    en: "Disciplines",
    fa: "تخصص‌ها",
  } as Localized,
};

export const footerNote = {
  en: "ISB Group is an interdisciplinary architecture, engineering and consulting practice.",
  fa: "گروه ISB استودیویی میان‌رشته‌ای در معماری، مهندسی و مشاوره است.",
} as Localized;
