// src/lib/api.ts
import { Jns_Product } from "@/types/JnsProduct"

const API_URL = "http://localhost:5000" // nanti backend jalan di sini

export async function fetchProducts(): Promise<Jns_Product[]> {
  const res = await fetch(`${API_URL}/api/jns-produk`, {
    next: { revalidate: 0 }, // untuk fresh fetch (App Router)
  })

  if (!res.ok) throw new Error("Gagal fetch data produk")
  return res.json()
}


export async function createProduct(product: Omit<Jns_Product, "id">) {
  const res = await fetch(`${API_URL}/api/jns-produk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  if (!res.ok) throw new Error("Gagal tambah produk")
}