import { ui } from "@/content/dictionary";
import type { Locale } from "./i18n";

export function errorText(code: string | undefined, locale: Locale): string {
  switch (code) {
    case "required":
      return ui.errRequired[locale];
    case "email":
      return ui.errEmail[locale];
    case "number":
      return ui.errNumber[locale];
    case "long":
      return ui.errLong[locale];
    default:
      return ui.errServer[locale];
  }
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
