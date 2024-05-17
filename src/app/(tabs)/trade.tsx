// Trade.tsx

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { Text, View, Dimensions, TouchableOpacity } from 'react-native'

import GradientView from '#components/GradientView/GradientView'
import { defaultContainer } from '#constants/styles'

const { width } = Dimensions.get('window')
const boxSize = width * 0.4

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
          colors={['#6B73FF', '#A857FF']}
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
          colors={['#FF9A8B', '#FF6A88']}
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
    </View>
  )
}
