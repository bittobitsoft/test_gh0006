import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

/** Renders one product summary; only the first visible card opts into eager image loading for LCP. */
export function ProductCard({
  product,
  eager = false,
}: {
  product: Product;
  eager?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block"><div className="relative grid aspect-square place-items-center bg-slate-50 p-7"><Image src={product.image} alt={product.title} width={360} height={360} loading={eager ? "eager" : "lazy"} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="h-full w-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-105" /></div></Link>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"><span className="truncate">{product.category}</span><span className="inline-flex shrink-0 items-center gap-1 text-amber-700"><span aria-hidden="true">★</span>{product.rating.rate}</span></div>
        <Link href={`/products/${product.id}`} className="block text-base font-semibold leading-6 text-slate-950 hover:underline">{product.title}</Link>
        <div className="flex items-center justify-between"><p className="text-lg font-bold text-slate-950">{formatPrice(product.price)}</p><Link aria-label={`View ${product.title}`} href={`/products/${product.id}`} className="rounded-lg bg-slate-950 px-3 py-2 text-white transition hover:bg-indigo-600"><span aria-hidden="true">↗</span></Link></div>
      </div>
    </article>
  );
}
