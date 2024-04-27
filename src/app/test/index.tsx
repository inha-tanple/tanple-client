// Test.tsx

import { Stack } from 'expo-router'

import { Text, View } from 'react-native'

export default function Test() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Text>Test</Text>
    </View>
  )
}
