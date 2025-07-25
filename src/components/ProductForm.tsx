"use client"
import { useState, useEffect } from "react"
import { jenis_Product } from "@/types/jenisProduct"
import Image from "next/image"

export default function ProductForm({
  editingProduct,
  onSuccess,
  onFinishEdit,
}: {
  editingProduct?: jenis_Product
  onSuccess: () => void
  onFinishEdit?: () => void
}) {
  const [jenis_produk, setjnsProduk] = useState("")
  const [diskripsi, setDiskripsi] = useState("")
  const [gambar, setGambar] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingProduct) {
      setjnsProduk(editingProduct.jns_produk)
      setDiskripsi(editingProduct.diskripsi)
      setPreview(editingProduct.gambar 
        ? `http://localhost:5000/uploads/${editingProduct.gambar}`
        : null)
    } else {
      resetForm()
    }
  }, [editingProduct])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setGambar(file)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setjnsProduk("")
    setDiskripsi("")
    setGambar(null)
    setPreview(null)
    onFinishEdit?.()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = new FormData()
      form.append("jns_produk", jenis_produk)
      form.append("diskripsi", diskripsi)
      if (gambar) form.append("gambar", gambar)

      const url = editingProduct
        ? `http://localhost:5000/api/jns-produk/${editingProduct.id}`
        : `http://localhost:5000/api/jns-produk`

      const response = await fetch(url, {
        method: editingProduct ? "PUT" : "POST",
        body: form,
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      resetForm()
      onSuccess()
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(`Gagal menyimpan produk. Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <h2 className="font-semibold text-lg">
        {editingProduct ? "Edit Produk" : "Tambah Produk"}
      </h2>

      <div>
        <label className="block mb-1">Jenis Produk</label>
        <input
          type="text"
          placeholder="Jenis Produk"
          value={jenis_produk}
          onChange={(e) => setjnsProduk(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Deskripsi</label>
        <textarea
          placeholder="Deskripsi"
          value={diskripsi}
          onChange={(e) => setDiskripsi(e.target.value)}
          className="border p-2 w-full rounded"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Gambar</label>
        {preview && (
          <div className="mb-2">
            <Image
              src={preview}
              alt="Preview"
              width={128}
              height={128}
              className="h-32 w-auto object-cover rounded"
              quality={80}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading
            ? "Menyimpan..."
            : editingProduct
            ? "Update"
            : "Tambah"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  )
}