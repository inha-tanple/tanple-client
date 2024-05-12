// index.tsx

import { Redirect, router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

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
          height: '60%',
          display: 'flex',
          alignItems: 'center',
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/credit/history')}
          style={{ height: '18%', width: '90%', ...styles.container }}
          activeOpacity={1}
        >
          <Text style={{ fontSize: 17, fontWeight: '700' }}>크레딧 현황</Text>
          <Ionicons size={20} name="chevron-forward" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ height: '18%', width: '90%', ...styles.container }}
          activeOpacity={1}
        >
          <Text style={{ fontSize: 17, fontWeight: '700' }}>거래 현황</Text>
          <Ionicons size={20} name="chevron-forward" />
        </TouchableOpacity>
      </View>

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
          <LinearGradient
            colors={['#64BA7D', '#338874']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
            }}
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
          </LinearGradient>
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
