// Test.tsx

import { Stack } from 'expo-router'

import { Text, View } from 'react-native'

export default function Test() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        top: '13%',
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginRight: 220,
                }}
              >
                Text
              </Text>
            </View>
          ),
          headerTransparent: true,
        }}
      />
    </View>
  )
}
