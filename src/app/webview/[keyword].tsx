import { router, useLocalSearchParams } from 'expo-router'

import { Text, TouchableOpacity, View } from 'react-native'
import { WebView } from 'react-native-webview'

export default function WebViewScreen() {
  const { keyword } = useLocalSearchParams()
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ padding: 15, alignItems: 'center' }}
      >
        <Text style={{ fontSize: 15, fontWeight: '600' }}>돌아가기</Text>
      </TouchableOpacity>
      <WebView
        source={{ uri: `https://www.google.com/search?q=${keyword}` }}
        style={{ flex: 1 }}
      />
    </View>
  )
}
