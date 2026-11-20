"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { disciplines } from "@/content/disciplines";
import { hero } from "@/content/home";
import { ui } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { disciplineIcons, ArrowRightIcon, CloseIcon, ExpandIcon } from "./Icons";

export function Hero({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const active = disciplines[activeIndex];
  const dialogActive = disciplines[dialogIndex];

  const openDialog = () => {
    setDialogIndex(activeIndex);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    window.setTimeout(() => dialogTriggerRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!dialogOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("is-locked");
    window.setTimeout(() => dialogCloseRef.current?.focus(), 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen]);

  const spotlightStyle = {
    "--spot-x": `${active.annotation.x}%`,
    "--spot-y": `${active.annotation.y}%`,
  } as CSSProperties;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <picture className="hero__picture">
          <source media="(max-width: 760px)" srcSet="/images/hero-town-mobile.svg" />
          <img
            src="/images/hero-town.svg"
            alt={hero.imageAlt[locale]}
            width={2400}
            height={1100}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__spotlight" style={spotlightStyle} aria-hidden="true" />

        <div className="hero__annotations" aria-label={hero.caption[locale]}>
          {disciplines.map((discipline, index) => {
            const Icon = disciplineIcons[discipline.icon];
            const isActive = index === activeIndex;
            return (
              <div
                key={discipline.slug}
                className={`annotation ${isActive ? "is-active" : ""}`}
                style={{
                  left: `${discipline.annotation.x}%`,
                  top: `${discipline.annotation.y}%`,
                }}
              >
                <button
                  type="button"
                  className="annotation__trigger"
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                  aria-controls={`annotation-card-${discipline.slug}`}
                >
                  <span className="annotation__pill">
                    <Icon width={16} height={16} />
                    <span>{discipline.annotation.caption[locale]}</span>
                  </span>
                  <span className="annotation__line" aria-hidden="true" />
                  <span className="annotation__dot" aria-hidden="true" />
                </button>
                {isActive && (
                  <div className="annotation__card" id={`annotation-card-${discipline.slug}`}>
                    <p className="annotation__caption">{discipline.annotation.caption[locale]}</p>
                    <p className="annotation__body">{discipline.annotation.body[locale]}</p>
                    <Link href={href(locale, `/expertise/${discipline.slug}`)} className="annotation__link">
                      {discipline.shortTitle[locale]}
                      <ArrowRightIcon className="flip-rtl" width={14} height={14} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="container hero__content">
        <p className="hero__meta">{hero.meta[locale]}</p>
        <h1 className="hero__title" id="hero-title">
          {hero.headline[locale].before}
          <span className="accent">{hero.headline[locale].accent}</span>
        </h1>
        <p className="hero__support">{hero.support[locale]}</p>
        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={openDialog}>
            {hero.primaryCta[locale]}
          </button>
          <Link href={href(locale, "/expertise")} className="btn btn--ghost">
            {hero.secondaryCta[locale]}
          </Link>
        </div>
      </div>

      <div className="container hero__foot">
        <div className="hero__caption">
          <span className="hero__caption-dot" aria-hidden="true" />
          <span className="hero__caption-title">{hero.caption[locale]}</span>
          <span className="hero__caption-note">{hero.captionNote[locale]}</span>
        </div>

        <div className="hero__selectors" role="group" aria-label={hero.dialogNote[locale]}>
          {disciplines.map((discipline, index) => (
            <button
              key={discipline.slug}
              type="button"
              className={`hero__selector ${index === activeIndex ? "is-active" : ""}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <span className="hero__selector-index">{discipline.index}</span>
              <span className="hero__selector-label">{discipline.shortTitle[locale]}</span>
            </button>
          ))}
        </div>

        <button
          ref={dialogTriggerRef}
          type="button"
          className="hero__expand"
          onClick={openDialog}
          aria-label={hero.expand[locale]}
          title={hero.expand[locale]}
        >
          <ExpandIcon width={18} height={18} />
        </button>

        <div className="hero__mobile-note">
          <p className="hero__mobile-caption">{active.annotation.caption[locale]}</p>
          <p className="hero__mobile-body">{active.annotation.body[locale]}</p>
          <Link href={href(locale, `/expertise/${active.slug}`)} className="text-link">
            {active.shortTitle[locale]}
            <ArrowRightIcon className="flip-rtl" width={14} height={14} />
          </Link>
        </div>
      </div>

      {dialogOpen && (
        <div className="hero-dialog" role="dialog" aria-modal="true" aria-labelledby="hero-dialog-title">
          <button className="hero-dialog__backdrop" onClick={closeDialog} tabIndex={-1} aria-hidden="true" />
          <div className="hero-dialog__panel">
            <div className="hero-dialog__head">
              <div>
                <h2 id="hero-dialog-title" className="hero-dialog__title">
                  {hero.dialogTitle[locale]}
                </h2>
                <p className="hero-dialog__note">{hero.dialogNote[locale]}</p>
              </div>
              <button
                ref={dialogCloseRef}
                type="button"
                className="icon-btn"
                onClick={closeDialog}
                aria-label={ui.close[locale]}
              >
                <CloseIcon width={20} height={20} />
              </button>
            </div>

            <div className="hero-dialog__stage">
              <picture className="hero-dialog__picture">
                <source media="(max-width: 760px)" srcSet="/images/hero-town-mobile.svg" />
                <img src="/images/hero-town.svg" alt={hero.imageAlt[locale]} width={2400} height={1100} />
              </picture>
              <div
                className="hero-dialog__spotlight"
                style={
                  {
                    "--spot-x": `${dialogActive.annotation.x}%`,
                    "--spot-y": `${dialogActive.annotation.y}%`,
                  } as CSSProperties
                }
                aria-hidden="true"
              />
              {disciplines.map((discipline, index) => (
                <button
                  key={discipline.slug}
                  type="button"
                  className={`hero-dialog__pin ${index === dialogIndex ? "is-active" : ""}`}
                  style={{
                    left: `${discipline.annotation.x}%`,
                    top: `${discipline.annotation.y}%`,
                  }}
                  onClick={() => setDialogIndex(index)}
                  aria-pressed={index === dialogIndex}
                  aria-label={discipline.annotation.caption[locale]}
                >
                  <span className="hero-dialog__pin-index">{discipline.index}</span>
                  <span className="hero-dialog__pin-dot" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="hero-dialog__details">
              <div className="hero-dialog__tabs" role="group" aria-label={hero.dialogTitle[locale]}>
                {disciplines.map((discipline, index) => (
                  <button
                    key={discipline.slug}
                    type="button"
                    className={`hero-dialog__tab ${index === dialogIndex ? "is-active" : ""}`}
                    aria-pressed={index === dialogIndex}
                    onClick={() => setDialogIndex(index)}
                  >
                    <span>{discipline.index}</span>
                    {discipline.shortTitle[locale]}
                  </button>
                ))}
              </div>
              <div className="hero-dialog__text">
                <h3>{dialogActive.annotation.caption[locale]}</h3>
                <p>{dialogActive.annotation.body[locale]}</p>
                <Link
                  href={href(locale, `/expertise/${dialogActive.slug}`)}
                  className="text-link"
                  onClick={closeDialog}
                >
                  {dialogActive.title[locale]}
                  <ArrowRightIcon className="flip-rtl" width={15} height={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
