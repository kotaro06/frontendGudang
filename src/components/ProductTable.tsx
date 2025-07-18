// src/components/ProductTable.tsx
import { Jns_Product } from "@/types/JnsProduct"

type Props = {
  products: Jns_Product[]
}

export default function ProductTable({ products }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Jenis Produk</th>           
            <th className="px-4 py-2">Diskripsi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.id}</td>
              <td className="px-4 py-2">{p.jns_produk}</td>             
              <td className="px-4 py-2">{p.diskripsi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
