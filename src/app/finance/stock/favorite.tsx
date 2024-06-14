// Favorite.tsx

import { Stack } from 'expo-router'

import { useState } from 'react'
import { Text, View, Platform, Dimensions } from 'react-native'
import { Searchbar } from 'react-native-paper'

import Table from '#components/Table/Table'
import { shadowStyle } from '#constants/styles'

import stocks from './stockDummy'

const { colorColumn, data } = stocks

const screenHeight = Dimensions.get('window').height

export default function Favorite() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = data.filter((stock) =>
    stock[0][0].toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', top: screenHeight * 0.13 }}>
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
                관심 목록
              </Text>
            </View>
          ),
          headerTransparent: true,
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
            Platform.OS === 'ios' ? screenHeight * 0.75 : screenHeight * 0.8,
          backgroundColor: 'white',
          borderRadius: 10,
          marginBottom: 30,
          padding: 5,
        }}
      >
        <Table
          tableHeaders={[['배출권명'], ['현재가'], ['대비'], ['등락률']]}
          tableData={filteredData}
          colorColumn={colorColumn}
          isLeftHead={false}
          headerStyle={{ paddingVertical: 13 }}
          dataStyle={{ paddingVertical: 15 }}
        />
      </View>
    </View>
  )
}
