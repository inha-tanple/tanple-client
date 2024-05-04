/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/no-unstable-nested-components */
// Asset.tsx

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import Coin from '#assets/images/coin.svg'
import { shadowStyle } from '#constants/styles'

export default function Asset() {
  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 15,
        }}
      >
        <LinearGradient
          colors={['#64BA7D', '#338874']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            ...shadowStyle,
            width: '90%',
            height: 150,
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              height: 100,
              padding: 20,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => router.push('/credit/')}
              style={{ flexDirection: 'row', paddingBottom: 10 }}
              activeOpacity={1}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '600',
                }}
              >
                총 보유 크레딧
              </Text>
              <Ionicons
                size={20}
                name="chevron-forward"
                style={{ color: 'white', alignSelf: 'center' }}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '600',
                textAlign: 'right',
              }}
            >
              10,000p
            </Text>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 45,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <TouchableOpacity
              // onPress={() => router.push('/product/')}
              style={styles.buttonStyle}
            >
              <Text style={{ fontSize: 18 }}>기부하기</Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: '70%',
                backgroundColor: '#808080',
                alignSelf: 'center',
              }}
            />
            <TouchableOpacity
              // onPress={() => router.push('/confirm/')}
              style={styles.buttonStyle}
            >
              <Text style={{ fontSize: 18 }}>환전하기</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={{
            ...shadowStyle,
            width: '90%',
            height: '15%',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 15,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPress={() => router.push('/credit/analysis')}
        >
          {/* <LottieView
            style={{
              width: 60,
              height: 60,
              marginRight: 10,
            }}
            source={Coin}
            autoPlay
          /> */}
          <Coin style={{ marginRight: 15 }} />
          <View>
            <Text style={{ fontSize: 13, color: '#808080', marginBottom: 3 }}>
              5월에 적립한 크레딧
            </Text>
            <Text style={{ fontSize: 15, marginTop: 3 }}>2,000p</Text>
          </View>
          <Ionicons
            size={20}
            name="chevron-forward"
            style={{
              color: '#808080',
              alignSelf: 'center',
              position: 'absolute',
              right: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: '50%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
