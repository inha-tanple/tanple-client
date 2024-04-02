// Message.tsx

import { Stack } from 'expo-router'

import { PaperProvider, Text } from 'react-native-paper'

export default function Message() {
  return (
    <PaperProvider>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Text>Message</Text>
    </PaperProvider>
  )
}
