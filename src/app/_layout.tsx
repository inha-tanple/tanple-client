import { Stack } from 'expo-router'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'

export default function AppLayout() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              title: '홈',
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="product/goods"
              options={{
                presentation: 'modal',
                headerShown: true,
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="product/foods"
              options={{
                presentation: 'modal',
                headerShown: true,
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="product/full"
              options={{
                presentation: 'modal',
                headerShown: true,
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="product/detail/[barcode]"
              options={{
                presentation: 'modal',
                headerShown: true,
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="webview/[keyword]"
              options={{
                presentation: 'modal',
                headerShown: Platform.OS !== 'ios',
              }}
            />
            <Stack.Screen
              name="credit/detail/[id]"
              options={{
                presentation: 'modal',
                headerShown: Platform.OS !== 'ios',
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </PaperProvider>
    </QueryClientProvider>
  )
}
