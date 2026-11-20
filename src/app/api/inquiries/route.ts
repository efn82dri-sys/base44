import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validate";
import { addSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const result = validateInquiry(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  try {
    await addSubmission("inquiry", result.data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }
}
