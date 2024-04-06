// index.tsx

import { Link, Redirect } from 'expo-router'

import { TouchableOpacity, View, Text } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import useAuthStore from '#store/useAuthStore'

export default function Home() {
  const { userInfo, setUserInfo } = useAuthStore()

  if (Object.keys(userInfo || {}).length === 0)
    return <Redirect href="/login/" />

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
      </View>
    </PaperProvider>
  )
}
