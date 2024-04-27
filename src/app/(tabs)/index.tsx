// index.tsx

import { Link, Redirect } from 'expo-router'

import { TouchableOpacity, View, Text } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { useAuthStore, useInitStore } from '#store/useAuthStore'

export default function Home() {
  const { userInfo, personInfo, setUserInfo, setPersonInfo } = useAuthStore()
  const { isInit, setIsInit } = useInitStore()

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

  console.log('aaaaa', personInfo)
  if (personInfo === false) return <Redirect href="/login/person" />

  return (
    <PaperProvider>
      <View
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href="/test/">Go to Test</Link>
        <TouchableOpacity onPress={() => setUserInfo(null)}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsInit(true)}>
          <Text>init</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  )
}
