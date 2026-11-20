import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ContactBanner } from "@/components/ContactBanner";
import { ArrowRightIcon } from "@/components/Icons";
import { teamPage } from "@/content/pages";
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
    title: nav.team[locale],
    description: teamPage.lead[locale],
  };
}

export default async function TeamPage({
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
        eyebrow={teamPage.eyebrow[locale]}
        title={teamPage.title[locale]}
        lead={teamPage.lead[locale]}
        crumbs={[{ label: nav.team[locale] }]}
      />

      <section className="section section--tight">
        <div className="container team-page">
          <div className="team-page__media">
            <img
              src="/images/team-studio.svg"
              alt={teamPage.lead[locale]}
              width={1600}
              height={1000}
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="team-page__body">
            <h2 className="block-title">{teamPage.approachTitle[locale]}</h2>
            <ol className="numbered-list">
              {teamPage.approach[locale].map((item, index) => (
                <li key={item.slice(0, 20)}>
                  <span className="numbered-list__index">{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>

            <div className="team-page__profiles">
              <h2 className="block-title">{teamPage.profilesTitle[locale]}</h2>
              <p className="empty-note">{teamPage.profilesEmpty[locale]}</p>
              <Link href={href(locale, "/contact")} className="text-link">
                {nav.contact[locale]}
                <ArrowRightIcon className="flip-rtl" width={15} height={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactBanner locale={locale} />
    </>
  );
}
