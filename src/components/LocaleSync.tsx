"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * Remembers the visitor's language so a later visit to "/" lands on it again.
 */
export function LocaleSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.cookie = `isb_locale=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);
  return null;
}
