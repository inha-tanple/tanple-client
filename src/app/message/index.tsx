/* eslint-disable no-unused-expressions */
// Message.tsx

import { Stack, router } from 'expo-router'

import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, View, Text, Button, Platform } from 'react-native'

import { useAuthStore, useInitStore } from '#store/client/useAuthStore'
import { useProgressDataStore } from '#store/client/useCreditStore'
import { useProductStore } from '#store/client/useProductStore'

import storage from '#store/storage'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function Message() {
  const { userInfo, personInfo, setUserInfo } = useAuthStore()
  const { isInit, setIsInit } = useInitStore()
  const { setProducts } = useProductStore()
  const { progressData, clearProgressData } = useProgressDataStore()

  const [expoPushToken, setExpoPushToken] = useState('')
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    [],
  )
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined)
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  console.log(userInfo)
  console.log(isInit)

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    )

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? []),
      )
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((content) => {
        setNotification(content)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        )
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  async function schedulePushNotification() {
    let body = ''
    if (progressData.length) {
      const count = progressData.length - 1
      const name = progressData[0].detail
      const points = progressData.reduce((acc, it) => acc + it.credit, 0)
      body =
        count > 0
          ? `${name} 외 ${count}건의 구매로 ${points}p 적립 되었습니다.`
          : `${name} 구매로 ${points}p 적립 되었습니다.`

      setTimeout(() => {
        clearProgressData()
      }, 6000)
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '물품 인증 완료!',
        body,
        data: { url: '/credit/history' },
      },
      trigger: { seconds: 6 },
    })
  }

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
      <TouchableOpacity
        onPress={() => {
          setProducts([])
          storage.delete('products')
          router.replace('/')
        }}
      >
        <Text>init-products</Text>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <Text>{`Channels: ${JSON.stringify(
          channels.map((c) => c.id),
          null,
          2,
        )}`}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            Title: {notification && notification.request.content.title}{' '}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{' '}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification()
          }}
        />
      </View>
    </View>
  )
}

async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!')
    return
  }
  // Learn more about projectId:
  // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  // EAS projectId is used here.
  try {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId
    if (!projectId) {
      throw new Error('Project ID not found')
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data
    console.log(token)
  } catch (e) {
    token = `${e}`
  }

  return token
}
