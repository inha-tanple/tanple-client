/* eslint-disable react/jsx-props-no-spreading */
import { Tabs, router } from 'expo-router'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'

import LogoTitle from '#assets/logo'
import AnimeIcon from '#components/AnimeIcon/AnimeIcon'

export default function TabLayout() {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState(false)

  function MessageIcon() {
    return (
      <MaterialIcons
        onPress={() => router.navigate('/message/')}
        name={message ? 'mark-unread-chat-alt' : 'chat'}
        size={28}
        color="#C6C6C6"
        style={{ marginRight: 10 }}
      />
    )
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 75 : 75,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: Platform.OS === 'ios' ? 15 : 15,
          paddingTop: 5,
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
            <AnimeIcon>
              <Ionicons size={28} name="bag-handle" color={color} />
            </AnimeIcon>
          ),
          headerLeft: () => <LogoTitle size={16} />,
          headerRight: MessageIcon,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          headerTitle: '',
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <AnimeIcon>
              <Ionicons size={28} name="home" color={color} />
            </AnimeIcon>
          ),
          headerLeft: () => <LogoTitle size={16} />,
          headerRight: MessageIcon,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ),
        }}
      />
      <Tabs.Screen
        name="asset"
        options={{
          title: '자산',
          headerTitle: '',
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <AnimeIcon>
              <Ionicons size={28} name="card" color={color} />
            </AnimeIcon>
          ),
          headerLeft: () => <LogoTitle size={16} />,
          headerRight: MessageIcon,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ),
        }}
      />
    </Tabs>
  )
}
