// Trade.tsx

import { Text, View, Dimensions } from 'react-native'

import GradientView from '#components/GradientView/GradientView'

const { width } = Dimensions.get('window')
const boxSize = width * 0.4

export default function Trade() {
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 15 }}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <GradientView
          colors={['#FF9A8B', '#FF6A88']}
          style={{
            width: boxSize,
            height: boxSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Trade
          </Text>
        </GradientView>
        <GradientView
          colors={['#FE8C00', '#F83600']}
          style={{
            width: boxSize,
            height: boxSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Trade
          </Text>
        </GradientView>
      </View>

      <View
        style={{
          width: '90%',
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
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Trade
          </Text>
        </GradientView>
        <GradientView
          colors={['#FAD0C9', '#FFD1FF']}
          style={{
            width: boxSize,
            height: boxSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Trade
          </Text>
        </GradientView>
      </View>

      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <GradientView
          colors={['#3D7E9F', '#38E54D']}
          style={{
            width: boxSize,
            height: boxSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Trade
          </Text>
        </GradientView>
        <GradientView
          colors={['#0CEBEB', '#20E3B2']}
          style={{
            width: boxSize,
            height: boxSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Trade
          </Text>
        </GradientView>
      </View>
    </View>
  )
}
