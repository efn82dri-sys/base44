import Link from "next/link";
import { Logo, LogoMark } from "./Logo";
import { InstagramIcon, ArrowUpRightIcon } from "./Icons";
import { disciplines } from "@/content/disciplines";
import { nav, navItems, site, footerNote } from "@/content/site";
import { ui } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__contours" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <g fill="none" stroke="rgba(245,243,238,0.09)" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, index) => (
              <path
                key={index}
                d={`M-40 ${250 - index * 18} C 240 ${190 - index * 16}, 420 ${300 - index * 12}, 700 ${
                  235 - index * 14
                } S 1180 ${150 - index * 8}, 1480 ${210 - index * 16}`}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Logo locale={locale} />
          <p className="site-footer__note">{footerNote[locale]}</p>
          <p className="site-footer__tagline">{site.tagline[locale]}</p>
        </div>

        <nav className="site-footer__col" aria-label={ui.footerNav[locale]}>
          <h2 className="site-footer__heading">{ui.footerNav[locale]}</h2>
          <ul>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={href(locale, item.href)}>{item.label[locale]}</Link>
              </li>
            ))}
            <li>
              <Link href={href(locale, "/contact")}>{nav.contact[locale]}</Link>
            </li>
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">{locale === "fa" ? "تخصص‌ها" : "Disciplines"}</h2>
          <ul>
            {disciplines.map((discipline) => (
              <li key={discipline.slug}>
                <Link href={href(locale, `/expertise/${discipline.slug}`)}>
                  {discipline.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col site-footer__col--social">
          <h2 className="site-footer__heading">{ui.footerContact[locale]}</h2>
          <ul className="site-footer__social">
            {site.social.map((item) => (
              <li key={item.id}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon width={18} height={18} />
                  <span>{ui.socialInstagram[locale]}</span>
                  <ArrowUpRightIcon width={14} height={14} />
                </a>
              </li>
            ))}
            <li>
              <Link href={href(locale, "/contact")} className="site-footer__contact-link">
                {nav.contact[locale]}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span className="site-footer__mark" aria-hidden="true">
          <LogoMark className="site-footer__mark-svg" />
        </span>
        <p>
          © {year} {site.name[locale]}. {ui.footerRights[locale]}
        </p>
        <p className="site-footer__built">{site.tagline[locale]}</p>
      </div>
    </footer>
  );
}
