import type { Locale } from "@/lib/i18n";
import { errorText } from "@/lib/formErrors";

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  locale,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  hint,
  optionalLabel,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  locale: Locale;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal";
  hint?: string;
  optionalLabel?: string;
}) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? (
          <span className="field__req" aria-hidden="true">
            *
          </span>
        ) : (
          optionalLabel && <span className="field__optional">{optionalLabel}</span>
        )}
      </label>
      <input
        id={id}
        className="field__control"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
      />
      {hint && !error && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          {errorText(error, locale)}
        </p>
      )}
    </div>
  );
}
