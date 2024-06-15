import { Stack, router, useLocalSearchParams } from 'expo-router'

import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { WebView } from 'react-native-webview'

export default function WebViewScreen() {
  const { url } = useLocalSearchParams()

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 20,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>돌아가기</Text>
        </TouchableOpacity>
      ) : (
        <Stack.Screen
          options={{
            headerTitle: url as string,
            headerTitleStyle: {
              fontSize: 16,
              fontWeight: '600',
            },
            headerTitleAlign: 'center',
          }}
        />
      )}

      <WebView source={{ uri: url as string }} style={{ flex: 1 }} />
    </View>
  )
}
