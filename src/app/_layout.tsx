import { Stack, router } from 'expo-router'

import { ThemeProvider, DefaultTheme } from '@react-navigation/native'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'

// export { default } from '../../.storybook'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5DB476',
    secondary: '#B3D567',
    lightGray: '#EAEAEA',
    darkGray: '#808080',
  },
}

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url
      if (url) {
        router.push(url)
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return
      }
      redirect(response?.notification)
    })

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification)
      },
    )

    return () => {
      isMounted = false
      subscription.remove()
    }
  }, [])
}

export default function AppLayout() {
  const queryClient = new QueryClient()
  useNotificationObserver()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={MyTheme}>
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
                name="webview/origin/[url]"
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
              <Stack.Screen
                name="finance/stock/detail/[stockName]"
                options={{
                  presentation: 'modal',
                  headerShown: true,
                  headerTransparent: true,
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
