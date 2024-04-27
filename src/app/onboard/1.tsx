// onboard1.tsx

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Receipts from '#assets/anime/receipts.json'

export default function Onboard1() {
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
          marginTop: 120,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            display: 'flex',
            width: 270,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
            물품 목록을 확인하고
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            width: 270,
            marginBottom: 25,
          }}
        >
          <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
            크레딧을 발급 받기
          </Text>
        </View>

        <Text
          style={{
            fontSize: 13,
            color: '#808080',
            textAlign: 'center',
            width: 270,
          }}
        >
          구매 영수증을 찍어서 인증 받으면 크레딧을 발급 받을수 있어요
        </Text>
      </View>

      <LottieView
        style={{
          width: 250,
          height: 250,
          marginBottom: 50,
        }}
        source={Receipts}
        autoPlay
      />

      <View
        style={{
          position: 'absolute',
          bottom: 230,
          flexDirection: 'row',
          width: 300,
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push('/onboard/2')
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
