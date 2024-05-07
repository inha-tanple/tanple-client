// Message.tsx

import { Stack, router } from 'expo-router'

import { TouchableOpacity, View, Text } from 'react-native'

import { useAuthStore, useInitStore } from '#store/client/useAuthStore'

export default function Message() {
  const { userInfo, personInfo, setUserInfo } = useAuthStore()
  const { isInit, setIsInit } = useInitStore()

  console.log(userInfo)
  console.log(isInit)
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

      <View>
        {userInfo ? <Text>{userInfo.email}</Text> : <Text>false</Text>}
        {personInfo ? <Text>true</Text> : <Text>false</Text>}
        {isInit ? <Text>true</Text> : <Text>false</Text>}
      </View>
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
      <TouchableOpacity
        onPress={() => {
          setIsInit(false)
          router.replace('/')
        }}
      >
        <Text>init-false</Text>
      </TouchableOpacity>
    </View>
  )
}
