// src/components/ProductForm.tsx
"use client"

import { useState } from "react"
import { createProduct } from "@/lib/api"

export default function ProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [Jns_Product, setJnsProduk] = useState("")
  const [diskripsi, setDiskripsi] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await createProduct({ jns_produk: Jns_Product, diskripsi: diskripsi })
      setJnsProduk("")
      setDiskripsi("")      
      onSuccess() // refresh tabel
    } catch (error: unknown) {
  console.error("Error detail:", error)
  alert("Gagal menambah produk.")
} finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <h2 className="font-semibold text-lg">Tambah Produk</h2>
      <input
        type="text"
        placeholder="Nama Produk"
        value={Jns_Product}
        onChange={(e) => setJnsProduk(e.target.value)}
        className="border p-2 w-full"
        required
      />
      
      <input
        type="text"
        placeholder="Deskripsi"
        value={diskripsi}
        onChange={(e) => setDiskripsi(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Menyimpan..." : "Tambah"}
      </button>
    </form>
  )
}
