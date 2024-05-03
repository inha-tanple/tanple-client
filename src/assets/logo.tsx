// LogoTitle.tsx

import { router } from 'expo-router'

import { Text, TouchableOpacity } from 'react-native'

import Logo from '#assets/images/carbon-logo.svg'

export default function LogoTitle({ size }: { size: number }) {
  return (
    <TouchableOpacity
      onPress={() => router.navigate('/home')}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
      }}
      activeOpacity={1}
    >
      <Logo style={{ marginLeft: 10 }} />
      <Text style={{ fontSize: size, fontWeight: 'bold', marginLeft: 5 }}>
        {' '}
        Tanple
      </Text>
    </TouchableOpacity>
  )
}
