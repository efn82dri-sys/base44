import type { Localized } from "@/lib/i18n";

export const hero = {
  meta: {
    en: "ARCHITECTURE  |  ENERGY & MEP  |  STRUCTURE & SEISMIC",
    fa: "معماری  |  انرژی و تأسیسات  |  سازه و مهندسی زلزله",
  } as Localized,
  headline: {
    en: { before: "Designing Resilient, Efficient & Human-Centered ", accent: "Environments" },
    fa: { before: "طراحی فضاهای تاب‌آور، کارآمد و ", accent: "انسان‌محور" },
  },
  support: {
    en: "An interdisciplinary team integrating architecture, energy performance, and structural resilience to create better places to live and work.",
    fa: "معماری، عملکرد انرژی و تاب‌آوری سازه را در یک فرایند طراحی یکپارچه می‌کنیم تا فضاهای بهتری برای زندگی و کار شکل بگیرند.",
  } as Localized,
  primaryCta: { en: "Explore the Campus", fa: "کاوش در مجموعه" } as Localized,
  secondaryCta: { en: "Our Services", fa: "خدمات ما" } as Localized,
  caption: { en: "ISB Sustainable Town", fa: "شهر پایدار ISB" } as Localized,
  captionNote: {
    en: "Illustrative campus visual",
    fa: "تصویر مفهومی از مجموعه",
  } as Localized,
  expand: { en: "Expand panorama", fa: "نمایش بزرگ‌تر" } as Localized,
  imageAlt: {
    en: "Panoramic view of a sustainable mixed-use town at blue hour with mountains, a public pavilion, rooftop solar panels and a ribbed tower",
    fa: "نمای پانوراما از یک شهر پایدار با کاربری مختلط در ساعات آبی روز، با کوه‌ها، پاویون عمومی، پنل‌های خورشیدی بام و یک برج شیاردار",
  } as Localized,
  imageAltMobile: {
    en: "Detail of the sustainable town with a lit public pavilion and rooftop solar panels",
    fa: "جزئیاتی از شهر پایدار با پاویون عمومی روشن و پنل‌های خورشیدی بام",
  } as Localized,
  exploreLabel: { en: "Explore the campus", fa: "کاوش در مجموعه" } as Localized,
  closeLabel: { en: "Close", fa: "بستن" } as Localized,
  dialogTitle: { en: "ISB Sustainable Town", fa: "شهر پایدار ISB" } as Localized,
  dialogNote: {
    en: "Concept visual. Select a discipline to see its contribution.",
    fa: "تصویر مفهومی. یک تخصص را انتخاب کنید تا سهم آن را ببینید.",
  } as Localized,
};

export const expertiseSection = {
  label: { en: "OUR EXPERTISE", fa: "تخصص ما" } as Localized,
  title: {
    en: "Three Disciplines. One Integrated Solution.",
    fa: "سه تخصص، یک راه‌حل یکپارچه",
  } as Localized,
  intro: {
    en: "Architecture, energy and structure are developed together, on one model, from the first sketch to the final site review.",
    fa: "معماری، انرژی و سازه از نخستین طرح تا آخرین بازدید کارگاه، با هم و روی یک مدل مشترک توسعه می‌یابند.",
  } as Localized,
  cta: { en: "See All Services", fa: "مشاهده همه خدمات" } as Localized,
};

export const projectsSection = {
  label: { en: "FEATURED PROJECTS", fa: "پروژه‌های شاخص" } as Localized,
  title: { en: "Selected Projects", fa: "پروژه‌های منتخب" } as Localized,
  intro: {
    en: "A selection of current work in Mashhad, with the discipline ISB Group leads on each.",
    fa: "گزیده‌ای از کارهای جاری در مشهد، همراه با تخصصی که گروه ISB در هر پروژه رهبری می‌کند.",
  } as Localized,
  cta: { en: "View All Projects", fa: "مشاهده همه پروژه‌ها" } as Localized,
};

