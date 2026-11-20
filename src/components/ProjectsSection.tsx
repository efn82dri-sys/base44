import Link from "next/link";
import { projectsSection } from "@/content/home";
import { publishedProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { ArrowRightIcon } from "./Icons";
import { href, type Locale } from "@/lib/i18n";

export function ProjectsSection({ locale }: { locale: Locale }) {
  const items = publishedProjects().slice(0, 3);

  return (
    <section className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="projects__head">
          <div className="projects__intro">
            <p className="eyebrow">{projectsSection.label[locale]}</p>
            <h2 className="section-title" id="projects-title">
              {projectsSection.title[locale]}
            </h2>
          </div>
          <div className="projects__aside">
            <p className="section-copy">{projectsSection.intro[locale]}</p>
            <Link href={href(locale, "/projects")} className="text-link">
              {projectsSection.cta[locale]}
              <ArrowRightIcon className="flip-rtl" width={15} height={15} />
            </Link>
          </div>
        </div>

        <ul className="projects__grid">
          {items.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} locale={locale} priority={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
