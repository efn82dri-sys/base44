import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ArrowRightIcon } from "@/components/Icons";
import { insights } from "@/content/insights";
import { nav } from "@/content/site";
import { href, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const insight = insights.find((item) => item.slug === slug && item.published);
  if (!insight) return { title: nav.insights[locale] };
  return { title: insight.title[locale], description: insight.excerpt[locale] };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const insight = insights.find((item) => item.slug === slug && item.published);
  if (!insight) notFound();

  const paragraphs = insight.body[locale].split("\n\n").filter(Boolean);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={`${insight.topic[locale]} · ${insight.date}`}
        title={insight.title[locale]}
        lead={insight.excerpt[locale]}
        crumbs={[
          { label: nav.insights[locale], path: "/insights" },
          { label: insight.title[locale] },
        ]}
      />
      <section className="section section--tight">
        <div className="container article">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="prose">
              {paragraph}
            </p>
          ))}
          <Link href={href(locale, "/insights")} className="text-link">
            {nav.insights[locale]}
            <ArrowRightIcon className="flip-rtl" width={15} height={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
