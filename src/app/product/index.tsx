/* eslint-disable react/no-unstable-nested-components */
// Product.tsx

import { Stack, router } from 'expo-router'

import { useTheme } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native'
import { Searchbar } from 'react-native-paper'

import MyButton from '#components/MyButton/MyButton'
import products from '#constants/dummy'
import { shadowStyle } from '#constants/styles'
import { ProductType } from '#constants/types'

const screenHeight = Dimensions.get('window').height

export default function Product() {
  const [searchQuery, setSearchQuery] = useState('')
  const [items, setItems] = useState(products)
  const { colors } = useTheme()

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setItems(filtered)
  }, [searchQuery])

  const renderProductItem = ({ item }: { item: ProductType }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/product/detail/[barcode]',
          params: { barcode: item.barcode },
        })
      }}
    >
      <View style={{ marginBottom: 15 }}>
        <Text style={styles.productName}>{item.productName}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, marginBottom: 5, color: '#808080' }}>
            가격
          </Text>
          <Text style={{ fontSize: 15, marginBottom: 5 }}>{item.price}원</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, marginBottom: 5, color: '#808080' }}>
            적립률
          </Text>
          <Text style={{ fontSize: 15, marginBottom: 5 }}>{item.taxRate}</Text>
        </View>
        <View
          style={{ height: 1, backgroundColor: '#EAEAEA', marginVertical: 2 }}
        />
      </View>
    </TouchableOpacity>
  )

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        top: screenHeight * 0.13,
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

      <View style={{ flexDirection: 'row', marginBottom: 15, width: '90%' }}>
        <MyButton
          onPress={() => router.push('/product/goods')}
          text="물품 목록"
          style={{ marginRight: 10, flexGrow: 1 }}
        />
        <MyButton
          onPress={() => router.push('/product/foods')}
          text="농산물 목록"
          color={colors.secondary}
          style={{ marginLeft: 10, flexGrow: 1 }}
        />
      </View>

      <View
        style={{
          ...shadowStyle,
          width: '90%',
          height:
            Platform.OS === 'ios' ? screenHeight * 0.68 : screenHeight * 0.73,
          backgroundColor: 'white',
          borderRadius: 10,
          marginBottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {items.length <= 0 && (
          <Text style={{ color: colors.darkGray }}>
            즐겨찾기 물품을 추가해 주세요
          </Text>
        )}
        {items.length > 0 && (
          <FlatList
            data={items}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.barcode}
            contentContainerStyle={styles.productList}
            style={{ width: '100%' }}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    ...shadowStyle,
    height: 45,
    width: 160,
    borderWidth: 0.2,
    borderRadius: 10,
    flexGrow: 1,
    justifyContent: 'center',
  },
  productList: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'flex-start',
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
})
