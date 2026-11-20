import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";
import { disciplines, getDiscipline } from "@/content/disciplines";
import { relatedProjects } from "@/content/projects";
import { expertisePage } from "@/content/pages";
import { nav } from "@/content/site";
import { href, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const discipline = getDiscipline(slug);
  if (!discipline) return { title: nav.expertise[locale] };
  return {
    title: discipline.title[locale],
    description: discipline.summary[locale],
  };
}

export default async function DisciplinePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const discipline = getDiscipline(slug);
  if (!discipline) notFound();

  const projects = relatedProjects(discipline.slug);
  const others = disciplines.filter((item) => item.slug !== discipline.slug);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={`${nav.expertise[locale]} · ${discipline.index}`}
        title={discipline.title[locale]}
        lead={discipline.description[locale]}
        crumbs={[
          { label: nav.expertise[locale], path: "/expertise" },
          { label: discipline.title[locale] },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <figure className="discipline-cover">
            <img
              src={discipline.cover}
              alt={discipline.coverAlt[locale]}
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
          </figure>

          <div className="discipline-detail">
            <div className="discipline-detail__col">
              <h2 className="block-title">{expertisePage.servicesLabel[locale]}</h2>
              <ul className="check-list">
                {discipline.services[locale].map((service) => (
                  <li key={service}>
                    <CheckIcon width={16} height={16} />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div className="discipline-detail__col">
              <h2 className="block-title">{expertisePage.deliverablesLabel[locale]}</h2>
              <ul className="check-list">
                {discipline.deliverables[locale].map((item) => (
                  <li key={item}>
                    <CheckIcon width={16} height={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="discipline-detail__cta">
              <p className="discipline-detail__cta-title">{nav.contact[locale]}</p>
              <Link href={href(locale, "/contact")} className="btn btn--primary">
                {expertisePage.inquiryCta[locale]}
                <ArrowRightIcon className="flip-rtl" width={16} height={16} />
              </Link>
            </div>
          </div>

          {projects.length > 0 && (
            <div className="related">
              <h2 className="block-title">{expertisePage.relatedLabel[locale]}</h2>
              <ul className="related__grid">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} locale={locale} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="other-disciplines">
            <h2 className="block-title">{expertisePage.otherDisciplines[locale]}</h2>
            <ul className="other-disciplines__list">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={href(locale, `/expertise/${item.slug}`)} className="other-discipline">
                    <span className="other-discipline__index">{item.index}</span>
                    <span className="other-discipline__title">{item.title[locale]}</span>
                    <ArrowRightIcon className="flip-rtl" width={16} height={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
