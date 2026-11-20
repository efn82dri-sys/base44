import type { Localized, LocalizedList } from "@/lib/i18n";

export interface Discipline {
  slug: string;
  index: string;
  title: Localized;
  shortTitle: Localized;
  summary: Localized;
  description: Localized;
  services: LocalizedList;
  deliverables: LocalizedList;
  cover: string;
  coverAlt: Localized;
  icon: "architecture" | "energy" | "structure";
  /** Physical anchor of the panorama annotation, in percent of the image box. */
  annotation: { x: number; y: number; caption: Localized; body: Localized };
}

export const disciplines: Discipline[] = [
  {
    slug: "architecture-urbanism",
    index: "01",
    title: {
      en: "Architecture & Urbanism",
      fa: "معماری و شهرسازی",
    },
    shortTitle: {
      en: "Architecture",
      fa: "معماری",
    },
    summary: {
      en: "Architectural design, urban planning, and public-space design carried through one continuous design process.",
      fa: "طراحی معماری، برنامه‌ریزی شهری و طراحی فضای همگانی در یک فرایند طراحی پیوسته.",
    },
    description: {
      en: "We work from the urban scale down to the detail: massing and public realm first, then the building itself. Energy and structural input arrives while the plan is still open, so form is never fixed before it can be tested.",
      fa: "از مقیاس شهری تا جزئیات کار می‌کنیم: ابتدا حجم و عرصه همگانی، سپس خود بنا. ورودی‌های انرژی و سازه زمانی می‌رسند که طرح هنوز باز است، تا فرم پیش از آزمون‌پذیر بودن تثبیت نشود.",
    },
    services: {
      en: [
        "Architectural design",
        "Urban planning & masterplanning",
        "Public space design",
        "Feasibility & programming",
      ],
      fa: [
        "طراحی معماری",
        "برنامه‌ریزی شهری و طرح جامع",
        "طراحی فضای همگانی",
        "امکان‌سنجی و برنامه‌ریزی کاربری",
      ],
    },
    deliverables: {
      en: [
        "Concept and schematic design packages",
        "Urban and landscape planning documents",
        "Coordinated architectural drawing sets",
        "Three-dimensional visualisations",
      ],
      fa: [
        "بسته‌های طراحی مفهومی و طراحی مقدماتی",
        "مدارک برنامه‌ریزی شهری و منظر",
        "مجموعه نقشه‌های هماهنگ‌شده معماری",
        "تصاویر سه‌بعدی",
      ],
    },
    cover: "/images/discipline-architecture.svg",
    coverAlt: {
      en: "Curved contemporary building with warm interior lighting at dusk",
      fa: "بنای معاصر با نمای منحنی و نور گرم داخلی در غروب",
    },
    icon: "architecture",
    annotation: {
      x: 27,
      y: 66,
      caption: { en: "Public pavilion", fa: "پاویون عمومی" },
      body: {
        en: "A low-rise civic pavilion and the public realm around it link the campus together.",
        fa: "پاویونی همگانی و کم‌ارتفاع، همراه با عرصه عمومی پیرامونش، مجموعه را به هم پیوند می‌دهد.",
      },
    },
  },
  {
    slug: "energy-mep",
    index: "02",
    title: {
      en: "Energy & MEP",
      fa: "انرژی و تأسیسات",
    },
    shortTitle: {
      en: "Energy",
      fa: "انرژی",
    },
    summary: {
      en: "Energy modelling, daylight analysis, and building services design tested against agreed performance targets.",
      fa: "مدل‌سازی انرژی، تحلیل نور روز و طراحی تأسیسات، سنجیده‌شده با اهداف عملکردی توافق‌شده.",
    },
    description: {
      en: "Performance is a design input, not a report at the end. We model energy and daylight while massing, glazing and shading are still adjustable, then design the mechanical, electrical and plumbing systems around the result.",
      fa: "عملکرد، ورودی طراحی است نه گزارشی در پایان کار. انرژی و نور روز را زمانی مدل می‌کنیم که حجم، شیشه و سایه‌انداز هنوز قابل تغییرند، و سپس سیستم‌های مکانیکی، برقی و بهداشتی را بر پایه همان نتیجه طراحی می‌کنیم.",
    },
    services: {
      en: [
        "Energy modelling",
        "Daylight & climate analysis",
        "HVAC, electrical & plumbing design",
        "Retrofit & commissioning support",
      ],
      fa: [
        "مدل‌سازی انرژی",
        "تحلیل نور روز و اقلیم",
        "طراحی تأسیسات مکانیکی، برقی و بهداشتی",
        "پشتیبانی بهسازی و راه‌اندازی",
      ],
    },
    deliverables: {
      en: [
        "Energy performance report",
        "Daylight simulation results",
        "MEP drawings and schedules",
        "Load and system calculations",
      ],
      fa: [
        "گزارش عملکرد انرژی",
        "نتایج شبیه‌سازی نور روز",
        "نقشه‌ها و جداول تأسیسات",
        "محاسبات بار و سیستم",
      ],
    },
    cover: "/images/discipline-energy.svg",
    coverAlt: {
      en: "Mechanical plant room with metal ducts and green pipework",
      fa: "موتورخانه تأسیسات با کانال‌های فلزی و لوله‌های سبز",
    },
    icon: "energy",
    annotation: {
      x: 50,
      y: 47,
      caption: { en: "Rooftop photovoltaics", fa: "فوتوولتائیک بام" },
      body: {
        en: "On-site generation and building services coordinated with the roofscape.",
        fa: "تولید انرژی در محل و تأسیسات هماهنگ با منظر بام.",
      },
    },
  },
  {
    slug: "structure-seismic",
    index: "03",
    title: {
      en: "Structure & Seismic",
      fa: "سازه و مهندسی زلزله",
    },
    shortTitle: {
      en: "Structure",
      fa: "سازه",
    },
    summary: {
      en: "Structural design, seismic assessment, and retrofit consulting for new and existing buildings.",
      fa: "طراحی سازه، ارزیابی لرزه‌ای و مشاوره بهسازی برای ساختمان‌های نو و موجود.",
    },
    description: {
      en: "Structural systems are chosen together with the architectural grid, so the frame is visible in the plan rather than imposed on it. For existing buildings we assess, then propose the least invasive retrofit that meets the required performance.",
      fa: "سیستم سازه‌ای همراه با شبکه معماری انتخاب می‌شود تا سازه در پلان دیده شود، نه بر آن تحمیل. در ساختمان‌های موجود ابتدا ارزیابی می‌کنیم و سپس کم‌مداخله‌ترین بهسازی را که عملکرد مورد نیاز را برآورده می‌کند پیشنهاد می‌دهیم.",
    },
    services: {
      en: [
        "Structural design",
        "Seismic assessment",
        "Retrofit consulting",
        "Construction-stage review",
      ],
      fa: [
        "طراحی سازه",
        "ارزیابی لرزه‌ای",
        "مشاوره بهسازی",
        "بازبینی مرحله اجرا",
      ],
    },
    deliverables: {
      en: [
        "Structural calculations",
        "Seismic assessment reports",
        "Reinforcement and retrofit drawings",
        "Site review notes",
      ],
      fa: [
        "محاسبات سازه",
        "گزارش‌های ارزیابی لرزه‌ای",
        "نقشه‌های تقویت و بهسازی",
        "یادداشت‌های بازدید کارگاه",
      ],
    },
    cover: "/images/discipline-structure.svg",
    coverAlt: {
      en: "Exposed concrete columns and beams with strong shadows",
      fa: "ستون‌ها و تیرهای بتنی نمایان با سایه‌های قوی",
    },
    icon: "structure",
    annotation: {
      x: 74,
      y: 38,
      caption: { en: "Ribbed tower", fa: "برج شیاردار" },
      body: {
        en: "A ribbed concrete tower whose lateral system is expressed on the facade.",
        fa: "برجی بتنی با شیارهای نما که سیستم جانبی آن در پوسته بیرونی بیان شده است.",
      },
    },
  },
];

export function getDiscipline(slug: string): Discipline | undefined {
  return disciplines.find((item) => item.slug === slug);
}
