import Link from "next/link";
import { contactBanner } from "@/content/home";
import { ArrowRightIcon } from "./Icons";
import { href, type Locale } from "@/lib/i18n";

export function ContactBanner({ locale }: { locale: Locale }) {
  return (
    <section className="section contact-banner-section" aria-labelledby="contact-banner-title">
      <div className="container">
        <div className="contact-banner">
          <div className="contact-banner__foliage" aria-hidden="true">
            <svg viewBox="0 0 420 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id="leafA" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#2f3b2c" />
                  <stop offset="1" stopColor="#BBC482" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="leafB" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#1f2a22" />
                  <stop offset="1" stopColor="#8fa38e" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path d="M420 260C320 250 250 200 236 120c60 6 120 34 150 84 14 24 24 40 34 56Z" fill="url(#leafA)" />
              <path d="M420 260c-60-6-108-40-128-96 46 14 84 42 104 76 10 12 16 16 24 20Z" fill="url(#leafB)" />
              <path d="M360 232c-40-34-58-72-64-112" stroke="rgba(187,196,130,0.5)" strokeWidth="1.2" fill="none" />
              <path d="M300 210c-16-30-22-54-24-84" stroke="rgba(187,196,130,0.35)" strokeWidth="1" fill="none" />
            </svg>
          </div>
          <div className="contact-banner__content">
            <h2 className="contact-banner__title" id="contact-banner-title">
              {contactBanner.title[locale]}
            </h2>
            <p className="contact-banner__copy">{contactBanner.copy[locale]}</p>
          </div>
          <Link href={href(locale, "/contact")} className="btn btn--primary">
            {contactBanner.cta[locale]}
            <ArrowRightIcon className="flip-rtl" width={16} height={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
