import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ContactBanner } from "@/components/ContactBanner";
import { ArrowRightIcon } from "@/components/Icons";
import { expertisePage } from "@/content/pages";
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
    title: expertisePage.eyebrow[locale],
    description: expertisePage.lead[locale],
  };
}

export default async function ExpertisePage({
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
        eyebrow={expertisePage.eyebrow[locale]}
        title={expertisePage.title[locale]}
        lead={expertisePage.lead[locale]}
        crumbs={[{ label: nav.expertise[locale] }]}
      />

      <section className="section section--tight">
        <div className="container">
          <ul className="discipline-rows">
            {disciplines.map((discipline) => (
              <li key={discipline.slug} className="discipline-row">
                <Link
                  href={href(locale, `/expertise/${discipline.slug}`)}
                  className="discipline-row__media"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={discipline.cover}
                    alt=""
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
                <div className="discipline-row__body">
                  <p className="discipline-row__index">{discipline.index}</p>
                  <h2 className="discipline-row__title">
                    <Link href={href(locale, `/expertise/${discipline.slug}`)}>
                      {discipline.title[locale]}
                    </Link>
                  </h2>
                  <p className="prose">{discipline.summary[locale]}</p>
                  <ul className="tag-list">
                    {discipline.services[locale].map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                  <Link
                    href={href(locale, `/expertise/${discipline.slug}`)}
                    className="text-link"
                  >
                    {expertisePage.detailCta[locale]}
                    <ArrowRightIcon className="flip-rtl" width={15} height={15} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBanner locale={locale} />
    </>
  );
}
