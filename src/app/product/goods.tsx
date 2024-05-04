/* eslint-disable react/no-unstable-nested-components */
// Goods.tsx

import { Stack } from 'expo-router'

import { useState } from 'react'
import { Dimensions, Platform, Text, View } from 'react-native'
import { PaperProvider, Searchbar } from 'react-native-paper'

import { shadowStyle } from '#constants/styles'

const screenHeight = Dimensions.get('window').height

export default function Goods() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          top:
            Platform.OS === 'ios' ? screenHeight * 0.09 : screenHeight * 0.13,
        }}
      >
        <Stack.Screen
          options={{
            headerTitle: '친환경물품',
            headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
          }}
        />

        <Searchbar
          placeholder="검색어를 입력해 주세요"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            ...shadowStyle,
            width: '90%',
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
            width: '90%',
            height:
              Platform.OS === 'ios' ? screenHeight * 0.7 : screenHeight * 0.8,
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
