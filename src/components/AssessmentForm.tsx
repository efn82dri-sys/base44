"use client";

import { useState, type FormEvent } from "react";
import { ui } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { emailPattern, errorText } from "@/lib/formErrors";
import { TextField } from "./FormField";
import { CheckIcon } from "./Icons";

type Status = "idle" | "sending" | "success" | "invalid" | "server" | "network";

const empty = {
  projectType: "",
  city: "",
  floorArea: "",
  stage: "",
  goals: [] as string[],
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const typeOptions = [
  { value: "residential", label: ui.typeResidential },
  { value: "commercial", label: ui.typeCommercial },
  { value: "administrative", label: ui.typeAdministrative },
  { value: "educational", label: ui.typeEducational },
  { value: "mixed-use", label: ui.typeMixedUse },
  { value: "public", label: ui.typePublic },
  { value: "urban", label: ui.typeUrban },
  { value: "other", label: ui.typeOther },
];

const stageOptions = [
  { value: "concept", label: ui.stageConcept },
  { value: "schematic", label: ui.stageSchematic },
  { value: "development", label: ui.stageDevelopment },
  { value: "tender", label: ui.stageTender },
  { value: "existing", label: ui.stageExisting },
];

const goalOptions = [
  { value: "daylight", label: ui.goalDaylight },
  { value: "energy", label: ui.goalEnergy },
  { value: "carbon", label: ui.goalCarbon },
  { value: "seismic", label: ui.goalSeismic },
  { value: "certification", label: ui.goalCertification },
  { value: "comparison", label: ui.goalComparison },
];

export function AssessmentForm({ locale }: { locale: Locale }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const setField = <K extends keyof typeof empty>(field: K, value: (typeof empty)[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field as string]) return current;
      const next = { ...current };
      delete next[field as string];
      return next;
    });
  };

  const toggleGoal = (goal: string) => {
    setValues((current) => ({
      ...current,
      goals: current.goals.includes(goal)
        ? current.goals.filter((item) => item !== goal)
        : [...current.goals, goal],
    }));
    setErrors((current) => {
      if (!current.goals) return current;
      const next = { ...current };
      delete next.goals;
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const next: Record<string, string> = {};
    if (!values.projectType) next.projectType = "required";
    if (!values.city.trim()) next.city = "required";
    if (!values.floorArea.trim()) next.floorArea = "required";
    else if (!Number.isFinite(Number(values.floorArea)) || Number(values.floorArea) <= 0)
      next.floorArea = "number";
    if (!values.stage) next.stage = "required";
    if (values.goals.length === 0) next.goals = "required";
    if (!values.name.trim()) next.name = "required";
    if (!values.email.trim()) next.email = "required";
    else if (!emailPattern.test(values.email.trim())) next.email = "email";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, floorArea: Number(values.floorArea) }),
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
        <p>{ui.formSuccessAssessment[locale]}</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus("idle")}>
          {ui.formSendAnother[locale]}
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <p className="form__intro">{ui.assessmentIntro[locale]}</p>

      {status === "invalid" && Object.keys(errors).length > 0 && (
        <p className="form__summary" role="alert">
          {ui.formErrorsTitle[locale]}
        </p>
      )}
      {status === "network" && (
        <p className="form__summary" role="alert">
          {ui.errNetwork[locale]}
        </p>
      )}
      {status === "server" && (
        <p className="form__summary" role="alert">
          {ui.errServer[locale]}
        </p>
      )}

      <div className="form__grid">
        <div className={`field ${errors.projectType ? "has-error" : ""}`}>
          <label className="field__label" htmlFor="assessment-type">
            {ui.formProjectType[locale]}
            <span className="field__req" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="assessment-type"
            className="field__control"
            value={values.projectType}
            onChange={(event) => setField("projectType", event.target.value)}
            aria-invalid={errors.projectType ? true : undefined}
            required
          >
            <option value="">{ui.selectPlaceholder[locale]}</option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[locale]}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className="field__error">{errorText(errors.projectType, locale)}</p>
          )}
        </div>

        <TextField
          id="assessment-city"
          label={ui.formCity[locale]}
          value={values.city}
          onChange={(value) => setField("city", value)}
          error={errors.city}
          locale={locale}
          required
          autoComplete="address-level2"
        />

        <TextField
          id="assessment-area"
          label={ui.formFloorArea[locale]}
          type="number"
          inputMode="numeric"
          value={values.floorArea}
          onChange={(value) => setField("floorArea", value)}
          error={errors.floorArea}
          locale={locale}
          required
        />

        <div className={`field ${errors.stage ? "has-error" : ""}`}>
          <label className="field__label" htmlFor="assessment-stage">
            {ui.formStage[locale]}
            <span className="field__req" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="assessment-stage"
            className="field__control"
            value={values.stage}
            onChange={(event) => setField("stage", event.target.value)}
            aria-invalid={errors.stage ? true : undefined}
            required
          >
            <option value="">{ui.selectPlaceholder[locale]}</option>
            {stageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[locale]}
              </option>
            ))}
          </select>
          {errors.stage && <p className="field__error">{errorText(errors.stage, locale)}</p>}
        </div>

        <fieldset className={`field field--full fieldset ${errors.goals ? "has-error" : ""}`}>
          <legend className="field__label">
            {ui.formGoals[locale]}
            <span className="field__req" aria-hidden="true">
              *
            </span>
          </legend>
          <p className="field__hint">{ui.formGoalsHint[locale]}</p>
          <div className="checkbox-grid">
            {goalOptions.map((option) => (
              <label key={option.value} className="checkbox">
                <input
                  type="checkbox"
                  checked={values.goals.includes(option.value)}
                  onChange={() => toggleGoal(option.value)}
                />
                <span>{option.label[locale]}</span>
              </label>
            ))}
          </div>
          {errors.goals && <p className="field__error">{errorText(errors.goals, locale)}</p>}
        </fieldset>

        <TextField
          id="assessment-name"
          label={ui.formName[locale]}
          value={values.name}
          onChange={(value) => setField("name", value)}
          error={errors.name}
          locale={locale}
          required
          autoComplete="name"
        />

        <TextField
          id="assessment-email"
          label={ui.formEmail[locale]}
          type="email"
          inputMode="email"
          value={values.email}
          onChange={(value) => setField("email", value)}
          error={errors.email}
          locale={locale}
          required
          autoComplete="email"
        />

        <TextField
          id="assessment-phone"
          label={ui.formPhone[locale]}
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(value) => setField("phone", value)}
          error={errors.phone}
          locale={locale}
          autoComplete="tel"
          optionalLabel={ui.optional[locale]}
        />

        <div className={`field field--full ${errors.notes ? "has-error" : ""}`}>
          <label className="field__label" htmlFor="assessment-notes">
            {ui.formNotes[locale]}
          </label>
          <textarea
            id="assessment-notes"
            className="field__control field__control--area"
            rows={4}
            value={values.notes}
            onChange={(event) => setField("notes", event.target.value)}
          />
          {errors.notes && <p className="field__error">{errorText(errors.notes, locale)}</p>}
        </div>
      </div>

      <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
        {status === "sending" ? ui.loading[locale] : ui.formSubmitAssessment[locale]}
      </button>
    </form>
  );
}
