// Trade.tsx

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import GradientView from '#components/GradientView/GradientView'
import { defaultContainer } from '#constants/styles'

const { width } = Dimensions.get('window')
const boxSize = width * 0.4

const recentTrades = [
  { id: 1, title: 'kau24', type: '매수', amount: '10주', price: '78,800원' },
  { id: 2, title: 'kau31', type: '매도', amount: '5주', price: '84,200원' },
  { id: 3, title: 'kau58', type: '매수', amount: '20주', price: '64,200원' },
]

export default function Trade() {
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <TouchableOpacity
        onPress={() => router.push('/finance/hold')}
        style={{
          ...defaultContainer,
          width: '100%',
          height: width * 0.35,
          backgroundColor: '#6A6E7C',
          alignItems: 'flex-start',
          marginBottom: 20,
          padding: 25,
        }}
        activeOpacity={1}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>
            전체 순자산
          </Text>
          <Ionicons
            size={20}
            name="chevron-forward"
            style={{ color: 'white', alignSelf: 'center' }}
          />
        </View>

        <Text
          style={{
            alignSelf: 'flex-end',
            color: 'white',
            fontSize: 22,
            fontWeight: '700',
          }}
        >
          140,800원
        </Text>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <GradientView
          colors={['#178E9E', '#766CAE']}
          style={{
            width: boxSize,
            height: boxSize,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push('/finance/stock/')}
            activeOpacity={1}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              시세 조회
            </Text>
          </TouchableOpacity>
        </GradientView>
        <GradientView
          colors={['#FF927C', '#DF7B91']}
          style={{
            width: boxSize,
            height: boxSize,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push('/finance/stock/favorite')}
            activeOpacity={1}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              관심 목록
            </Text>
          </TouchableOpacity>
        </GradientView>
      </View>

      <View style={{ width: '100%', marginVertical: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 10 }}>
          최근 거래 목록
        </Text>
        <ScrollView style={{ maxHeight: 'auto' }}>
          {recentTrades.map((trade) => (
            <View
              key={trade.id}
              style={{
                ...defaultContainer,
                padding: 15,
                marginBottom: 10,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>
                  {trade.title}
                </Text>
                <Text style={{ fontSize: 14, color: '#555' }}>
                  {trade.type} {trade.amount}
                </Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
                {trade.price}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
