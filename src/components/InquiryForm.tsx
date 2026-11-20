"use client";

import { useState, type FormEvent } from "react";
import { ui } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { emailPattern, errorText } from "@/lib/formErrors";
import { CheckIcon } from "./Icons";
import { TextField } from "./FormField";

type Status = "idle" | "sending" | "success" | "invalid" | "server" | "network";

const empty = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

const projectTypeOptions = [
  { value: "residential", label: ui.typeResidential },
  { value: "commercial", label: ui.typeCommercial },
  { value: "administrative", label: ui.typeAdministrative },
  { value: "educational", label: ui.typeEducational },
  { value: "mixed-use", label: ui.typeMixedUse },
  { value: "public", label: ui.typePublic },
  { value: "urban", label: ui.typeUrban },
  { value: "other", label: ui.typeOther },
];

export function InquiryForm({ locale }: { locale: Locale }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const setField = (field: keyof typeof empty, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "required";
    if (!values.email.trim()) next.email = "required";
    else if (!emailPattern.test(values.email.trim())) next.email = "email";
    if (!values.message.trim()) next.message = "required";
    if (values.phone.trim() && values.phone.trim().length > 40) next.phone = "long";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrors(payload?.errors ?? {});
        setStatus("server");
        return;
      }
      setValues(empty);
      setStatus("success");
    } catch {
      setStatus("network");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon" aria-hidden="true">
          <CheckIcon width={26} height={26} />
        </span>
        <h3 className="form-success__title">{ui.formSuccessTitle[locale]}</h3>
        <p>{ui.formSuccessInquiry[locale]}</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus("idle")}>
          {ui.formSendAnother[locale]}
        </button>
      </div>
    );
  }

  const showSummary = status === "invalid" || status === "server";

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {showSummary && Object.keys(errors).length > 0 && (
        <p className="form__summary" role="alert">
          {ui.formErrorsTitle[locale]}
        </p>
      )}
      {status === "network" && (
        <p className="form__summary" role="alert">
          {ui.errNetwork[locale]}
        </p>
      )}
      {status === "server" && Object.keys(errors).length === 0 && (
        <p className="form__summary" role="alert">
          {ui.errServer[locale]}
        </p>
      )}

      <div className="form__grid">
        <TextField
          id="inquiry-name"
          label={ui.formName[locale]}
          value={values.name}
          onChange={(value) => setField("name", value)}
          error={errors.name}
          locale={locale}
          required
          autoComplete="name"
        />
        <TextField
          id="inquiry-organisation"
          label={ui.formOrganisation[locale]}
          value={values.organisation}
          onChange={(value) => setField("organisation", value)}
          error={errors.organisation}
          locale={locale}
          autoComplete="organization"
        />
        <TextField
          id="inquiry-email"
          label={ui.formEmail[locale]}
          type="email"
          value={values.email}
          onChange={(value) => setField("email", value)}
          error={errors.email}
          locale={locale}
          required
          autoComplete="email"
          inputMode="email"
        />
        <TextField
          id="inquiry-phone"
          label={ui.formPhone[locale]}
          type="tel"
          value={values.phone}
          onChange={(value) => setField("phone", value)}
          error={errors.phone}
          locale={locale}
          autoComplete="tel"
          inputMode="tel"
        />
        <div className="field field--full">
          <label className="field__label" htmlFor="inquiry-type">
            {ui.formProjectType[locale]}
          </label>
          <select
            id="inquiry-type"
            className="field__control"
            value={values.projectType}
            onChange={(event) => setField("projectType", event.target.value)}
          >
            <option value="">{ui.selectPlaceholder[locale]}</option>
            {projectTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[locale]}
              </option>
            ))}
          </select>
        </div>
        <div className={`field field--full ${errors.message ? "has-error" : ""}`}>
          <label className="field__label" htmlFor="inquiry-message">
            {ui.formMessage[locale]}
            <span className="field__req" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="inquiry-message"
            className="field__control field__control--area"
            rows={5}
            value={values.message}
            onChange={(event) => setField("message", event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "inquiry-message-error" : "inquiry-message-hint"}
            required
          />
          <p className="field__hint" id="inquiry-message-hint">
            {ui.formMessageHint[locale]}
          </p>
          {errors.message && (
            <p className="field__error" id="inquiry-message-error">
              {errorText(errors.message, locale)}
            </p>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
        {status === "sending" ? ui.loading[locale] : ui.formSubmitInquiry[locale]}
      </button>
    </form>
  );
}

