// Foods.tsx

import { Stack, router } from 'expo-router'

import { useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Searchbar } from 'react-native-paper'

import { shadowStyle } from '#constants/styles'
import { ProductType } from '#constants/types'
import { useProductStore } from '#store/client/useProductStore'

const screenHeight = Dimensions.get('window').height

export default function Foods() {
  const [searchQuery, setSearchQuery] = useState('')
  const { products } = useProductStore()
  const filteredProducts = products.filter((product) =>
    product.certificationCategory.includes('농산물'),
  )
  const [items, setItems] = useState(filteredProducts)

  useEffect(() => {
    const filtered = filteredProducts.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setItems(filtered)
  }, [searchQuery])

  const renderProductItem = ({ item }: { item: ProductType }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/product/detail/[barcode]',
          params: { barcode: item.productBarcode },
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
          <Text style={{ fontSize: 15, marginBottom: 5 }}>
            {item.earningRate * 100}%
          </Text>
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
        top: Platform.OS === 'ios' ? screenHeight * 0.09 : screenHeight * 0.13,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: '친환경 농산물',
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
        <FlatList
          data={items}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.productBarcode.toString()}
          contentContainerStyle={styles.productList}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
