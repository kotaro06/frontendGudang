"use client";

import React, { useState, useEffect } from "react";
import ProductForm from "@/components/ProductForm";
import ProductTable from "@/components/ProductTable";
import { jenis_Product } from "@/types/jenisProduct";
import { fetchJenisProducts } from "@/lib/api";

export default function HomePage() {
  const [products, setProducts] = useState<jenis_Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<jenis_Product | undefined>(undefined)

  const loadData = async () => {
    setLoading(true)
    const data = await fetchJenisProducts()
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <main className="p-6 max-w-2xl mx-auto">
       <ProductForm
        editingProduct={editingProduct}
        onSuccess={loadData}
        onFinishEdit={() => setEditingProduct(undefined)}
      />
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <ProductTable
          products={products}
          onEdit={setEditingProduct}
          onDeleted={loadData}
        />
      )}
      
    </main>
  )
}
