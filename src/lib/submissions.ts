import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type SubmissionKind = "inquiry" | "assessment";

export interface Submission {
  id: string;
  kind: SubmissionKind;
  createdAt: string;
  status: "new" | "reviewed";
  data: Record<string, string | string[]>;
}

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), ".data");
const file = path.join(dataDir, "submissions.json");

/** Serialises writes so concurrent submissions cannot clobber each other. */
let queue: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Submission[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeAll(items: Submission[]): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(items, null, 2), "utf8");
  await fs.rename(tmp, file);
}

export function addSubmission(
  kind: SubmissionKind,
  data: Record<string, string | string[]>,
): Promise<Submission> {
  const job = queue.then(async () => {
    const items = await readAll();
    const record: Submission = {
      id: randomUUID(),
      kind,
      createdAt: new Date().toISOString(),
      status: "new",
      data,
    };
    items.unshift(record);
    await writeAll(items);
    return record;
  });
  queue = job.catch(() => undefined);
  return job;
}

export function listSubmissions(): Promise<Submission[]> {
  const job = queue.then(readAll);
  queue = job.catch(() => undefined);
  return job;
}
