// Full.tsx

import { Stack } from 'expo-router'

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
import {
  useProductStore,
  useSelectedProduct,
} from '#store/client/useProductStore'

const screenHeight = Dimensions.get('window').height

export default function Full() {
  const [searchQuery, setSearchQuery] = useState('')
  const { products } = useProductStore()
  const [items, setItems] = useState(products)
  const { selectedProducts, toggleProduct } = useSelectedProduct()

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setItems(filtered)
  }, [searchQuery])

  const renderProductItem = ({ item }: { item: ProductType }) => {
    const isSelected = selectedProducts.some(
      (product) => product.productBarcode === item.productBarcode,
    )

    return (
      <TouchableOpacity
        onPress={() => {
          toggleProduct(item)
        }}
        style={{ paddingHorizontal: 5, paddingBottom: 5 }}
      >
        <View
          style={[{ padding: 10 }, isSelected && styles.selectedProductItem]}
        >
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
            <Text style={{ fontSize: 15, marginBottom: 5 }}>
              {item.price}원
            </Text>
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
  }

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
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedProductItem: {
    backgroundColor: '#E0F2F1',
    borderWidth: 1,
    padding: 9,
    borderColor: '#808080',
    borderRadius: 10,
  },
})
