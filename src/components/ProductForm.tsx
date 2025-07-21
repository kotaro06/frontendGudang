import React, { useState, useEffect } from "react";
import { jenis_Product } from "@/types/jenisProduct"
import {createJenisProduct, updateJenisProduct } from "@/lib/api"

// Tambahkan prop `editingProduct` dan `onFinishEdit`
export default function ProductForm({
  editingProduct,
  onSuccess,
  onFinishEdit,
}: {
  editingProduct?: jenis_Product
  onSuccess: () => void
  onFinishEdit?: () => void
}) {
  const [jenis_Product,  setJenisProduk] = useState(editingProduct?.jns_produk || "")
  
  const [diskripsi, setDiskripsi] = useState(editingProduct?.diskripsi || "")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingProduct) {
      setJenisProduk(editingProduct.jns_produk)      
      setDiskripsi(editingProduct.diskripsi)
    }
  }, [editingProduct])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingProduct) {
        await updateJenisProduct(editingProduct.id, { jns_produk: jenis_Product, diskripsi })
        onFinishEdit?.()
      } else {
        await createJenisProduct({ jns_produk: jenis_Product, diskripsi })
      }
      setJenisProduk("")      
      setDiskripsi("")
      onSuccess()
    } catch {
      alert("Gagal simpan produk.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <h2 className="font-semibold text-lg">
        {editingProduct ? "Edit Produk" : "Tambah Produk"}
      </h2>
      <input
        type="text"
        placeholder="Nama Produk"
        value={jenis_Product}
        onChange={(e) => setJenisProduk(e.target.value)}
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
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Menyimpan..." : editingProduct ? "Update" : "Tambah"}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={onFinishEdit}
            className="text-gray-600 underline"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  )
}
