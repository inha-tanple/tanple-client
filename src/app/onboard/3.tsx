// onboard3.tsx

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'

import Trade from '#assets/anime/trade.json'

export default function Onboard3() {
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
          width: '100%',
          marginTop: 140,
          marginBottom: 70,
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
          거래하기
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: '#808080',
            textAlign: 'center',
            width: '70%',
          }}
        >
          거래하기
        </Text>
      </View>

      <LottieView
        style={{
          width: '70%',
          height: '30%',
          marginBottom: 50,
        }}
        source={Trade}
        autoPlay
      />

      <View
        style={{
          position: 'absolute',
          bottom: 230,
          flexDirection: 'row',
          width: '75%',
          justifyContent: 'flex-start',
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
      </View>

      <View style={styles.buttonConT}>
        <Button
          onPress={() => router.replace('/login/')}
          mode="contained"
          buttonColor="#5DB476"
          style={{
            height: 45,
            borderWidth: 0.2,
            borderColor: '#49A66D',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          로그인 하기
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonConT: {
    position: 'absolute',
    bottom: 150,
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    gap: 15,
    marginTop: 20,
  },
})
