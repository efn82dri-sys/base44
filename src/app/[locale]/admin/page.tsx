import type { Metadata } from "next";
import { isConfigured, isStaff } from "@/lib/auth";
import { listSubmissions } from "@/lib/submissions";
import { ui } from "@/content/dictionary";
import { isLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submissions",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const { error } = await searchParams;

  if (!isConfigured()) {
    return (
      <section className="section">
        <div className="container admin">
          <h1 className="block-title block-title--lg">{ui.adminTitle[locale]}</h1>
          <p className="empty-note">{ui.adminUnconfigured[locale]}</p>
        </div>
      </section>
    );
  }

  if (!(await isStaff())) {
    return (
      <section className="section">
        <div className="container admin admin--narrow">
          <h1 className="block-title block-title--lg">{ui.adminLogin[locale]}</h1>
          <form className="form" action="/api/admin/login" method="post">
            <input type="hidden" name="locale" value={locale} />
            <div className="field">
              <label className="field__label" htmlFor="admin-password">
                {ui.adminPassword[locale]}
              </label>
              <input
                id="admin-password"
                className="field__control"
                type="password"
                name="password"
                autoComplete="current-password"
                required
              />
              {error === "invalid" && (
                <p className="field__error" role="alert">
                  {ui.adminWrong[locale]}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn--primary">
              {ui.adminSignIn[locale]}
            </button>
          </form>
        </div>
      </section>
    );
  }

  const submissions = await listSubmissions();
  const kindLabel = (kind: string) =>
    kind === "assessment"
      ? locale === "fa"
        ? "درخواست ارزیابی"
        : "Assessment request"
      : locale === "fa"
        ? "درخواست پروژه"
        : "Project inquiry";

  return (
    <section className="section">
      <div className="container admin">
        <div className="admin__head">
          <h1 className="block-title block-title--lg">{ui.adminTitle[locale]}</h1>
          <form action="/api/admin/logout" method="post">
            <input type="hidden" name="locale" value={locale} />
            <button type="submit" className="btn btn--ghost btn--sm">
              {ui.adminSignOut[locale]}
            </button>
          </form>
        </div>

        {submissions.length === 0 ? (
          <p className="empty-note">{ui.adminEmpty[locale]}</p>
        ) : (
          <ul className="admin-list">
            {submissions.map((submission) => (
              <li key={submission.id} className="admin-card">
                <div className="admin-card__head">
                  <span className="badge badge--olive">{kindLabel(submission.kind)}</span>
                  <time dateTime={submission.createdAt}>
                    {new Date(submission.createdAt).toLocaleString(
                      locale === "fa" ? "fa-IR" : "en-GB",
                      { dateStyle: "medium", timeStyle: "short" },
                    )}
                  </time>
                </div>
                <dl className="admin-card__fields">
                  {Object.entries(submission.data).map(([key, value]) => (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd>{Array.isArray(value) ? value.join(", ") : value || "—"}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
