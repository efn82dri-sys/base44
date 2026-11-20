import Link from "next/link";
import { expertiseSection } from "@/content/home";
import { disciplines } from "@/content/disciplines";
import { disciplineIcons, ArrowUpRightIcon, ArrowRightIcon } from "./Icons";
import { href, type Locale } from "@/lib/i18n";

export function ExpertiseSection({ locale }: { locale: Locale }) {
  return (
    <section className="section expertise" aria-labelledby="expertise-title">
      <div className="container">
        <div className="expertise__grid">
          <div className="expertise__intro">
            <p className="eyebrow">{expertiseSection.label[locale]}</p>
            <h2 className="section-title" id="expertise-title">
              {expertiseSection.title[locale]}
            </h2>
            <p className="section-copy">{expertiseSection.intro[locale]}</p>
            <Link href={href(locale, "/expertise")} className="text-link">
              {expertiseSection.cta[locale]}
              <ArrowRightIcon className="flip-rtl" width={15} height={15} />
            </Link>
          </div>

          {disciplines.map((discipline) => {
            const Icon = disciplineIcons[discipline.icon];
            return (
              <Link
                key={discipline.slug}
                href={href(locale, `/expertise/${discipline.slug}`)}
                className="expertise-card"
                aria-label={`${discipline.title[locale]} — ${discipline.summary[locale]}`}
              >
                <div className="expertise-card__media">
                  <img
                    src={discipline.cover}
                    alt={discipline.coverAlt[locale]}
                    width={1200}
                    height={1600}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="expertise-card__index">{discipline.index}</span>
                </div>
                <div className="expertise-card__body">
                  <span className="expertise-card__icon" aria-hidden="true">
                    <Icon width={22} height={22} />
                  </span>
                  <h3 className="expertise-card__title">{discipline.title[locale]}</h3>
                  <p className="expertise-card__copy">{discipline.summary[locale]}</p>
                  <span className="expertise-card__arrow" aria-hidden="true">
                    <ArrowUpRightIcon className="flip-rtl" width={16} height={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
