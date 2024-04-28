// index.tsx

import { Redirect, router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { shadowStyle } from '#constants/styles'

import { useAuthStore, useInitStore } from '#store/useAuthStore'

export default function Home() {
  const { userInfo, personInfo, setUserInfo, setPersonInfo } = useAuthStore()
  const { isInit, setIsInit } = useInitStore()

  // dev temp Error
  if (isInit === true && Object.keys(userInfo || {}).length > 0) {
    setUserInfo(null)
    setPersonInfo(false)
  }

  // android deployment error ?
  // if (Object.keys(userInfo || {}).length > 0) setIsInit(false)

  if (isInit === true) {
    return <Redirect href="/onboard/1" />
  }

  if (Object.keys(userInfo || {}).length === 0)
    return <Redirect href="/login/" />

  // 로직 구현 필요
  if (personInfo === false) return <Redirect href="/login/person" />

  return (
    <PaperProvider>
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
            display: 'flex',
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            style={{ height: 70, width: 360, ...styles.container }}
            activeOpacity={1}
          >
            <Text style={{ fontSize: 17, fontWeight: '700' }}>크레딧 현황</Text>
            <Ionicons size={20} name="chevron-forward" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ height: 70, width: 360, ...styles.container }}
            activeOpacity={1}
          >
            <Text style={{ fontSize: 17, fontWeight: '700' }}>거래 현황</Text>
            <Ionicons size={20} name="chevron-forward" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ height: 300, width: 360, ...styles.container }}
            activeOpacity={1}
          >
            <Text style={{ fontSize: 17, fontWeight: '700' }}>temp</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            ...styles.container,
            height: 90,
            width: 360,
            position: 'relative',
            bottom: 0,
            padding: 0,
            marginBottom: 30,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={['#64BA7D', '#338874']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: 360,
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
    </PaperProvider>
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
