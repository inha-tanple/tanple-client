// Success.tsx

import { router } from 'expo-router'

import LottieView from 'lottie-react-native'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import SuccessAneme from '#assets/anime/success.json'

export default function Success() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 30,
      }}
    >
      <LottieView
        style={{
          width: 60,
          height: 60,
          marginBottom: 20,
        }}
        source={SuccessAneme}
        autoPlay
        loop={false}
      />
      <Text style={{ fontSize: 30, fontWeight: '800', marginBottom: 20 }}>
        제출 성공
      </Text>
      <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 7 }}>
        심사까지는 2주 정도의 기간이 소요되요
      </Text>
      <Text style={{ fontSize: 15, fontWeight: '600' }}>
        크레딧 이용 현황에서 세부정보를 확인할 수 있어요!
      </Text>
      <Button
        onPress={() => router.replace('/home')}
        mode="contained"
        buttonColor="#5DB476"
        style={{
          position: 'absolute',
          bottom: 200,
          width: 250,
          height: 45,
          borderWidth: 0.2,
          borderColor: '#49A66D',
          borderRadius: 20,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        홈으로
      </Button>
    </View>
  )
}
