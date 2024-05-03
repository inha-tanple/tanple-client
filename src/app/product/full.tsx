/* eslint-disable react/no-unstable-nested-components */
// Favorite.tsx

import { Stack } from 'expo-router'

import { useState } from 'react'
import { Platform, Text, View } from 'react-native'
import { PaperProvider, Searchbar } from 'react-native-paper'

import { shadowStyle } from '#constants/styles'

export default function Favorite() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          top: Platform.OS === 'ios' ? 70 : 90,
        }}
      >
        <Stack.Screen
          options={{
            headerTitle: '전체 목록',
            headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
          }}
        />

        <Searchbar
          placeholder="검색어를 입력해 주세요"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            ...shadowStyle,
            width: 360,
            height: 45,
            marginBottom: 15,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
          inputStyle={{ alignSelf: 'center', color: 'black' }}
          placeholderTextColor="gray"
        />

        <View
          style={{
            ...shadowStyle,
            width: 360,
            height: 600,
            backgroundColor: 'white',
            borderRadius: 10,
            marginBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>aa</Text>
        </View>
      </View>
    </PaperProvider>
  )
}