import { disciplines } from "@/content/disciplines";
import { projects } from "@/content/projects";
import { insights } from "@/content/insights";
import { aboutPage, contactPage, expertisePage, insightsPage, teamPage } from "@/content/pages";
import { labPage } from "@/content/lab";
import { nav } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";
import { ui } from "@/content/dictionary";

export type SearchResultType = "page" | "project" | "discipline" | "insight";

export interface SearchEntry {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  url: string;
  keywords: string;
}

const typeLabel = (type: SearchResultType, locale: Locale) => {
  switch (type) {
    case "project":
      return ui.searchTypeProject[locale];
    case "discipline":
      return ui.searchTypeDiscipline[locale];
    case "insight":
      return ui.searchTypeInsight[locale];
    default:
      return ui.searchTypePage[locale];
  }
};

export function resultTypeLabel(type: SearchResultType, locale: Locale): string {
  return typeLabel(type, locale);
}

/** Everything published on the site, in the requested language. */
export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const pages: SearchEntry[] = [
    {
      id: "page-home",
      type: "page",
      title: nav.about[locale] === "" ? "Home" : locale === "fa" ? "خانه" : "Home",
      description:
        locale === "fa"
          ? "معرفی گروه ISB و سه تخصص یکپارچه"
          : "ISB Group overview and the three integrated disciplines",
      url: href(locale),
      keywords: "home homepage isb group start",
    },
    {
      id: "page-about",
      type: "page",
      title: aboutPage.eyebrow[locale],
      description: aboutPage.title[locale],
      url: href(locale, "/about"),
      keywords: "about practice studio approach integrated",
    },
    {
      id: "page-expertise",
      type: "page",
      title: expertisePage.eyebrow[locale],
      description: expertisePage.title[locale],
      url: href(locale, "/expertise"),
      keywords: "services expertise disciplines",
    },
    {
      id: "page-projects",
      type: "page",
      title: nav.projects[locale],
      description: locale === "fa" ? "همه پروژه‌های منتشرشده" : "All published projects",
      url: href(locale, "/projects"),
      keywords: "projects portfolio work mashhad",
    },
    {
      id: "page-lab",
      type: "page",
      title: nav.lab[locale],
      description: labPage.title[locale],
      url: href(locale, "/sustainability-lab"),
      keywords: "sustainability lab daylight energy carbon assessment sda eui",
    },
    {
      id: "page-team",
      type: "page",
      title: teamPage.eyebrow[locale],
      description: teamPage.title[locale],
      url: href(locale, "/team"),
      keywords: "team people studio",
    },
    {
      id: "page-insights",
      type: "page",
      title: insightsPage.eyebrow[locale],
      description: insightsPage.title[locale],
      url: href(locale, "/insights"),
      keywords: "insights articles notes",
    },
    {
      id: "page-contact",
      type: "page",
      title: contactPage.eyebrow[locale],
      description: contactPage.title[locale],
      url: href(locale, "/contact"),
      keywords: "contact inquiry project partnership",
    },
  ];

  const disciplineEntries: SearchEntry[] = disciplines.map((discipline) => ({
    id: `discipline-${discipline.slug}`,
    type: "discipline",
    title: discipline.title[locale],
    description: discipline.summary[locale],
    url: href(locale, `/expertise/${discipline.slug}`),
    keywords: [
      discipline.title.en,
      discipline.title.fa,
      discipline.services[locale].join(" "),
    ].join(" "),
  }));

  const projectEntries: SearchEntry[] = projects
    .filter((project) => project.published)
    .map((project) => ({
      id: `project-${project.slug}`,
      type: "project",
      title: project.title[locale],
      description: `${project.location[locale]} · ${project.typeLabel[locale]}`,
      url: href(locale, `/projects/${project.slug}`),
      keywords: [
        project.title.en,
        project.title.fa,
        project.location.en,
        project.location.fa,
        project.typeLabel.en,
        project.typeLabel.fa,
        project.service.en,
        project.service.fa,
      ].join(" "),
    }));

  const insightEntries: SearchEntry[] = insights
    .filter((insight) => insight.published)
    .map((insight) => ({
      id: `insight-${insight.slug}`,
      type: "insight",
      title: insight.title[locale],
      description: insight.excerpt[locale],
      url: href(locale, `/insights/${insight.slug}`),
      keywords: [insight.title.en, insight.title.fa, insight.topic[locale]].join(" "),
    }));

  return [...pages, ...disciplineEntries, ...projectEntries, ...insightEntries];
}

export function searchSite(index: SearchEntry[], query: string): SearchEntry[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  return index.filter((entry) => {
    const haystack = `${entry.title} ${entry.description} ${entry.keywords}`.toLowerCase();
    return haystack.includes(needle);
  });
}
