// onboard3.tsx

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native'

import Trade from '#assets/anime/trade.json'
import BlurView from '#components/BlurView/BlurView'
import MyButton from '#components/MyButton/MyButton'

export default function Onboard3() {
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
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons size={20} name="chevron-back" />
          <Text style={{ marginBottom: Platform.OS === 'ios' ? 0 : 3 }}>
            이전
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonConT}>
        <MyButton
          onPress={() => router.replace('/login/')}
          text="시작하기"
          style={{
            width: '100%',
          }}
        />
      </View>
    </BlurView>
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
