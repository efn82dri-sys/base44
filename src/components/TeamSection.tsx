import Link from "next/link";
import { teamSection } from "@/content/home";
import { ArrowRightIcon } from "./Icons";
import { href, type Locale } from "@/lib/i18n";

export function TeamSection({ locale }: { locale: Locale }) {
  return (
    <section className="section team" aria-labelledby="team-title">
      <div className="container">
        <div className="team-panel">
          <img
            className="team-panel__image"
            src="/images/team-studio.svg"
            alt={teamSection.imageAlt[locale]}
            width={2000}
            height={1000}
            loading="lazy"
            decoding="async"
          />
          <div className="team-panel__scrim" aria-hidden="true" />
          <div className="team-panel__content">
            <p className="eyebrow">{teamSection.label[locale]}</p>
            <h2 className="section-title" id="team-title">
              {teamSection.title[locale]}
            </h2>
            <p className="section-copy">{teamSection.copy[locale]}</p>
            <Link href={href(locale, "/team")} className="btn btn--ghost btn--sm">
              {teamSection.cta[locale]}
              <ArrowRightIcon className="flip-rtl" width={15} height={15} />
            </Link>
          </div>
          <span className="badge badge--image team-panel__badge">{teamSection.imageNote[locale]}</span>
        </div>
      </div>
    </section>
  );
}
