import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

/** Displays the custom 404 UI when a requested route or product does not exist. */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="grid min-h-[70vh] place-items-center px-6">
        <section className="max-w-md text-center">
          <p className="text-5xl text-indigo-700" aria-hidden="true">
            ⌕
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">
            404
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            That product is not here.
          </h1>
          <p className="mt-4 text-slate-600">
            The link may be outdated, or this item has left our catalog.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Browse products
          </Link>
        </section>
      </main>
    </div>
  );
}
