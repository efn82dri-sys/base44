import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AssessmentForm } from "@/components/AssessmentForm";
import { metricIcons, CheckIcon } from "@/components/Icons";
import {
  labPage,
  labTopics,
  labMethods,
  labDeliverables,
  methodology,
} from "@/content/lab";
import { nav } from "@/content/site";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: nav.lab[locale],
    description: labPage.lead[locale],
  };
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={labPage.eyebrow[locale]}
        title={labPage.title[locale]}
        lead={labPage.lead[locale]}
        crumbs={[{ label: nav.lab[locale] }]}
      />

      <section className="section section--tight">
        <div className="container">
          <h2 className="block-title">{labPage.topicsTitle[locale]}</h2>
          <ul className="topic-grid">
            {labTopics.map((topic) => {
              const Icon = metricIcons[topic.icon];
              return (
                <li key={topic.title.en} className="topic-card">
                  <span className="topic-card__icon" aria-hidden="true">
                    <Icon width={22} height={22} />
                  </span>
                  <h3>{topic.title[locale]}</h3>
                  <p>{topic.body[locale]}</p>
                </li>
              );
            })}
          </ul>

          <div className="two-col">
            <div>
              <h2 className="block-title">{labPage.methodsTitle[locale]}</h2>
              <ul className="check-list">
                {labMethods[locale].map((item) => (
                  <li key={item}>
                    <CheckIcon width={16} height={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="block-title">{labPage.deliverablesTitle[locale]}</h2>
              <ul className="check-list">
                {labDeliverables[locale].map((item) => (
                  <li key={item}>
                    <CheckIcon width={16} height={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lab-example">
            <div className="lab-example__head">
              <h2 className="block-title">{labPage.exampleTitle[locale]}</h2>
              <span className="badge badge--olive">{labPage.exampleNote[locale]}</span>
            </div>
            <p className="prose">{labPage.exampleBody[locale]}</p>
          </div>

          <div className="methodology" id="methodology">
            <h2 className="block-title">{methodology.title[locale]}</h2>
            <ul className="methodology__list">
              {methodology.items[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="assessment" id="assessment">
            <div className="assessment__intro">
              <p className="eyebrow">{labPage.eyebrow[locale]}</p>
              <h2 className="block-title block-title--lg">{labPage.ctaTitle[locale]}</h2>
              <p className="prose">{labPage.ctaCopy[locale]}</p>
            </div>
            <div className="assessment__form">
              <AssessmentForm locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
