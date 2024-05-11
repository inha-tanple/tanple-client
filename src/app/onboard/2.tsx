// onboard2.tsx

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { useRef } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'

import Exchange from '#assets/anime/exchange.json'
import BlurView from '#components/BlurView/BlurView'

export default function Onboard2() {
  const animation = useRef(null)
  return (
    <BlurView
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 140,
          marginBottom: 50,
        }}
      >
        <Text
          style={{
            width: '70%',
            textAlign: 'center',
            fontSize: 23,
            fontWeight: 'bold',
            marginBottom: 35,
          }}
        >
          발급 받은 크레딧 활용하기
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: '#808080',
            textAlign: 'center',
            width: '70%',
          }}
        >
          발급 받은 크레딧으로 환전, 거래, 기부등의 행위를 할 수 있어요
        </Text>
      </View>

      <LottieView
        ref={animation}
        style={{
          width: '70%',
          height: '30%',
          marginBottom: 50,
        }}
        source={Exchange}
        autoPlay
      />

      <View
        style={{
          position: 'absolute',
          bottom: 230,
          flexDirection: 'row',
          width: '75%',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back()
          }}
          style={{ flexDirection: 'row' }}
        >
          <Ionicons size={20} name="chevron-back" />
          <Text style={{ marginTop: 3 }}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push('/onboard/3')
          }}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={{ marginBottom: Platform.OS === 'ios' ? 0 : 3 }}>
            다음
          </Text>
          <Ionicons size={20} name="chevron-forward" />
        </TouchableOpacity>
      </View>
    </BlurView>
  )
}
