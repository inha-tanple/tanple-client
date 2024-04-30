/* eslint-disable react/no-unstable-nested-components */
// Product.tsx

import { Stack, router } from 'expo-router'

import { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Button, PaperProvider, Searchbar } from 'react-native-paper'

import products from '#constants/dummy'
import { shadowStyle } from '#constants/styles'
import { ProductType } from '#constants/types'

import useProductStore from '#store/useProductStore'

export default function Product() {
  const [searchQuery, setSearchQuery] = useState('')
  const [items, setItems] = useState(products)
  const { selectedProducts, toggleProduct, resetProduct } = useProductStore()

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setItems(filtered)
  }, [searchQuery])

  const renderProductItem = ({ item }: { item: ProductType }) => {
    const isSelected = selectedProducts.some(
      (product) => product.barcode === item.barcode,
    )

    return (
      <TouchableOpacity
        onPress={() => {
          toggleProduct(item)
        }}
        style={{ paddingHorizontal: 5, paddingBottom: 5 }}
      >
        <View
          style={[
            { padding: 10, borderRadius: 10 },
            isSelected && styles.selectedProductItem,
          ]}
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
              {item.taxRate}
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
    <PaperProvider>
      <Text
        style={{
          color: '#808080',
          top: Platform.OS === 'ios' ? 90 : 70,
          left: Platform.OS === 'ios' ? 51 : 73,
        }}
      >
        인증할 물품들을 선택해 주세요
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          top: Platform.OS === 'ios' ? 115 : 95,
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
                  인증 물품 선택하기
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
            width: 360,
            height: 45,
            marginBottom: 15,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
          inputStyle={{ alignSelf: 'center', color: 'black' }}
          placeholderTextColor="gray"
        />

        <View style={{ flexDirection: 'row', marginBottom: 15, width: 360 }}>
          <Button
            onPress={resetProduct}
            mode="contained"
            buttonColor="#808080"
            style={{
              ...shadowStyle,
              ...styles.buttonStyle,
              marginRight: 10,
            }}
          >
            선택 초기화
          </Button>
          <Button
            onPress={() => router.push('/product/favorite')}
            mode="contained"
            buttonColor="#B3D567"
            style={{
              ...shadowStyle,
              ...styles.buttonStyle,
              marginLeft: 10,
            }}
          >
            즐겨찾기 목록
          </Button>
        </View>

        <View
          style={{
            ...shadowStyle,
            width: 360,
            height: 530,
            backgroundColor: 'white',
            borderRadius: 10,
            marginBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {items.length <= 0 && (
            <Text style={{ color: '#808080' }}>
              아래의 업로드하기 버튼을 클릭해 주세요
            </Text>
          )}
          {items.length > 0 && (
            <FlatList
              data={items}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.barcode}
              contentContainerStyle={styles.productList}
            />
          )}
        </View>
      </View>
      <Button
        onPress={() => router.push('/confirm/image')}
        mode="contained"
        buttonColor="#5DB476"
        disabled={selectedProducts.length === 0}
        style={{
          ...styles.buttonStyle,
          shadowOpacity: 0.5,
          elevation: 4,
          width: 200,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 100,
        }}
      >
        {selectedProducts.length}개의 물품 선택하기
      </Button>
    </PaperProvider>
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
    width: 360,
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
  },
})
