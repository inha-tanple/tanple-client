// onboard2.tsx

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { useRef } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Exchange from '#assets/anime/exchange.json'

export default function Onboard2() {
  const animation = useRef(null)
  return (
    <View
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
          marginTop: 140,
          marginBottom: 50,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 23,
            fontWeight: 'bold',
            width: 270,
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
            width: 270,
          }}
        >
          발급 받은 크레딧으로 환전, 거래, 기부등의 행위를 할 수 있어요
        </Text>
      </View>

      <LottieView
        ref={animation}
        style={{
          width: 250,
          height: 250,
          marginBottom: 50,
        }}
        // source={Trade}
        source={Exchange}
        autoPlay
      />

      <View
        style={{
          position: 'absolute',
          bottom: 230,
          flexDirection: 'row',
          width: 300,
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
          style={{ flexDirection: 'row' }}
        >
          <Text style={{ marginTop: 3 }}>다음</Text>
          <Ionicons size={20} name="chevron-forward" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
