/* eslint-disable import/no-unresolved */
import { router } from 'expo-router'

import { SERVER_URL } from '@env'

interface ImageInfo {
  uri: string
  name: string
  size: number
  mimeType: string
}

const uploadImages = async (images: ImageInfo[]) => {
  const formData = new FormData()

  images.forEach((image) => {
    const blob = new Blob([image.uri], { type: image.mimeType })
    formData.append('images', blob, image.name)
  })

  try {
    const response = await fetch(`${SERVER_URL}/api/v1/image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      console.log('이미지 업로드 성공:', result)
      router.push('/request/success')
    } else {
      console.error('이미지 업로드 실패:', response.status)
      router.push('/request/fail')
    }
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error)
    router.push('/request/fail')
  }
}

export default uploadImages
