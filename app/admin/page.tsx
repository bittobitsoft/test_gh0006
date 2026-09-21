import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { isAdminSessionValid } from "@/lib/auth";
import { logoutAdmin } from "@/app/login/actions";

/** Verifies the session on the server before rendering any protected admin content. */
export default async function AdminPage() {
  if (!(await isAdminSessionValid())) redirect("/login");
  const cards = [
    { label: "Catalog items", value: "20", icon: "▦" },
    { label: "Cache window", value: "5 min", icon: "◷" },
    { label: "Access", value: "Verified", icon: "✓" },
  ];
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">
              Settings
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
              Admin overview
            </h1>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 cursor-pointer"
            >
              Log out
            </button>
          </form>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Some statistics useful to management
        </p>
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map(({ label, value, icon }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span aria-hidden="true" className="text-xl text-indigo-700">
                {icon}
              </span>
              <p className="mt-8 text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">{value}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
