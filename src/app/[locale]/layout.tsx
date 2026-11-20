import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocaleSync } from "@/components/LocaleSync";
import { site } from "@/content/site";
import { ui } from "@/content/dictionary";
import { dirOf, htmlLang, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: {
      default: site.defaultTitle[locale],
      template: `%s — ${site.name[locale]}`,
    },
    description: site.defaultDescription[locale],
    applicationName: site.name[locale],
    openGraph: {
      type: "website",
      siteName: site.name[locale],
      locale: locale === "fa" ? "fa_IR" : "en_US",
      title: site.defaultTitle[locale],
      description: site.defaultDescription[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: site.defaultTitle[locale],
      description: site.defaultDescription[locale],
    },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return null;
  }
  const locale = raw;

  return (
    <html lang={htmlLang(locale)} dir={dirOf(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Vazirmatn:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#181B1C" />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {ui.skipToContent[locale]}
        </a>
        <LocaleSync locale={locale} />
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
