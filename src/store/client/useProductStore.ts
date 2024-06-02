/* eslint-disable no-unused-vars */

// useProductStore.ts

import { create } from 'zustand'

import { ProductType } from '#constants/types'

import storage from '#store/storage'

interface SelectedState {
  selectedProducts: ProductType[]
  toggleProduct: (product: ProductType) => void
  resetProduct: () => void
}

const useSelectedProduct = create<SelectedState>((set) => ({
  selectedProducts: [],
  toggleProduct: (product: ProductType) =>
    set((state) => {
      const selectedBarcodes = new Set(
        state.selectedProducts.map((p) => p.productBarcode),
      )
      if (selectedBarcodes.has(product.productBarcode)) {
        return {
          selectedProducts: state.selectedProducts.filter(
            (p) => p.productBarcode !== product.productBarcode,
          ),
        }
      }
      return { selectedProducts: [...state.selectedProducts, product] }
    }),
  resetProduct: () => set({ selectedProducts: [] }),
}))

interface ProductState {
  products: ProductType[]
  setProducts: (products: ProductType[]) => void
  loadProductsFromStorage: () => void
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  loadProductsFromStorage: () => {
    const storedProducts = storage.getString('products')
    if (storedProducts) {
      set({ products: JSON.parse(storedProducts) })
    }
  },
}))

export { useProductStore, useSelectedProduct }
