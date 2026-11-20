import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { ArrowUpRightIcon } from "@/components/Icons";
import { contactPage } from "@/content/pages";
import { nav, site } from "@/content/site";
import { ui } from "@/content/dictionary";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: nav.contact[locale],
    description: contactPage.lead[locale],
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={contactPage.eyebrow[locale]}
        title={contactPage.title[locale]}
        lead={contactPage.lead[locale]}
        crumbs={[{ label: nav.contact[locale] }]}
      />

      <section className="section section--tight">
        <div className="container contact-grid">
          <div className="contact-grid__form">
            <h2 className="block-title">{contactPage.formTitle[locale]}</h2>
            <InquiryForm locale={locale} />
          </div>
          <aside className="contact-grid__aside">
            <h2 className="block-title">{contactPage.asideTitle[locale]}</h2>
            <ol className="numbered-list numbered-list--compact">
              {contactPage.aside[locale].map((item, index) => (
                <li key={item.slice(0, 20)}>
                  <span className="numbered-list__index">{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>

            <div className="contact-social">
              <h3>{contactPage.socialTitle[locale]}</h3>
              {site.social.map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
                  {ui.socialInstagram[locale]}
                  <ArrowUpRightIcon width={14} height={14} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
