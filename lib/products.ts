import "server-only";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

const API_URL = "https://fakestoreapi.com/products";
const cacheOptions = {
  cache: "force-cache" as const,
  next: { revalidate: 300, tags: ["products"] },
};

/** Fetches one FakeStore endpoint and turns unsuccessful HTTP responses into errors. */
async function request<T>(url: string): Promise<T> {
  const response = await fetch(url, cacheOptions);
  if (!response.ok)
    throw new Error(`FakeStoreAPI request failed with ${response.status}`);
  return response.json() as Promise<T>;
}

/** Loads the live catalog; an unavailable upstream intentionally appears as an empty catalog. */
export async function getProducts(): Promise<Product[]> {
  try {
    return await request<Product[]>(API_URL);
  } catch {
    return [];
  }
}

/** Validates a route id and returns null only for a product that does not exist. */
export async function getProduct(id: string): Promise<Product | null> {
  if (!/^\d+$/.test(id) || Number(id) < 1) return null;
  const response = await fetch(`${API_URL}/${id}`, cacheOptions);
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error(`FakeStoreAPI request failed with ${response.status}`);
  return response.json() as Promise<Product>;
}

/** Keeps all prices formatted consistently for the catalog and product detail views. */
export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
