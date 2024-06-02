// [barcode].tsx

import { Stack, router, useLocalSearchParams } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native'

import Spinner from '#components/Spinner/Spinner'
import { useFetchProduct } from '#store/server/useProductQueries'

export default function DetailScreen() {
  const { barcode } = useLocalSearchParams()
  const {
    data: product,
    isLoading,
    isError,
  } = useFetchProduct(barcode as string)

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error fetching product details</Text>
      </View>
    )
  }

  if (!product) {
    return null
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Stack.Screen
        options={{
          headerTitle: product.productName,
          headerTitleStyle: {
            fontSize: 19,
            fontWeight: 'bold',
            color: '#ffffff',
          },
          headerStyle: {
            backgroundColor: '#819FB6',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                /* 즐겨찾기 버튼 동작 */
              }}
            >
              <Ionicons
                name="star"
                size={22}
                color="#ffffff"
                style={{ marginRight: 16, color: 'yellow' }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View
        style={{
          flex: 1,
          padding: 20,
          top: Platform.OS === 'ios' ? '8%' : '12%',
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>제품 정보</Text>

          <View style={styles.content}>
            <Text style={styles.contentTitle}>제조사:</Text>
            <Text>{product.company}</Text>
          </View>
          {product.businessRegistrationNumber && (
            <View style={styles.content}>
              <Text style={styles.contentTitle}>사업자 등록 번호:</Text>
              <Text>{product.businessRegistrationNumber}</Text>
            </View>
          )}
          <View style={{ ...styles.content, marginBottom: 0 }}>
            <Text style={styles.contentTitle}>카테고리:</Text>
            <Text>{product.certificationCategory}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>친환경 인증 정보</Text>

          <View style={styles.content}>
            <Text style={styles.contentTitle}>인증 시작일:</Text>
            <Text>{product.registerStartDate}</Text>
          </View>
          <View style={{ ...styles.content, marginBottom: 0 }}>
            <Text style={styles.contentTitle}>인증 종료일:</Text>
            <Text>{product.registerEndDate}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>가격 정보</Text>

          <View style={styles.content}>
            <Text style={styles.contentTitle}>가격:</Text>
            <Text>{product.price}원</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>적립크레딧:</Text>
            <Text>{product.earnedCredit}p</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>적립률:</Text>
            <Text>{product.earningRate * 100}%</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/webview/[keyword]',
              params: { keyword: product.productName },
            })
          }}
          style={{
            ...styles.container,
            backgroundColor: '#CBD8DA',
            padding: 15,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '600' }}>
            구글 검색 페이지로 이동
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#819FB6',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  contentTitle: { fontWeight: '600', color: 'black' },
})
