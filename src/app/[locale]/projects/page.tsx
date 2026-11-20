import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { ContactBanner } from "@/components/ContactBanner";
import { publishedProjects } from "@/content/projects";
import { projectsSection } from "@/content/home";
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
    title: nav.projects[locale],
    description: projectsSection.intro[locale],
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const projects = publishedProjects();

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={projectsSection.label[locale]}
        title={projectsSection.title[locale]}
        lead={projectsSection.intro[locale]}
        crumbs={[{ label: nav.projects[locale] }]}
      />
      <section className="section section--tight">
        <div className="container">
          <ProjectsExplorer locale={locale} projects={projects} />
        </div>
      </section>
      <ContactBanner locale={locale} />
    </>
  );
}
