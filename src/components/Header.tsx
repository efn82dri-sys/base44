"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { SearchOverlay } from "./SearchOverlay";
import { ChevronDownIcon, CloseIcon, MenuIcon, SearchIcon, ArrowRightIcon } from "./Icons";
import { disciplines } from "@/content/disciplines";
import { navItems, nav } from "@/content/site";
import { ui } from "@/content/dictionary";
import {
  href,
  localeLabel,
  otherLocale,
  swapLocaleInPath,
  type Locale,
} from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const [solid, setSolid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const expertiseRef = useRef<HTMLLIElement>(null);
  const expertiseButtonRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === href(locale);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setExpertiseOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("is-locked");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!expertiseOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!expertiseRef.current?.contains(event.target as Node)) setExpertiseOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpertiseOpen(false);
        expertiseButtonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [expertiseOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    window.setTimeout(() => searchTriggerRef.current?.focus(), 0);
  };

  const nextLocale = otherLocale(locale);
  const localeTarget = swapLocaleInPath(pathname, nextLocale);
  const headerClass = [
    "site-header",
    solid || drawerOpen || !isHome ? "site-header--solid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClass}>
        <div className="site-header__inner">
          <Logo locale={locale} />

          <nav className="nav-capsule" aria-label={locale === "fa" ? "ناوبری اصلی" : "Main navigation"}>
            <ul className="nav-capsule__list">
              <li>
                <Link href={href(locale, "/about")} className="nav-capsule__link">
                  {nav.about[locale]}
                </Link>
              </li>
              <li className="nav-dropdown" ref={expertiseRef}>
                <button
                  ref={expertiseButtonRef}
                  type="button"
                  className="nav-capsule__link nav-capsule__button"
                  aria-expanded={expertiseOpen}
                  aria-controls="expertise-menu"
                  onClick={() => setExpertiseOpen((value) => !value)}
                >
                  {nav.expertise[locale]}
                  <ChevronDownIcon className="nav-capsule__chevron" width={14} height={14} />
                </button>
                <div
                  id="expertise-menu"
                  className={`nav-dropdown__panel ${expertiseOpen ? "is-open" : ""}`}
                  hidden={!expertiseOpen}
                >
                  <Link href={href(locale, "/expertise")} className="nav-dropdown__all">
                    {nav.expertise[locale]}
                    <ArrowRightIcon className="flip-rtl" width={15} height={15} />
                  </Link>
                  <ul>
                    {disciplines.map((discipline) => (
                      <li key={discipline.slug}>
                        <Link
                          href={href(locale, `/expertise/${discipline.slug}`)}
                          className="nav-dropdown__item"
                        >
                          <span className="nav-dropdown__index">{discipline.index}</span>
                          <span>{discipline.title[locale]}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Link href={href(locale, "/projects")} className="nav-capsule__link">
                  {nav.projects[locale]}
                </Link>
              </li>
              <li>
                <Link href={href(locale, "/sustainability-lab")} className="nav-capsule__link">
                  {nav.lab[locale]}
                </Link>
              </li>
              <li>
                <Link href={href(locale, "/team")} className="nav-capsule__link">
                  {nav.team[locale]}
                </Link>
              </li>
              <li>
                <Link href={href(locale, "/insights")} className="nav-capsule__link">
                  {nav.insights[locale]}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button
              ref={searchTriggerRef}
              type="button"
              className="icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label={ui.searchOpen[locale]}
            >
              <SearchIcon width={18} height={18} />
            </button>
            <div className="lang-switch" role="group" aria-label={ui.language[locale]}>
              <Link
                href={swapLocaleInPath(pathname, "en")}
                className={`lang-switch__option ${locale === "en" ? "is-active" : ""}`}
                aria-current={locale === "en" ? "true" : undefined}
                lang="en"
                hrefLang="en"
              >
                EN
              </Link>
              <Link
                href={swapLocaleInPath(pathname, "fa")}
                className={`lang-switch__option ${locale === "fa" ? "is-active" : ""}`}
                aria-current={locale === "fa" ? "true" : undefined}
                lang="fa"
                hrefLang="fa"
              >
                FA
              </Link>
            </div>
            <Link href={href(locale, "/contact")} className="btn btn--primary btn--sm header-actions__contact">
              {nav.contact[locale]}
            </Link>
            <button
              type="button"
              className="icon-btn header-actions__menu"
              onClick={() => setDrawerOpen(true)}
              aria-label={ui.openMenu[locale]}
              aria-expanded={drawerOpen}
            >
              <MenuIcon width={20} height={20} />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label={ui.menu[locale]}>
          <button className="drawer__backdrop" onClick={() => setDrawerOpen(false)} tabIndex={-1} aria-hidden="true" />
          <div className="drawer__panel">
            <div className="drawer__head">
              <Logo locale={locale} />
              <button
                type="button"
                className="icon-btn"
                onClick={() => setDrawerOpen(false)}
                aria-label={ui.closeMenu[locale]}
                autoFocus
              >
                <CloseIcon width={20} height={20} />
              </button>
            </div>
            <nav aria-label={locale === "fa" ? "ناوبری اصلی" : "Main navigation"}>
              <ul className="drawer__nav">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link href={href(locale, item.href)} className="drawer__link">
                      {item.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="drawer__subhead">{nav.expertise[locale]}</p>
              <ul className="drawer__sublist">
                {disciplines.map((discipline) => (
                  <li key={discipline.slug}>
                    <Link href={href(locale, `/expertise/${discipline.slug}`)} className="drawer__sublink">
                      <span>{discipline.index}</span>
                      {discipline.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="drawer__foot">
              <Link href={href(locale, "/contact")} className="btn btn--primary btn--block">
                {nav.contact[locale]}
              </Link>
              <div className="drawer__lang">
                <span>{ui.language[locale]}</span>
                <div className="lang-switch">
                  <Link
                    href={swapLocaleInPath(pathname, "en")}
                    className={`lang-switch__option ${locale === "en" ? "is-active" : ""}`}
                  >
                    EN
                  </Link>
                  <Link
                    href={swapLocaleInPath(pathname, "fa")}
                    className={`lang-switch__option ${locale === "fa" ? "is-active" : ""}`}
                  >
                    FA
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <SearchOverlay locale={locale} open={searchOpen} onClose={closeSearch} />
    </>
  );
}
