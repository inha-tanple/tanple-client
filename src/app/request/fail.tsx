// Fail.tsx

import { router } from 'expo-router'

import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

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
      <Button
        onPress={() => router.back()}
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
        돌아가기
      </Button>
    </View>
  )
}
