import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: '홈',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