export const labSection = {
  label: { en: "ISB SUSTAINABILITY LAB", fa: "آزمایشگاه پایداری ISB" } as Localized,
  title: { en: "Design, Test, Improve.", fa: "طراحی، آزمون، بهبود." } as Localized,
  copy: {
    en: "Evaluate daylight, energy use, carbon emissions, and sustainability performance before making design decisions.",
    fa: "نور روز، مصرف انرژی، انتشار کربن و عملکرد پایداری را پیش از تصمیم‌های طراحی ارزیابی کنید.",
  } as Localized,
  cta: { en: "Explore the Lab", fa: "کاوش در آزمایشگاه" } as Localized,
  actionTitle: {
    en: "Run a Sustainability Assessment",
    fa: "اجرای ارزیابی پایداری",
  } as Localized,
  actionNote: {
    en: "Send us a project and our team will scope an assessment.",
    fa: "پروژه خود را برای ما بفرستید تا دامنه ارزیابی را مشخص کنیم.",
  } as Localized,
  actionCta: { en: "Start assessment", fa: "شروع ارزیابی" } as Localized,
  visualAlt: {
    en: "Axonometric visual of a building with rooftop photovoltaics, vegetation and a performance analysis overlay",
    fa: "تصویر آکسونومتریک از ساختمانی با پنل خورشیدی بام، پوشش گیاهی و لایه تحلیل عملکرد",
  } as Localized,
  visualNote: { en: "Illustrative analysis visual", fa: "تصویر نمونه تحلیل" } as Localized,
  metricsTitle: { en: "Indicative dashboard", fa: "داشبورد نمونه" } as Localized,
  metricsNote: {
    en: "Illustrative figures for a demonstration scenario — not project results.",
    fa: "اعداد نمونه برای یک سناریوی نمایشی است، نه نتایج یک پروژه.",
  } as Localized,
  methodology: { en: "View methodology", fa: "مشاهده روش ارزیابی" } as Localized,
};

export interface LabMetric {
  id: string;
  label: Localized;
  value: string;
  unit: Localized;
  percent: number;
  icon: "sun" | "energy" | "carbon" | "score";
}

export const labMetrics: LabMetric[] = [
  {
    id: "sda",
    label: { en: "Daylight Autonomy (sDA)", fa: "استقلال نور روز (sDA)" },
    value: "62",
    unit: { en: "% of occupied hours", fa: "٪ از ساعات بهره‌برداری" },
    percent: 62,
    icon: "sun",
  },
  {
    id: "eui",
    label: { en: "Energy Use Intensity (EUI)", fa: "شدت مصرف انرژی (EUI)" },
    value: "78",
    unit: { en: "kWh/m²·yr", fa: "کیلووات‌ساعت بر مترمربع در سال" },
    percent: 48,
    icon: "energy",
  },
  {
    id: "co2",
    label: { en: "CO₂ Emissions", fa: "انتشار CO₂" },
    value: "24",
    unit: { en: "kgCO₂e/m²·yr", fa: "کیلوگرم معادل CO₂ بر مترمربع در سال" },
    percent: 36,
    icon: "carbon",
  },
  {
    id: "saro",
    label: { en: "Saro Sabz Score", fa: "امتیاز سرو سبز" },
    value: "74",
    unit: { en: "of 100", fa: "از ۱۰۰" },
    percent: 74,
    icon: "score",
  },
];

export const teamSection = {
  label: { en: "OUR TEAM", fa: "تیم ما" } as Localized,
  title: {
    en: "An Interdisciplinary Team for Complex Challenges",
    fa: "تیمی میان‌رشته‌ای برای مسائل پیچیده",
  } as Localized,
  copy: {
    en: "Architects, energy analysts, and structural engineers working in one studio, on one shared model, from concept to site.",
    fa: "معماران، تحلیل‌گران انرژی و مهندسان سازه در یک استودیو و روی یک مدل مشترک کار می‌کنند؛ از طرح مفهومی تا کارگاه.",
  } as Localized,
  cta: { en: "Meet the Team", fa: "آشنایی با تیم" } as Localized,
  imageAlt: {
    en: "Illustrative studio scene of an interdisciplinary team reviewing drawings around a table at dusk",
    fa: "تصویر شبیه‌سازی‌شده از تیمی میان‌رشته‌ای که در غروب گرد میزی نقشه‌ها را بررسی می‌کند",
  } as Localized,
  imageNote: { en: "Illustrative studio scene", fa: "تصویر شبیه‌سازی‌شده از استودیو" } as Localized,
};

export const contactBanner = {
  title: {
    en: "Let's Build Sustainable Places Together.",
    fa: "بیایید فضاهای پایدار را با هم بسازیم.",
  } as Localized,
  copy: {
    en: "Have a project or partnership in mind? Tell us what you're working on.",
    fa: "پروژه یا همکاری در ذهن دارید؟ از آنچه روی آن کار می‌کنید بگویید.",
  } as Localized,
  cta: { en: "Get in Touch", fa: "تماس با ما" } as Localized,
};
