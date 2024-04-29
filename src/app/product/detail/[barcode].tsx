/* eslint-disable react/no-unstable-nested-components */
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

export default function DetailScreen() {
  const { id } = useLocalSearchParams()

  const product = {
    barcode: id,
    company: '(주)삼양사',
    productName: '큐원 갈색설탕[15kg]',
    price: '25,800',
    taxNumber: '101-86-66838',
    taxIncludedPrice: '3,870',
    category: '저탄소제품',
    taxRate: '15.00%',
    startDate: '2024-04-01',
    endDate: '2025-08-29',
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
          top: Platform.OS === 'ios' ? 60 : 80,
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>제품 정보</Text>

          <View style={styles.content}>
            <Text style={styles.contentTitle}>제조사:</Text>
            <Text>{product.company}</Text>
          </View>
          {product.taxNumber && (
            <View style={styles.content}>
              <Text style={styles.contentTitle}>사업자 등록 번호:</Text>
              <Text>{product.taxNumber}</Text>
            </View>
          )}
          <View style={{ ...styles.content, marginBottom: 0 }}>
            <Text style={styles.contentTitle}>카테고리:</Text>
            <Text>{product.category}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>친환경 인증 정보</Text>

          <View style={styles.content}>
            <Text style={styles.contentTitle}>인증 시작일:</Text>
            <Text>{product.startDate}</Text>
          </View>
          <View style={{ ...styles.content, marginBottom: 0 }}>
            <Text style={styles.contentTitle}>인증 종료일:</Text>
            <Text>{product.endDate}</Text>
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
            <Text>{product.taxIncludedPrice}p</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>적립률:</Text>
            <Text>{product.taxRate}</Text>
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
