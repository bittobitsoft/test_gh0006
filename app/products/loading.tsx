/** Shows a catalog-shaped skeleton while the server is resolving the products route. */
export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 sm:p-16">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-8 w-48 rounded bg-slate-200" />
        <div className="mt-6 h-14 max-w-xl rounded bg-slate-200" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="aspect-square rounded-xl bg-slate-100" />
              <div className="mt-5 h-4 w-20 rounded bg-slate-100" />
              <div className="mt-3 h-5 w-4/5 rounded bg-slate-100" />
              <div className="mt-5 h-6 w-24 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
