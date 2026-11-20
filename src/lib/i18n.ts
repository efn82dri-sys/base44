export const locales = ["en", "fa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** A string that exists in both site languages. */
export type Localized = Record<Locale, string>;

/** A list of strings that exists in both site languages. */
export type LocalizedList = Record<Locale, string[]>;

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fa";
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fa" : "en";
}

/** Build a locale-prefixed href, e.g. href("fa", "/projects") => "/fa/projects". */
export function href(locale: Locale, path = ""): string {
  if (!path || path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localeLabel(locale: Locale): string {
  return locale === "en" ? "EN" : "FA";
}

export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "fa-IR";
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);
}

/** Replace the locale segment of a pathname, keeping the rest of the route. */
export function swapLocaleInPath(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${next}`;
  if (isLocale(parts[0])) {
    parts[0] = next;
    return `/${parts.join("/")}`;
  }
  return `/${next}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
