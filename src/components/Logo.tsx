import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="8.5" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="7" y="17" width="4" height="8" rx="1.2" fill="#BBC482" />
      <rect x="14" y="11" width="4" height="14" rx="1.2" fill="#F5F3EE" />
      <rect x="21" y="7" width="4" height="18" rx="1.2" fill="#E9CBA4" />
    </svg>
  );
}

export function Logo({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <Link href={href(locale)} className={`brand ${className}`} aria-label="ISB Group">
      <LogoMark className="brand__mark" />
      <span className="brand__word">
        <span className="brand__word-strong">ISB</span>
        <span className="brand__word-light">Group</span>
      </span>
    </Link>
  );
}
