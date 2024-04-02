// Main.tsx

import { Link } from 'expo-router'

import { View } from 'react-native'

export default function Main() {
  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link href="/test/">Go to Test</Link>
    </View>
  )
}
