/* eslint-disable consistent-return */
/* eslint-disable no-restricted-exports */
/* eslint-disable import/export */

// index.tsx

import { useRouter } from 'expo-router'

import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ProgressBar } from 'react-native-paper'

import Logo from '#assets/images/carbon-load.svg'
import { useInitStore } from '#store/client/useAuthStore'
import { useProductStore } from '#store/client/useProductStore'
import { useFetchProducts } from '#store/server/useProductQueries'

import storage from '#store/storage'

export default function App() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const setProducts = useProductStore((state) => state.setProducts)
  const { data, isLoading, isSuccess } = useFetchProducts()
  const { isInit } = useInitStore()

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 0.9 ? prev + 0.1 : prev))
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess && data) {
      setProducts(data)
      storage.set('products', JSON.stringify(data))
      setProgress(1)
      setTimeout(() => {
        if (isInit === true) {
          router.replace('/onboard/1')
        }
        router.replace('/home')
      }, 100)
    }
  }, [isSuccess, data, setProducts, router])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Logo style={{ top: 4 }} />
      <View style={{ position: 'absolute', bottom: 150 }}>
        <Text style={{ marginBottom: 16, alignSelf: 'center' }}>
          {isLoading ? '로딩 중...' : '데이터를 가져오는 중...'}
        </Text>
        <ProgressBar
          progress={progress}
          color="#B3D567"
          style={{ width: 200, borderRadius: 10 }}
        />
      </View>
    </View>
  )
}
