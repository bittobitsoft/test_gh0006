import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { formatPrice, getProduct } from "@/lib/products";
import { notFound } from "next/navigation";

type ProductPageProps = PageProps<"/products/[id]">;

/** Uses the fetched product to generate SEO metadata, or interrupts rendering with the 404 UI. */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  return { title: product.title, description: product.description };
}

/** Renders a full server-side product view after confirming the dynamic id exists. */
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <Link
          href="/products"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        >
          <span aria-hidden="true">←</span> Back to catalog
        </Link>
        <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="grid min-h-96 place-items-center bg-slate-50 p-12 sm:p-20">
            <Image
              src={product.image}
              alt={product.title}
              width={620}
              height={620}
              priority
              className="max-h-96 w-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">
              {product.category}
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-slate-950">
                {formatPrice(product.price)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800">
                <span aria-hidden="true">★</span> {product.rating.rate} (
                {product.rating.count} reviews)
              </span>
            </div>
            <p className="mt-7 text-base leading-7 text-slate-600">
              {product.description}
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="text-emerald-600">
                  ✓
                </span>{" "}
                Free shipping on orders over $50
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="text-emerald-600">
                  ✓
                </span>{" "}
                30-day returns
              </li>
            </ul>
            <button
              type="button"
              className="mt-9 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600 cursor-pointer"
            >
              Add to bag
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}
