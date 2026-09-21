import { redirect } from "next/navigation";

/** Keeps the root URL focused by sending visitors directly to the product catalog. */
export default function Home() {
  redirect("/products");
}
