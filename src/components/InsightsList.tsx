"use client";

import Link from "next/link";
import { useState } from "react";
import { insights, insightTopics, type Insight } from "@/content/insights";
import { insightsPage } from "@/content/pages";
import { ui } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { ArrowRightIcon } from "./Icons";

export function InsightsList({ locale }: { locale: Locale }) {
  const [topic, setTopic] = useState("all");
  const published = insights.filter((insight) => insight.published);
  const filtered = published.filter(
    (insight) => topic === "all" || insight.topic.en.toLowerCase() === topic,
  );

  if (published.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">{insightsPage.emptyTitle[locale]}</p>
        <p className="empty-state__body">{insightsPage.emptyBody[locale]}</p>
        <Link href={href(locale, "/sustainability-lab")} className="btn btn--ghost btn--sm">
          {insightsPage.emptyCta[locale]}
          <ArrowRightIcon className="flip-rtl" width={15} height={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="insights">
      <div className="chips" role="group" aria-label={ui.filtersTitle[locale]}>
        {insightTopics.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`chip ${topic === item.id ? "is-active" : ""}`}
            aria-pressed={topic === item.id}
            onClick={() => setTopic(item.id)}
          >
            {item.label[locale]}
          </button>
        ))}
      </div>
      <ul className="insight-list">
        {filtered.map((insight: Insight) => (
          <li key={insight.slug} className="insight-row">
            <p className="insight-row__meta">
              {insight.topic[locale]} · {insight.date}
            </p>
            <h2 className="insight-row__title">
              <Link href={href(locale, `/insights/${insight.slug}`)}>{insight.title[locale]}</Link>
            </h2>
            <p className="prose">{insight.excerpt[locale]}</p>
            <Link href={href(locale, `/insights/${insight.slug}`)} className="text-link">
              {ui.readMore[locale]}
              <ArrowRightIcon className="flip-rtl" width={15} height={15} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
