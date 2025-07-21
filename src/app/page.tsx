"use client"

import { useEffect, useState } from "react"
import ProductForm from "@/components/ProductForm"
import ProductTable from "@/components/ProductTable"
import { fetchProducts } from "@/lib/api"
import { Jns_Product } from "@/types/JnsProduct"

export default function HomePage() {
  const [Jns_Product, setProducts] = useState<Jns_Product[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    const data = await fetchProducts()
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <ProductForm onSuccess={loadData} />
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <ProductTable products={Jns_Product} />
      )}
    </main>
  )
}
