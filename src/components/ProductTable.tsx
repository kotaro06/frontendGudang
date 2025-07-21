"use client"
import { jenis_Product } from "@/types/jenisProduct"
import { deleteJenisProduct } from "@/lib/api"

export default function ProductTable({
  products,
  onEdit,
  onDeleted,
}: {
  products: jenis_Product[]
  onEdit: (product: jenis_Product) => void
  onDeleted: () => void
}) {
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return
    await deleteJenisProduct(id)
    onDeleted()
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nama Produk</th>            
            <th className="px-4 py-2">Diskripsi</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.id}</td>
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
