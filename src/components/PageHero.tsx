import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import type { Locale } from "@/lib/i18n";

export function PageHero({
  locale,
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        {crumbs && <Breadcrumbs locale={locale} items={crumbs} />}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
