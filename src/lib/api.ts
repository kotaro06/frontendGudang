// src/lib/api.ts
import { Product } from "@/types/product"

const API_URL = "http://localhost:5000" // nanti backend jalan di sini

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/produk`, {
    next: { revalidate: 0 }, // untuk fresh fetch (App Router)
  })

  if (!res.ok) throw new Error("Gagal fetch data produk")
  return res.json()
}
