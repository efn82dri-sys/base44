import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InsightsList } from "@/components/InsightsList";
import { ContactBanner } from "@/components/ContactBanner";
import { insightsPage } from "@/content/pages";
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
    title: nav.insights[locale],
    description: insightsPage.lead[locale],
  };
}

export default async function InsightsPage({
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
        eyebrow={insightsPage.eyebrow[locale]}
        title={insightsPage.title[locale]}
        lead={insightsPage.lead[locale]}
        crumbs={[{ label: nav.insights[locale] }]}
      />
      <section className="section section--tight">
        <div className="container">
          <InsightsList locale={locale} />
        </div>
      </section>
      <ContactBanner locale={locale} />
    </>
  );
}
