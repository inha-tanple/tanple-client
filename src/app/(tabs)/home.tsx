// index.tsx

import { Redirect, router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import GradientView from '#components/GradientView/GradientView'
import MyCarousel from '#components/MyCarousel/MyCarousel'
import { shadowStyle } from '#constants/styles'
import { useAuthStore, useInitStore } from '#store/client/useAuthStore'
import { progressData } from 'app/credit/creditDummy'

export default function Home() {
  const { userInfo, personInfo, setUserInfo, setPersonInfo } = useAuthStore()
  const { isInit } = useInitStore()
  const isPendingData = Object.keys(progressData).length > 0

  // dev temp Error
  if (isInit === true && Object.keys(userInfo || {}).length > 0) {
    setUserInfo(null)
    setPersonInfo(false)
  }

  if (isInit === true) {
    return <Redirect href="/onboard/1" />
  }

  if (Object.keys(userInfo || {}).length === 0)
    return <Redirect href="/login/" />

  // 로직 구현 필요
  if (personInfo === false) return <Redirect href="/login/person" />

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <View
        style={{
          height: '27%',
          display: 'flex',
          alignItems: 'center',
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/credit/history')}
          style={{ height: '40%', width: '90%', ...styles.container }}
          activeOpacity={1}
        >
          <Text style={{ fontSize: 17, fontWeight: '700' }}>크레딧 현황</Text>
          <Ionicons size={20} name="chevron-forward" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ height: '40%', width: '90%', ...styles.container }}
          activeOpacity={1}
        >
          <Text style={{ fontSize: 17, fontWeight: '700' }}>거래 현황</Text>
          <Ionicons size={20} name="chevron-forward" />
        </TouchableOpacity>
      </View>

      <MyCarousel
        data={[
          {
            imageUrl: 'https://picsum.photos/seed/696/3000/2000',
            title: 'Item 1',
            content: 'This is the content for item 1',
          },
          {
            imageUrl:
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Item 2',
            content: 'This is the content for item 2',
          },
          {
            imageUrl:
              'https://previews.123rf.com/images/breakingdots/breakingdots2304/breakingdots230400781/202938341-%EA%B3%A0%EC%96%91%EC%9D%B4-%EA%B7%80%EC%97%AC%EC%9A%B4-%EC%BA%90%EB%A6%AD%ED%84%B0-%EB%A7%8C%ED%99%94-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4%EC%85%98.jpg',
            title: 'Item 3',
            content: 'This is the content for item 3',
          },
        ]}
        style={{ height: '92%' }}
      />

      <View style={{ height: '30%' }}>
        <TouchableOpacity
          onPress={() => {
            if (isPendingData) {
              router.push('/credit/progress')
            }
          }}
          style={{
            height: '40%',
            minWidth: '90%',
            ...styles.container,
            justifyContent: isPendingData ? 'space-between' : 'center',
          }}
          activeOpacity={1}
        >
          {isPendingData ? (
            <>
              <Text style={{ fontSize: 17, fontWeight: '700' }}>
                {progressData[0].detail}
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: '500', color: '#808080' }}
              >
                산정중
              </Text>
            </>
          ) : (
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              물품을 구매하고 크레딧을 적립해 볼 수 있어요
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            ...styles.container,
            height: '45%',
            width: '90%',
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <GradientView
            style={{ width: '100%', height: '100%', flexDirection: 'row' }}
          >
            <TouchableOpacity
              onPress={() => router.push('/product/')}
              style={{
                width: 180,
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={1}
            >
              <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
                물품 목록
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: '70%',
                backgroundColor: 'white',
                alignSelf: 'center',
              }}
            />
            <TouchableOpacity
              onPress={() => router.push('/confirm/')}
              style={{
                width: 180,
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={1}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: 'white',
                }}
              >
                인증하기
              </Text>
            </TouchableOpacity>
          </GradientView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...shadowStyle,
    borderRadius: 20,
    marginBottom: 15,
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
