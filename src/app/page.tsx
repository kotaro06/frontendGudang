// src/app/page.tsx
import ProductTable from "@/components/ProductTable"
import { fetchProducts } from "@/lib/api"

export default async function HomePage() {
  const products = await fetchProducts()

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Daftar Produk Gudang</h1>
      <ProductTable products={products} />
    </main>
  )
}
