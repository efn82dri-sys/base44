import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ContactBanner } from "@/components/ContactBanner";
import { disciplineIcons, ArrowRightIcon } from "@/components/Icons";
import { aboutPage } from "@/content/pages";
import { disciplines } from "@/content/disciplines";
import { nav } from "@/content/site";
import { href, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: aboutPage.eyebrow[locale],
    description: aboutPage.lead[locale],
  };
}

export default async function AboutPage({
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
        eyebrow={aboutPage.eyebrow[locale]}
        title={aboutPage.title[locale]}
        lead={aboutPage.lead[locale]}
        crumbs={[{ label: nav.about[locale] }]}
      />

      <section className="section section--tight">
        <div className="container about-grid">
          <div className="about-grid__main">
            <h2 className="block-title">{aboutPage.overviewTitle[locale]}</h2>
            {aboutPage.overview[locale].map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="prose">
                {paragraph}
              </p>
            ))}

            <h2 className="block-title">{aboutPage.approachTitle[locale]}</h2>
            <ol className="numbered-list">
              {aboutPage.approach[locale].map((item, index) => (
                <li key={item.slice(0, 20)}>
                  <span className="numbered-list__index">{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="about-grid__aside">
            <h2 className="block-title">{aboutPage.collaborationTitle[locale]}</h2>
            <ul className="collab-list">
              {disciplines.map((discipline, index) => {
                const Icon = disciplineIcons[discipline.icon];
                return (
                  <li key={discipline.slug} className="collab-card">
                    <span className="collab-card__icon" aria-hidden="true">
                      <Icon width={20} height={20} />
                    </span>
                    <div>
                      <h3 className="collab-card__title">{discipline.title[locale]}</h3>
                      <p>{aboutPage.collaboration[locale][index]}</p>
                      <Link href={href(locale, `/expertise/${discipline.slug}`)} className="text-link text-link--sm">
                        {discipline.shortTitle[locale]}
                        <ArrowRightIcon className="flip-rtl" width={13} height={13} />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>

      <ContactBanner locale={locale} />
    </>
  );
}
