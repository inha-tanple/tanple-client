import { Stack } from 'expo-router'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          title: '홈',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  )
}
