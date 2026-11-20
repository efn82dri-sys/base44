import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRightIcon } from "@/components/Icons";
import { getProject, publishedProjects } from "@/content/projects";
import { disciplines } from "@/content/disciplines";
import { nav } from "@/content/site";
import { ui } from "@/content/dictionary";
import { href, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const project = getProject(slug);
  if (!project) return { title: nav.projects[locale] };
  return {
    title: project.title[locale],
    description: project.overview[locale],
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const project = getProject(slug);
  if (!project) notFound();

  const related = publishedProjects()
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);
  const projectDisciplines = disciplines.filter((discipline) =>
    project.disciplines.includes(discipline.slug),
  );

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={`${project.typeLabel[locale]} · ${project.location[locale]}`}
        title={project.title[locale]}
        lead={project.overview[locale]}
        crumbs={[
          { label: nav.projects[locale], path: "/projects" },
          { label: project.title[locale] },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <figure className="project-cover">
            <img
              src={project.cover}
              alt={project.coverAlt[locale]}
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
            {project.conceptImage && (
              <figcaption className="badge badge--image">{ui.conceptImage[locale]}</figcaption>
            )}
          </figure>

          <div className="project-detail">
            <dl className="meta-list">
              <div>
                <dt>{ui.location[locale]}</dt>
                <dd>{project.location[locale]}</dd>
              </div>
              <div>
                <dt>{ui.projectType[locale]}</dt>
                <dd>{project.typeLabel[locale]}</dd>
              </div>
              <div>
                <dt>{ui.service[locale]}</dt>
                <dd>{project.service[locale]}</dd>
              </div>
              <div>
                <dt>{ui.isbRole[locale]}</dt>
                <dd>{project.role[locale]}</dd>
              </div>
            </dl>

            <div className="project-detail__body">
              <h2 className="block-title">{ui.overview[locale]}</h2>
              <p className="prose">{project.overview[locale]}</p>

              {project.metrics.length > 0 && (
                <>
                  <h2 className="block-title">{ui.verifiedResults[locale]}</h2>
                  <ul className="metric-table">
                    {project.metrics.map((metric) => (
                      <li key={metric.label.en}>
                        <span>{metric.label[locale]}</span>
                        <strong>{metric.value}</strong>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {projectDisciplines.length > 0 && (
                <div className="project-detail__disciplines">
                  <h2 className="block-title">{nav.expertise[locale]}</h2>
                  <ul className="tag-list">
                    {projectDisciplines.map((discipline) => (
                      <li key={discipline.slug}>
                        <Link href={href(locale, `/expertise/${discipline.slug}`)}>
                          {discipline.title[locale]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link href={href(locale, "/contact")} className="btn btn--primary">
                {nav.contact[locale]}
                <ArrowRightIcon className="flip-rtl" width={16} height={16} />
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <div className="related">
              <h2 className="block-title">{ui.relatedProjects[locale]}</h2>
              <ul className="related__grid">
                {related.map((item) => (
                  <li key={item.slug}>
                    <ProjectCard project={item} locale={locale} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
