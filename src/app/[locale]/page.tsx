import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { LabPanel } from "@/components/LabPanel";
import { TeamSection } from "@/components/TeamSection";
import { ContactBanner } from "@/components/ContactBanner";
import { site } from "@/content/site";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: site.defaultTitle[locale],
    description: site.defaultDescription[locale],
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <>
      <Hero locale={locale} />
      <ExpertiseSection locale={locale} />
      <ProjectsSection locale={locale} />
      <LabPanel locale={locale} />
      <TeamSection locale={locale} />
      <ContactBanner locale={locale} />
    </>
  );
}
