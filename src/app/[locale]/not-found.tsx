import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

export default async function NotFound({
  params,
}: {
  params?: Promise<{ locale: string }>;
}) {
  const raw = params ? (await params).locale : "en";
  const locale: Locale = isLocale(raw) ? raw : "en";
  return (
    <section className="section">
      <div className="container not-found">
        <p className="eyebrow">404</p>
        <h1 className="page-hero__title">
          {locale === "fa" ? "این صفحه پیدا نشد." : "This page could not be found."}
        </h1>
        <p className="page-hero__lead">
          {locale === "fa"
            ? "نشانی ممکن است تغییر کرده باشد یا صفحه هنوز منتشر نشده باشد."
            : "The address may have changed, or the page has not been published."}
        </p>
        <Link href={href(locale)} className="btn btn--primary">
          {locale === "fa" ? "بازگشت به خانه" : "Back to home"}
        </Link>
      </div>
    </section>
  );
}
