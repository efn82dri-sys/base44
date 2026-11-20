export type ValidationErrors = Record<string, string>;

export type ValidationResult =
  | { ok: true; data: Record<string, string | string[]> }
  | { ok: false; errors: ValidationErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value: unknown, max = 400): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function asObject(input: unknown): Record<string, unknown> {
  return input && typeof input === "object" && !Array.isArray(input)
    ? (input as Record<string, unknown>)
    : {};
}

export function validateInquiry(input: unknown): ValidationResult {
  const body = asObject(input);
  const errors: ValidationErrors = {};

  const name = text(body.name, 120);
  const organisation = text(body.organisation, 160);
  const email = text(body.email, 200);
  const phone = text(body.phone, 40);
  const projectType = text(body.projectType, 40);
  const message = text(body.message, 4000);

  if (!name) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!EMAIL.test(email)) errors.email = "email";
  if (!message) errors.message = "required";
  if (phone.length > 40) errors.phone = "long";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: { name, organisation, email, phone, projectType, message },
  };
}

export function validateAssessment(input: unknown): ValidationResult {
  const body = asObject(input);
  const errors: ValidationErrors = {};

  const projectType = text(body.projectType, 40);
  const city = text(body.city, 120);
  const floorAreaRaw = body.floorArea;
  const stage = text(body.stage, 40);
  const goals = Array.isArray(body.goals)
    ? body.goals.filter((item): item is string => typeof item === "string").slice(0, 12)
    : [];
  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const phone = text(body.phone, 40);
  const notes = text(body.notes, 4000);

  if (!projectType) errors.projectType = "required";
  if (!city) errors.city = "required";
  const floorArea = typeof floorAreaRaw === "number" ? floorAreaRaw : Number(floorAreaRaw);
  if (!Number.isFinite(floorArea) || floorArea <= 0) errors.floorArea = "number";
  if (!stage) errors.stage = "required";
  if (goals.length === 0) errors.goals = "required";
  if (!name) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!EMAIL.test(email)) errors.email = "email";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      projectType,
      city,
      floorArea: String(Math.round(floorArea)),
      stage,
      goals,
      name,
      email,
      phone,
      notes,
    },
  };
}
