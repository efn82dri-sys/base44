"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ui } from "@/content/dictionary";
import { buildSearchIndex, searchSite, resultTypeLabel } from "@/lib/search";
import type { Locale } from "@/lib/i18n";

export function SearchOverlay({
  locale,
  open,
  onClose,
}: {
  locale: Locale;
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = buildSearchIndex(locale);
  const results = searchSite(index, query);
  const trimmed = query.trim();
  const hasQuery = trimmed.length >= 2;

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("is-locked");
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label={ui.searchTitle[locale]}>
      <button className="search-overlay__backdrop" onClick={onClose} tabIndex={-1} aria-hidden="true" />
      <div className="search-panel">
        <div className="search-panel__head">
          <div className="search-panel__field">
            <span className="search-panel__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <circle cx="11" cy="11" r="6.4" />
                <path d="m15.8 15.8 4 4" />
              </svg>
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={ui.searchPlaceholder[locale]}
              aria-label={ui.searchPlaceholder[locale]}
              autoComplete="off"
            />
            <button className="search-panel__close" onClick={onClose} aria-label={ui.close[locale]}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="search-panel__body">
          {!hasQuery && <p className="search-panel__hint">{ui.searchHint[locale]}</p>}

          {hasQuery && results.length === 0 && (
            <div className="search-empty">
              <p className="search-empty__title">{ui.searchEmptyTitle[locale]}</p>
              <p className="search-empty__body">{ui.searchEmptyBody[locale]}</p>
            </div>
          )}

          {hasQuery && results.length > 0 && (
            <>
              <p className="search-panel__count" aria-live="polite">
                {results.length} {ui.searchResultCount[locale]}
              </p>
              <ul className="search-results">
                {results.map((result) => (
                  <li key={result.id}>
                    <Link href={result.url} className="search-result" onClick={onClose}>
                      <span className="search-result__type">{resultTypeLabel(result.type, locale)}</span>
                      <span className="search-result__title">{result.title}</span>
                      <span className="search-result__desc">{result.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
