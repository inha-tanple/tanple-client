/* eslint-disable no-unused-vars */
// useProductStore.ts

import { create } from 'zustand'

import { ProductType } from '#constants/types'

interface ProductState {
  selectedProducts: ProductType[]
  toggleProduct: (product: ProductType) => void
  resetProduct: () => void
}

const useProductStore = create<ProductState>((set) => ({
  selectedProducts: [],
  toggleProduct: (product: ProductType) =>
    set((state) => {
      const selectedBarcodes = new Set(
        state.selectedProducts.map((p) => p.barcode),
      )
      if (selectedBarcodes.has(product.barcode)) {
        return {
          selectedProducts: state.selectedProducts.filter(
            (p) => p.barcode !== product.barcode,
          ),
        }
      }
      return { selectedProducts: [...state.selectedProducts, product] }
    }),
  resetProduct: () => set({ selectedProducts: [] }),
}))

export default useProductStore
