import Link from "next/link";
import { labSection, labMetrics } from "@/content/home";
import { metricIcons, ArrowRightIcon, ArrowUpRightIcon } from "./Icons";
import { href, type Locale } from "@/lib/i18n";

export function LabPanel({ locale }: { locale: Locale }) {
  return (
    <section className="section lab" aria-labelledby="lab-title">
      <div className="container">
        <div className="lab-panel">
          <div className="lab-panel__intro">
            <p className="eyebrow">{labSection.label[locale]}</p>
            <h2 className="section-title" id="lab-title">
              {labSection.title[locale]}
            </h2>
            <p className="section-copy">{labSection.copy[locale]}</p>
            <Link href={href(locale, "/sustainability-lab")} className="text-link">
              {labSection.cta[locale]}
              <ArrowRightIcon className="flip-rtl" width={15} height={15} />
            </Link>
          </div>

          <figure className="lab-panel__visual">
            <img
              src="/images/lab-axonometric.svg"
              alt={labSection.visualAlt[locale]}
              width={900}
              height={760}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="badge badge--image">{labSection.visualNote[locale]}</figcaption>
          </figure>

          <div className="lab-panel__metrics">
            <div className="lab-panel__metrics-head">
              <h3>{labSection.metricsTitle[locale]}</h3>
              <span className="badge badge--olive">{labSection.metricsNote[locale]}</span>
            </div>
            <ul className="metric-list">
              {labMetrics.map((metric) => {
                const Icon = metricIcons[metric.icon];
                return (
                  <li key={metric.id} className="metric">
                    <span className="metric__icon" aria-hidden="true">
                      <Icon width={18} height={18} />
                    </span>
                    <div className="metric__body">
                      <div className="metric__top">
                        <span className="metric__label">{metric.label[locale]}</span>
                        <span className="metric__value">
                          {metric.value}
                          <span className="metric__unit">{metric.unit[locale]}</span>
                        </span>
                      </div>
                      <div
                        className="metric__bar"
                        role="img"
                        aria-label={`${metric.label[locale]}: ${metric.value} ${metric.unit[locale]}`}
                      >
                        <span style={{ width: `${metric.percent}%` }} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link href={href(locale, "/sustainability-lab#methodology")} className="lab-panel__method">
              {labSection.methodology[locale]}
              <ArrowRightIcon className="flip-rtl" width={14} height={14} />
            </Link>
          </div>

          <Link href={href(locale, "/sustainability-lab#assessment")} className="lab-action">
            <span className="lab-action__arrow" aria-hidden="true">
              <ArrowUpRightIcon className="flip-rtl" width={22} height={22} />
            </span>
            <span className="lab-action__title">{labSection.actionTitle[locale]}</span>
            <span className="lab-action__note">{labSection.actionNote[locale]}</span>
            <span className="lab-action__cta">
              {labSection.actionCta[locale]}
              <ArrowRightIcon className="flip-rtl" width={15} height={15} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
