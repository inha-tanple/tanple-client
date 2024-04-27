// index.tsx

import { Redirect } from 'expo-router'

import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'

import { useAuthStore, useInitStore } from '#store/useAuthStore'

export default function Home() {
  const { userInfo, personInfo, setUserInfo, setPersonInfo } = useAuthStore()
  const { isInit } = useInitStore()

  // dev temp Error
  if (isInit === true && Object.keys(userInfo || {}).length > 0) {
    setUserInfo(null)
    setPersonInfo(false)
  }

  if (isInit === true) {
    return <Redirect href="/onboard/1" />
  }

  if (Object.keys(userInfo || {}).length === 0)
    return <Redirect href="/login/" />

  // 로직 구현 필요
  if (personInfo === false) return <Redirect href="/login/person" />

  return (
    <PaperProvider>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            height: 70,
            width: 360,
            borderRadius: 20,
            margin: 15,
            padding: 20,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text>aa</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  )
}
