"use client";

/** Gives visitors a retry action if the product route throws while rendering. */
export default function ProductsError({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <section className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-700">
          Catalog unavailable
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-950">
          We could not load the store.
        </h1>
        <p className="mt-3 text-slate-600">
          The upstream catalog may be temporarily unavailable. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
