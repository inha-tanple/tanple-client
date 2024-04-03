/* eslint-disable react/no-unstable-nested-components */
import { Redirect, Tabs, router } from 'expo-router'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Platform } from 'react-native'

import LogoTitle from '#assets/logo'

import useAuthStore from '#store/useAuthStore'

export default function TabLayout() {
  const { isAuth } = useAuthStore()
  if (!isAuth) return <Redirect href="/login/" />

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState(false)

  function MessageIcon() {
    return (
      <MaterialIcons
        name={message ? 'mark-unread-chat-alt' : 'chat'}
        size={28}
        color="#C6C6C6"
        style={{ marginRight: 10 }}
        onPress={() => router.navigate('/message/')}
      />
    )
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 75 : 60,
          borderRadius: 20,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="trade"
        options={{
          title: '거래',
          headerTitle: '',
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            // <Ionicons size={28} name="bag-handle-outline" color={color} />
            <Ionicons size={28} name="bag-handle" color={color} />
          ),
          headerLeft: () => <LogoTitle size={16} />,
          headerRight: MessageIcon,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          headerTitle: '',
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
          headerLeft: () => <LogoTitle size={16} />,
          headerRight: MessageIcon,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: '메뉴',
          headerTitle: '',
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="menu" color={color} />
          ),
          headerLeft: () => <LogoTitle size={16} />,
          headerRight: MessageIcon,
        }}
      />
    </Tabs>
  )
}
