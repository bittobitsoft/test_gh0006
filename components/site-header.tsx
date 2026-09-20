import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/products" className="flex items-center gap-2 font-semibold tracking-tight text-slate-950">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl bg-slate-950 text-sm text-white">N</span>
          Northstar Market
        </Link>
        <Link href="/admin" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
          <span aria-hidden="true">◈</span> Admin
        </Link>
      </div>
    </header>
  );
}
