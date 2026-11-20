import type { Localized } from "@/lib/i18n";

export type ProjectType = "administrative" | "residential" | "urban-park";

export interface Project {
  slug: string;
  title: Localized;
  location: Localized;
  type: ProjectType;
  typeLabel: Localized;
  service: Localized;
  disciplines: string[];
  cover: string;
  coverAlt: Localized;
  overview: Localized;
  role: Localized;
  /** Only true when the image is an illustration, not a project photograph. */
  conceptImage: boolean;
  /** Verified performance data only. Empty means the section stays hidden. */
  metrics: { label: Localized; value: string }[];
  featuredOrder: number;
  published: boolean;
}

export const projectTypes: { id: ProjectType | "all"; label: Localized }[] = [
  { id: "all", label: { en: "All types", fa: "همه انواع" } },
  { id: "administrative", label: { en: "Administrative", fa: "اداری" } },
  { id: "residential", label: { en: "Residential", fa: "مسکونی" } },
  { id: "urban-park", label: { en: "Urban park", fa: "پارک شهری" } },
];

export const projects: Project[] = [
  {
    slug: "crisis-management-building",
    title: {
      en: "Crisis Management Building",
      fa: "ساختمان مدیریت بحران",
    },
    location: { en: "Mashhad", fa: "مشهد" },
    type: "administrative",
    typeLabel: { en: "Administrative", fa: "اداری" },
    service: { en: "Energy Performance", fa: "عملکرد انرژی" },
    disciplines: ["energy-mep"],
    cover: "/images/project-crisis-management.svg",
    coverAlt: {
      en: "Concept visual of an administrative building at dusk",
      fa: "تصویر مفهومی از یک ساختمان اداری در غروب",
    },
    overview: {
      en: "An administrative building in Mashhad. ISB Group's scope on this project covers energy performance.",
      fa: "ساختمانی اداری در مشهد. حوزه فعالیت گروه ISB در این پروژه، عملکرد انرژی است.",
    },
    role: {
      en: "Energy performance consulting",
      fa: "مشاوره عملکرد انرژی",
    },
    conceptImage: true,
    metrics: [],
    featuredOrder: 1,
    published: true,
  },
  {
    slug: "setayesh-residential-complex",
    title: {
      en: "Setayesh Residential Complex",
      fa: "مجتمع مسکونی ستایش",
    },
    location: { en: "Mashhad", fa: "مشهد" },
    type: "residential",
    typeLabel: { en: "Residential", fa: "مسکونی" },
    service: { en: "Architecture", fa: "معماری" },
    disciplines: ["architecture-urbanism"],
    cover: "/images/project-setayesh.svg",
    coverAlt: {
      en: "Concept visual of a residential complex with lit balconies",
      fa: "تصویر مفهومی از مجتمع مسکونی با بالکن‌های روشن",
    },
    overview: {
      en: "A residential complex in Mashhad. ISB Group's scope on this project covers architectural design.",
      fa: "مجتمع مسکونی در مشهد. حوزه فعالیت گروه ISB در این پروژه، طراحی معماری است.",
    },
    role: {
      en: "Architectural design",
      fa: "طراحی معماری",
    },
    conceptImage: true,
    metrics: [],
    featuredOrder: 2,
    published: true,
  },
  {
    slug: "banafsheh-park",
    title: {
      en: "Banafsheh Park",
      fa: "پارک بنفشه",
    },
    location: { en: "Mashhad", fa: "مشهد" },
    type: "urban-park",
    typeLabel: { en: "Urban Park", fa: "پارک شهری" },
    service: { en: "Climate Analysis", fa: "تحلیل اقلیمی" },
    disciplines: ["energy-mep", "architecture-urbanism"],
    cover: "/images/project-banafsheh-park.svg",
    coverAlt: {
      en: "Concept visual of an urban park with lit paths at dusk",
      fa: "تصویر مفهومی از پارک شهری با مسیرهای روشن در غروب",
    },
    overview: {
      en: "An urban park in Mashhad. ISB Group's scope on this project covers climate analysis.",
      fa: "پارک شهری در مشهد. حوزه فعالیت گروه ISB در این پروژه، تحلیل اقلیمی است.",
    },
    role: {
      en: "Climate analysis",
      fa: "تحلیل اقلیمی",
    },
    conceptImage: true,
    metrics: [],
    featuredOrder: 3,
    published: true,
  },
];

export function publishedProjects(): Project[] {
  return projects
    .filter((project) => project.published)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug && project.published);
}

export function relatedProjects(disciplineSlug: string): Project[] {
  return publishedProjects().filter((project) =>
    project.disciplines.includes(disciplineSlug),
  );
}
