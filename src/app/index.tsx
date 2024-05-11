/* eslint-disable no-restricted-exports */
/* eslint-disable import/export */
// index.tsx

import { useRouter } from 'expo-router'

import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ProgressBar } from 'react-native-paper'

import Logo from '#assets/images/carbon-load.svg'

export default function App() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 1) {
          clearInterval(timer)
          return 1
        }
        return prevProgress + 0.1
      })
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (progress >= 1) {
      router.replace('/home')
    }
  }, [progress])

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
          데이터을 불러오는 중...
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
