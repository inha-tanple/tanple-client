/* eslint-disable react/jsx-pascal-case */
// Asset.tsx

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Coin from '#assets/images/coin.svg'
import GradientView from '#components/GradientView/GradientView'
import { defaultContainer } from '#constants/styles'
import {
  useFetchCredits,
  useFetchDateCredits,
} from '#store/server/useCreditsQueries'
import { getDate } from '#utils/getDate'

export default function Asset() {
  const { data } = useFetchCredits()
  const { data: dateCredits } = useFetchDateCredits(getDate())

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 15 }}>
      <GradientView style={{ marginBottom: 20 }}>
        <View
          style={{
            height: 100,
            padding: 20,
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() => router.push('/credit/history')}
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
            {dateCredits[0]?.balance.toLocaleString()}p
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
            onPress={() => router.push('/credit/money/donate')}
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
            onPress={() => router.push('/credit/money/')}
            style={styles.buttonStyle}
          >
            <Text style={{ fontSize: 18 }}>환전하기</Text>
          </TouchableOpacity>
        </View>
      </GradientView>

      <TouchableOpacity
        style={{
          ...defaultContainer,
          width: '90%',
          height: '15%',
          marginBottom: 20,
          justifyContent: 'flex-start',
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
            {new Date().getMonth() + 1}월에 적립한 크레딧
          </Text>
          <Text style={{ fontSize: 15, marginTop: 3 }}>
            {data?.thisMonthCredits.toLocaleString()}p
          </Text>
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
