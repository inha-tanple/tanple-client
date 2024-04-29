/* eslint-disable react/no-unstable-nested-components */
import { Stack, router, useLocalSearchParams } from 'expo-router'

import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { WebView } from 'react-native-webview'

export default function WebViewScreen() {
  const { keyword } = useLocalSearchParams()
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: keyword as string,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: '600',
          },
          headerTitleAlign: 'center',
        }}
      />
      {/* <TouchableOpacity
        onPress={() => router.back()}
        style={{
          padding: Platform.OS === 'ios' ? 15 : 40,
          alignItems: 'center',
          top: 30,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: '600' }}>돌아가기</Text>
      </TouchableOpacity> */}
      <WebView
        source={{ uri: `https://www.google.com/search?q=${keyword}` }}
        style={{ flex: 1 }}
      />
    </View>
  )
}
