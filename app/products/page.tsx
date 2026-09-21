import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/products";

const PAGE_SIZE = 6;
/** Converts an untrusted query parameter into a safe, positive pagination page number. */
function parsePage(value: string | string[] | undefined) {
  const candidate = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(candidate ?? "1", 10);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

/** Fetches, paginates, and renders the catalog on the server for the requested page. */
export default async function ProductsPage({
  searchParams,
}: PageProps<"/products">) {
  const page = parsePage((await searchParams).page);
  const products = await getProducts();
  if (!products.length) notFound();
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages);
  const visibleProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <section className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">
              Shop and enjoy.
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Thoughtful objects for everyday life.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Step into a world filled with everything you need for your daily
              life.
            </p>
          </div>
          <p className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </p>
        </section>
        <section
          aria-label="Products"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              eager={index === 0}
            />
          ))}
        </section>
        <nav
          aria-label="Product pagination"
          className="mt-10 flex items-center justify-center gap-3"
        >
          <Link
            aria-disabled={currentPage === 1}
            href={`/products?page=${Math.max(1, currentPage - 1)}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          >
            <span aria-hidden="true">←</span> Previous
          </Link>
          <span className="text-sm text-slate-500">
            {currentPage} / {totalPages}
          </span>
          <Link
            aria-disabled={currentPage === totalPages}
            href={`/products?page=${Math.min(totalPages, currentPage + 1)}`}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          >
            Next <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
