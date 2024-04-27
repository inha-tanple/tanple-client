// Message.tsx

import { Stack, router } from 'expo-router'

import { TouchableOpacity, View, Text } from 'react-native'

import { useAuthStore, useInitStore } from '#store/useAuthStore'

export default function Message() {
  const { setUserInfo } = useAuthStore()
  const { setIsInit } = useInitStore()

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setUserInfo(null)
          router.replace('/')
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsInit(true)
          router.replace('/')
        }}
      >
        <Text>init</Text>
      </TouchableOpacity>
    </View>
  )
}
