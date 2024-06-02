/* eslint-disable import/prefer-default-export */

// useProductQueries.ts

import { SERVER_URL } from '@env'
import { useQuery } from '@tanstack/react-query'

const fetchProducts = async () => {
  const response = await fetch(`${SERVER_URL}/v1/products`)
  if (!response.ok) {
    console.log(response.ok)
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const useFetchProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}

const fetchProduct = async (barcode: string) => {
  const response = await fetch(`${SERVER_URL}/v1/products/${barcode}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const useFetchProduct = (barcode: string) => {
  return useQuery({
    queryKey: ['product', barcode],
    queryFn: () => fetchProduct(barcode),
  })
}

export { useFetchProducts, useFetchProduct }
