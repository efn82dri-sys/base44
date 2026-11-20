import Link from "next/link";
import type { Project } from "@/content/projects";
import { ui } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { ArrowUpRightIcon } from "./Icons";

export function ProjectCard({
  project,
  locale,
  priority = false,
}: {
  project: Project;
  locale: Locale;
  priority?: boolean;
}) {
  return (
    <Link
      href={href(locale, `/projects/${project.slug}`)}
      className="project-card"
      aria-label={`${project.title[locale]} — ${project.location[locale]}, ${project.typeLabel[locale]}`}
    >
      <div className="project-card__media">
        <img
          src={project.cover}
          alt={project.coverAlt[locale]}
          width={1400}
          height={900}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="project-card__scrim" aria-hidden="true" />
        {project.conceptImage && (
          <span className="badge badge--image">{ui.conceptImage[locale]}</span>
        )}
        <div className="project-card__body">
          <p className="project-card__location">{project.location[locale]}</p>
          <h3 className="project-card__title">{project.title[locale]}</h3>
          <ul className="project-card__tags">
            <li>{project.typeLabel[locale]}</li>
            <li>{project.service[locale]}</li>
          </ul>
        </div>
        <span className="project-card__arrow" aria-hidden="true">
          <ArrowUpRightIcon className="flip-rtl" width={16} height={16} />
        </span>
      </div>
    </Link>
  );
}
