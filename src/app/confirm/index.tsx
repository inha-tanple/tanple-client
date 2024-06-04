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
import { shadowStyle } from '#constants/styles'
import { ProductType } from '#constants/types'
import {
  useProductStore,
  useSelectedProduct,
} from '#store/client/useProductStore'

const screenHeight = Dimensions.get('window').height

export default function Product() {
  const [searchQuery, setSearchQuery] = useState('')
  const { products } = useProductStore()
  const [items, setItems] = useState(products)
  const { selectedProducts, toggleProduct, resetProduct } = useSelectedProduct()
  const { colors } = useTheme()

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const sortedItems = [
      ...filtered.filter((product) =>
        selectedProducts.some(
          (selected) => selected.productBarcode === product.productBarcode,
        ),
      ),
      ...filtered.filter(
        (product) =>
          !selectedProducts.some(
            (selected) => selected.productBarcode === product.productBarcode,
          ),
      ),
    ]
    setItems(sortedItems)
  }, [searchQuery, products, selectedProducts])

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
            <Text
              style={{ fontSize: 14, marginBottom: 5, color: colors.darkGray }}
            >
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
            <Text
              style={{ fontSize: 14, marginBottom: 5, color: colors.darkGray }}
            >
              적립률
            </Text>
            <Text style={{ fontSize: 15, marginBottom: 5 }}>
              {item.earningRate * 100}%
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: colors.lightGray,
              marginVertical: 2,
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
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
            onPress={resetProduct}
            text="선택 초기화"
            color={colors.darkGray}
            style={{ marginRight: 10, flexGrow: 1 }}
          />
          <MyButton
            onPress={() => router.push('/product/full')}
            text="전체 목록"
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
              아래의 업로드하기 버튼을 클릭해 주세요
            </Text>
          )}
          {items.length > 0 && (
            <FlatList
              data={items}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.productBarcode.toString()}
              contentContainerStyle={styles.productList}
              style={{ width: '100%' }}
            />
          )}
        </View>
      </View>
      <MyButton
        onPress={() => router.push('/confirm/image')}
        text={`${selectedProducts.length}개의 물품 선택하기`}
        disabled={selectedProducts.length === 0}
        style={{
          width: 200,
          shadowOpacity: 0.5,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 100,
        }}
      />
    </>
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
