# Northstar Market - Next.js SSR task

A compact product catalog built with the Next.js App Router and TypeScript. Product data comes from [FakeStoreAPI](https://fakestoreapi.com), and all product views are rendered by Server Components.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The root route forwards to `/products`.

Set both environment variables in `.env.local` before using the protected admin route:

- `ADMIN_PASSWORD` - the password accepted at `/login`
- `ADMIN_SESSION_TOKEN` - a long, random server-only token stored in the HTTP-only session cookie

For Vercel, add the same two variables under **Project Settings -> Environment Variables** before deploying.

## Routes and rendering decisions

| Route | Rendering | Why |
| --- | --- | --- |
| `/products?page=` | SSR Server Component | `searchParams` is read on the server to calculate the requested page and return the first HTML response. |
| `/products/[id]` | SSR Server Component | The route fetches the requested product on the server; `generateMetadata` uses that actual product data. Missing products call `notFound()`. |
| `/admin` | SSR Server Component | The HTTP-only cookie is checked on the server before any admin UI is rendered. Invalid sessions redirect to `/login`. |

`/login` is a small supporting authentication route, not a catalog page. Its Server Action issues the secure session cookie only after the configured password succeeds.

## Caching choice

This project intentionally uses the established fetch-cache model available in Next.js 16 with Cache Components left disabled. FakeStoreAPI requests use `cache: "force-cache"` and `next: { revalidate: 300 }` in `lib/products.ts`.

That is a five-minute ISR-style data cache: the pages still render on the server for each request, while the shared public catalog data is not fetched upstream repeatedly. This is a practical tradeoff for FakeStoreAPI's mostly static demo inventory. Development mode intentionally bypasses the persistent cache, which is normal Next.js behavior.

If the upstream API is unavailable or returns no products, the catalog renders a centered unavailable message instead of substitute product data.

## Loading and error handling

`app/products/loading.tsx` provides a route loading skeleton. `app/products/error.tsx` is a client error boundary with a retry action for upstream API failures. `app/not-found.tsx` is the custom 404 UI used when an unknown product id is requested.

## Useful commands

```bash
npm run lint
npm run build
npm run start
```

## SSR decisions table for submission

| Page | SSR / ISR / CSR | Reason |
| --- | --- | --- |
| `/products` | SSR + cached data | Server-side query pagination, with FakeStoreAPI data revalidated every five minutes. |
| `/products/[id]` | SSR + cached data | Dynamic product view and metadata are resolved from product data on the server. |
| `/admin` | SSR | The session is validated from an HTTP-only cookie on the server before the page renders. |
