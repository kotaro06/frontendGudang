"use client"
import { jenis_Product } from "@/types/jenisProduct"
import { deleteJenisProduct } from "@/lib/api"
import Image from "next/image"
import { useState } from "react"

const API_URL = "http://localhost:5000"

export default function ProductTable({
  products,
  onEdit,
  onDeleted,
}: {
  products: jenis_Product[]
  onEdit: (product: jenis_Product) => void
  onDeleted: () => void
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return
    try {
      await deleteJenisProduct(id)
      onDeleted()
    } catch (error) {
      console.error("Gagal menghapus produk:", error)
      alert("Gagal menghapus produk")
    }
  }

  const openImageModal = (imagePath: string) => {
    setSelectedImage(`${API_URL}/uploads/${imagePath}`)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="overflow-x-auto">
      {/* Modal untuk gambar besar */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button 
              className="absolute -top-10 right-0 text-white text-2xl"
              onClick={closeImageModal}
            >
              &times;
            </button>
            <div className="bg-white p-1 rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="Preview Gambar"
                width={800}
                height={600}
                className={`w-full h-auto max-h-[80vh] object-contain ${isLoading ? 'blur-sm' : 'blur-0'}`}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Gambar</th>
            <th className="px-4 py-2">Nama Produk</th>            
            <th className="px-4 py-2">Diskripsi</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.id}</td>
              <td className="px-4 py-2">
                {p.gambar && (
                  <div 
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => openImageModal(p.gambar!)}
                  >
                    <Image
                      src={`${API_URL}/uploads/${p.gambar}`}
                      alt={p.jns_produk}
                      width={64}
                      height={64}
                      priority
                      className="object-cover"
                    />
                    <span className="text-xs text-blue-500 block mt-1">Klik untuk memperbesar</span>
                  </div>
                )}
              </td>
              <td className="px-4 py-2">{p.jns_produk}</td>              
              <td className="px-4 py-2">{p.diskripsi}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(p)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}