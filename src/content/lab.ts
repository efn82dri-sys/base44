import type { Localized, LocalizedList } from "@/lib/i18n";

export const labPage = {
  eyebrow: { en: "ISB Sustainability Lab", fa: "آزمایشگاه پایداری ISB" } as Localized,
  title: { en: "Test the building before you build it.", fa: "بنا را پیش از ساخت بیازمایید." } as Localized,
  lead: {
    en: "The lab compares design options on daylight, energy use, carbon emissions and overall sustainability performance, so decisions are made with numbers in hand.",
    fa: "آزمایشگاه گزینه‌های طراحی را از نظر نور روز، مصرف انرژی، انتشار کربن و عملکرد کلی پایداری مقایسه می‌کند تا تصمیم‌ها با تکیه بر داده گرفته شوند.",
  } as Localized,
  topicsTitle: { en: "What we assess", fa: "چه چیزی را ارزیابی می‌کنیم" } as Localized,
  methodsTitle: { en: "How we assess it", fa: "چگونه ارزیابی می‌کنیم" } as Localized,
  deliverablesTitle: { en: "What you receive", fa: "چه چیزی دریافت می‌کنید" } as Localized,
  exampleTitle: { en: "How results inform design", fa: "نتایج چگونه بر طراحی اثر می‌گذارند" } as Localized,
  exampleNote: {
    en: "Illustrative example, not a project result.",
    fa: "نمونه‌ای توضیحی است، نه نتیجه یک پروژه.",
  } as Localized,
  exampleBody: {
    en: "A daylight study shows that a west-facing reading room falls below the target for part of the afternoon. The design team deepens the external shading and reduces the glazing ratio on that facade; the study is re-run before the facade package is issued.",
    fa: "مطالعه نور روز نشان می‌دهد که یک سالن مطالعه رو به غرب در بخشی از بعدازظهر از هدف عقب می‌ماند. تیم طراحی سایه‌انداز بیرونی را عمیق‌تر می‌کند و نسبت شیشه در آن نما را کاهش می‌دهد؛ مطالعه پیش از صدور مدارک نما دوباره اجرا می‌شود.",
  } as Localized,
  ctaTitle: { en: "Request an assessment", fa: "درخواست ارزیابی" } as Localized,
  ctaCopy: {
    en: "Tell us about the project and the decisions you need to make. We will confirm scope, inputs and timing before any work starts.",
    fa: "از پروژه و تصمیم‌هایی که باید گرفته شود بگویید. پیش از آغاز هر کاری، دامنه، ورودی‌ها و زمان‌بندی را تأیید می‌کنیم.",
  } as Localized,
};

export const labTopics: { title: Localized; body: Localized; icon: "sun" | "energy" | "carbon" | "score" }[] = [
  {
    icon: "sun",
    title: { en: "Daylight", fa: "نور روز" },
    body: {
      en: "Daylight autonomy and useful daylight illuminance across occupied spaces, tested against the targets agreed at the start of the project.",
      fa: "استقلال نور روز و روشنایی مفید نور روز در فضاهای بهره‌برداری‌شده، سنجیده‌شده با اهداف توافق‌شده در آغاز پروژه.",
    },
  },
  {
    icon: "energy",
    title: { en: "Energy use", fa: "مصرف انرژی" },
    body: {
      en: "Energy use intensity by end use, comparing envelope, glazing and system options on the same weather and occupancy assumptions.",
      fa: "شدت مصرف انرژی به تفکیک مصرف‌کننده‌ها، با مقایسه گزینه‌های پوسته، شیشه و سیستم‌ها بر پایه یکسان داده‌های اقلیم و بهره‌برداری.",
    },
  },
  {
    icon: "carbon",
    title: { en: "Carbon", fa: "کربن" },
    body: {
      en: "Operational carbon estimates derived from the energy model, with the emission factors stated so results can be reviewed.",
      fa: "برآورد کربن عملیاتی برگرفته از مدل انرژی، همراه با اعلام ضرایب انتشار تا نتایج قابل بازبینی باشد.",
    },
  },
  {
    icon: "score",
    title: { en: "Saro Sabz Score", fa: "امتیاز سرو سبز" },
    body: {
      en: "A composite index that combines the measured indicators into one comparable score, with each contribution shown separately.",
      fa: "شاخصی ترکیبی که سنجه‌های اندازه‌گیری‌شده را در یک امتیاز قابل مقایسه جمع می‌کند و سهم هر بخش را جداگانه نشان می‌دهد.",
    },
  },
];

export const labMethods: LocalizedList = {
  en: [
    "Whole-building energy simulation on a documented set of assumptions",
    "Climate-based daylight simulation for representative rooms and floors",
    "Option comparison at concept, schematic and design-development stages",
    "Peer review of the model and inputs before results are issued",
  ],
  fa: [
    "شبیه‌سازی انرژی کل ساختمان بر پایه مجموعه‌ای مستند از فرضیات",
    "شبیه‌سازی نور روز اقلیم‌محور برای فضاها و طبقات نماینده",
    "مقایسه گزینه‌ها در مراحل طراحی مفهومی، مقدماتی و توسعه طراحی",
    "بازبینی همتا بر مدل و ورودی‌ها پیش از صدور نتایج",
  ],
};

export const labDeliverables: LocalizedList = {
  en: [
    "A short report with method, inputs and stated limitations",
    "Indicator results per option, with units and comparison basis",
    "A prioritised list of design changes and their modelled effect",
    "The model files, so the study can be repeated later",
  ],
  fa: [
    "گزارش کوتاه شامل روش، ورودی‌ها و محدودیت‌های اعلام‌شده",
    "نتایج هر شاخص برای هر گزینه، همراه با واحد و مبنای مقایسه",
    "فهرست اولویت‌دار تغییرات طراحی و اثر مدل‌شده هر یک",
    "فایل‌های مدل، تا مطالعه در آینده قابل تکرار باشد",
  ],
};

export const methodology = {
  title: { en: "Methodology notes", fa: "یادداشت روش ارزیابی" } as Localized,
  items: {
    en: [
      "sDA: percentage of occupied hours that meet the daylight illuminance target, without blinds closed.",
      "EUI: annual site energy divided by conditioned floor area, in kWh/m²·yr, over the stated end uses.",
      "CO₂: operational emissions from the energy model, using the emission factor stated in the report.",
      "Saro Sabz Score: a weighted index of the indicators above; weights are agreed per project and published with the result.",
    ],
    fa: [
      "sDA: درصد ساعات بهره‌برداری که هدف روشنایی نور روز را بدون بسته بودن پرده برآورده می‌کند.",
      "EUI: انرژی سالانه ساختمان تقسیم بر سطح زیربنای کنترل‌شده، بر حسب کیلووات‌ساعت بر مترمربع در سال، برای مصرف‌کننده‌های اعلام‌شده.",
      "CO₂: انتشار عملیاتی برگرفته از مدل انرژی، با ضریب انتشار اعلام‌شده در گزارش.",
      "امتیاز سرو سبز: شاخصی وزن‌دار از سنجه‌های بالا؛ وزن‌ها برای هر پروژه توافق و همراه نتیجه منتشر می‌شود.",
    ],
  } as LocalizedList,
};
