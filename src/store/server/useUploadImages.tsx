/* eslint-disable import/no-unresolved */
// useUploadImages.tsx

import { SERVER_URL } from '@env'
import { useMutation } from '@tanstack/react-query'

import { ProductType } from '#constants/types'

interface ImageInfo {
  uri: string
  name: string
  size: number
  mimeType: string
}

interface UploadImagesType {
  selectedProducts: ProductType[]
  images: ImageInfo[]
}

const uploadImages = async ({ selectedProducts, images }: UploadImagesType) => {
  const formData = new FormData()
  const barcodes = selectedProducts.map((product) => product.barcode)
  formData.append('barcodes', JSON.stringify(barcodes))

  images.forEach((image) => {
    const { uri, name, size, mimeType } = image
    const blob = new Blob([uri], { type: mimeType })
    formData.append('images', blob, name)
    formData.append('imageInfo', JSON.stringify({ name, size, mimeType }))
  })

  const response = await fetch(`${SERVER_URL}/api/v1/image`, {
    method: 'POST',
    body: formData,
  })

  return response.json()
}

const useUploadImages = () => {
  const mutation = useMutation({
    mutationFn: uploadImages,
    gcTime: 0,
  })

  return mutation
}

export default useUploadImages
