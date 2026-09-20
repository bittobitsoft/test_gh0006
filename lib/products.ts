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
const FALLBACK_PRODUCTS: Product[] = [
  [1, "Fjallraven Foldsack No. 1 Backpack", 109.95, "men's clothing", 3.9, 120],
  [2, "Slim Fit T-Shirts", 22.3, "men's clothing", 4.1, 259],
  [3, "Cotton Jacket", 55.99, "men's clothing", 4.7, 500],
  [4, "Casual Slim Fit Shirt", 15.99, "men's clothing", 2.1, 430],
  [5, "Silver Dragon Station Bracelet", 695, "jewelery", 4.6, 400],
  [6, "Solid Gold Petite Micropave", 168, "jewelery", 3.9, 70],
  [7, "White Gold Plated Princess", 9.99, "jewelery", 3.3, 400],
  [8, "Pierced Owl Rose Gold Plated", 10.99, "jewelery", 1.9, 100],
  [9, "WD 2TB Elements Portable External Hard Drive", 64, "electronics", 3.3, 203],
  [10, "SanDisk SSD PLUS 1TB Internal SSD", 109, "electronics", 2.9, 470],
  [11, "Silicon Power 256GB SSD", 109, "electronics", 4.8, 319],
  [12, "WD 4TB Gaming Drive", 114, "electronics", 4.8, 400],
].map(([id, title, price, category, rate, count]) => ({
  id: id as number,
  title: title as string,
  price: price as number,
  category: category as string,
  description: "A dependable catalog item available while the live product service reconnects.",
  image: "/product-placeholder.svg",
  rating: { rate: rate as number, count: count as number },
}));
const cacheOptions = {
  cache: "force-cache" as const,
  next: { revalidate: 300, tags: ["products"] },
};

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url, cacheOptions);
  if (!response.ok) throw new Error(`FakeStoreAPI request failed with ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  try {
    return await request<Product[]>(API_URL);
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!/^\d+$/.test(id) || Number(id) < 1) return null;
  try {
    const response = await fetch(`${API_URL}/${id}`, cacheOptions);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`FakeStoreAPI request failed with ${response.status}`);
    return response.json() as Promise<Product>;
  } catch {
    return FALLBACK_PRODUCTS.find((product) => product.id === Number(id)) ?? null;
  }
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}
