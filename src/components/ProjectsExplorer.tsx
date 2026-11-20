"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectType } from "@/content/projects";
import { projectTypes } from "@/content/projects";
import { disciplines } from "@/content/disciplines";
import { ui } from "@/content/dictionary";
import { formatNumber, type Locale } from "@/lib/i18n";
import { ProjectCard } from "./ProjectCard";

type TypeFilter = ProjectType | "all";

export function ProjectsExplorer({
  locale,
  projects,
}: {
  locale: Locale;
  projects: Project[];
}) {
  const [type, setType] = useState<TypeFilter>("all");
  const [discipline, setDiscipline] = useState<string>("all");

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const typeMatch = type === "all" || project.type === type;
        const disciplineMatch =
          discipline === "all" || project.disciplines.includes(discipline);
        return typeMatch && disciplineMatch;
      }),
    [projects, type, discipline],
  );

  const isFiltered = type !== "all" || discipline !== "all";
  const reset = () => {
    setType("all");
    setDiscipline("all");
  };

  return (
    <div className="explorer">
      <div className="explorer__bar">
        <div className="explorer__group">
          <span className="explorer__label" id="filter-type-label">
            {ui.filterType[locale]}
          </span>
          <div className="chips" role="group" aria-labelledby="filter-type-label">
            {projectTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`chip ${type === item.id ? "is-active" : ""}`}
                aria-pressed={type === item.id}
                onClick={() => setType(item.id as TypeFilter)}
              >
                {item.label[locale]}
              </button>
            ))}
          </div>
        </div>

        <div className="explorer__group">
          <span className="explorer__label" id="filter-discipline-label">
            {ui.filterDiscipline[locale]}
          </span>
          <div className="chips" role="group" aria-labelledby="filter-discipline-label">
            <button
              type="button"
              className={`chip ${discipline === "all" ? "is-active" : ""}`}
              aria-pressed={discipline === "all"}
              onClick={() => setDiscipline("all")}
            >
              {ui.filterAll[locale]}
            </button>
            {disciplines.map((item) => (
              <button
                key={item.slug}
                type="button"
                className={`chip ${discipline === item.slug ? "is-active" : ""}`}
                aria-pressed={discipline === item.slug}
                onClick={() => setDiscipline(item.slug)}
              >
                {item.shortTitle[locale]}
              </button>
            ))}
          </div>
        </div>

        <div className="explorer__status" aria-live="polite">
          <span>
            {formatNumber(filtered.length, locale)} {ui.filterResults[locale]}
          </span>
          {isFiltered && (
            <button type="button" className="text-link text-link--button" onClick={reset}>
              {ui.filterReset[locale]}
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="explorer__empty">{ui.filterEmpty[locale]}</p>
      ) : (
        <ul className="explorer__grid">
          {filtered.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} locale={locale} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
