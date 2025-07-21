// src/lib/api.ts
import { jenis_Product } from "@/types/jenisProduct"

const API_URL = "http://localhost:5000" // nanti backend jalan di sini

export async function fetchJenisProducts(): Promise<jenis_Product[]> {
  const res = await fetch(`${API_URL}/api/jns-produk`, {
    next: { revalidate: 0 }, // untuk fresh fetch (App Router)
  })

  if (!res.ok) throw new Error("Gagal fetch data produk")
  return res.json()
}


export async function createJenisProduct(product: Omit<jenis_Product, "id">) {
  const res = await fetch(`${API_URL}/api/jns-produk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  if (!res.ok) throw new Error("Gagal tambah produk")
}

export async function updateJenisProduct(id: number, product: Omit<jenis_Product, "id">) {
  const res = await fetch(`${API_URL}/api/produk/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  if (!res.ok) throw new Error("Gagal update produk")
}

export async function deleteJenisProduct(id: number) {
  const res = await fetch(`${API_URL}/api/produk/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Gagal hapus produk")
}
