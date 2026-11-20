import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { ui } from "@/content/dictionary";

export interface Crumb {
  label: string;
  path?: string;
}

export function Breadcrumbs({ locale, items }: { locale: Locale; items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label={locale === "fa" ? "مسیر صفحه" : "Breadcrumb"}>
      <ol>
        <li>
          <Link href={href(locale)}>{ui.home[locale]}</Link>
        </li>
        {items.map((item) => (
          <li key={item.label} aria-current={item.path ? undefined : "page"}>
            {item.path ? <Link href={href(locale, item.path)}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}
