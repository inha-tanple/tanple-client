// Fail.tsx

import { router } from 'expo-router'

import { Text, View } from 'react-native'

import MyButton from '#components/MyButton/MyButton'

export default function Fail() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: '800', marginBottom: 20 }}>
        제출 실패
      </Text>
      <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 7 }}>
        제출에 실패했어요
      </Text>
      <Text style={{ fontSize: 15, fontWeight: '600' }}>
        다시 시도해 보거나 문의해 주세요
      </Text>
      <MyButton
        onPress={() => router.back()}
        text="돌아가기"
        style={{
          position: 'absolute',
          bottom: 200,
          width: 250,
          borderRadius: 20,
        }}
      />
    </View>
  )
}
