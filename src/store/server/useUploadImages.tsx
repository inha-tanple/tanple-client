/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */

// useUploadImages.tsx

import { SERVER_URL } from '@env'
import { useMutation } from '@tanstack/react-query'
import * as ImageManipulator from 'expo-image-manipulator'

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

const convertToJpeg = async (uri: string): Promise<string> => {
  const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
    compress: 0.5,
    format: ImageManipulator.SaveFormat.JPEG,
  })
  return manipResult.uri
}

const uploadImages = async ({ selectedProducts, images }: UploadImagesType) => {
  const formData = new FormData()
  const barcodes = selectedProducts.map((product) => product.barcode).join(', ')
  formData.append('barcodes', barcodes)

  for (const image of images) {
    const jpegUri = await convertToJpeg(image.uri)
    formData.append('photos', {
      uri: jpegUri,
      name: image.name,
      type: 'image/jpeg',
    } as any)
  }

  const response = await fetch(`${SERVER_URL}/v1/photos`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

  return response
}

const useUploadImages = () => {
  const mutation = useMutation({
    mutationFn: uploadImages,
    gcTime: 0,
  })

  return mutation
}

export default useUploadImages
