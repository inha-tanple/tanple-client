// [stockName].tsx

import { Stack, router, useLocalSearchParams } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'

import { shadowStyle } from '#constants/styles'

export default function DetailScreen() {
  const { stockName } = useLocalSearchParams()

  console.log(stockName)
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Stack.Screen
        options={{
          headerTitle: stockName as string,
          headerTitleStyle: {
            fontSize: 19,
            fontWeight: 'bold',
            color: '#ffffff',
          },
          headerStyle: {
            backgroundColor: '#3BBB71',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                /* 즐겨찾기 버튼 동작 */
              }}
            >
              <Ionicons
                name="star"
                size={22}
                style={{ marginRight: 16, color: 'yellow' }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          justifyContent: 'flex-start',
          alignItems: 'center',
          top: Platform.OS === 'ios' ? '8%' : '12%',
        }}
      >
        <View
          style={{
            padding: 20,
            borderRadius: 20,
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#EAEAEA',
            marginBottom: 15,
            ...shadowStyle,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 5 }}>
            {stockName}
          </Text>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#3082FB' }}>
            8,110
          </Text>
          <Text style={{ fontSize: 16, color: '#3082FB', marginVertical: 5 }}>
            ▼ 900 -1.12%
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 14, color: '#555' }}>시가 9,010</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>고가 9,200</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>저가 7,950</Text>
          </View>
        </View>

        <LineChart
          data={{
            labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
            datasets: [
              {
                data: [8000, 8200, 7900, 8500, 8100, 8000],
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel="₩ "
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#3BBB71',
            backgroundGradientFrom: '#43a047',
            backgroundGradientTo: '#66bb6a',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginBottom: 15,
            borderRadius: 16,
          }}
        />
        <View
          style={{
            width: '100%',
            padding: 20,
            backgroundColor: '#EAEAEA',
            borderRadius: 10,
            ...shadowStyle,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            최근 뉴스
          </Text>
          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: '#3BBB71' }}>
              [탄소 배출권 가격, 사상 최고치 기록]
            </Text>
            <Text style={{ fontSize: 14, color: '#555' }}>
              탄소 배출권 가격이 사상 최고치를 기록했습니다. 환경 규제 강화로
              수요가 급증했습니다.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: '#3BBB71' }}>
              [유럽연합, 탄소 배출권 거래 시스템 개편]
            </Text>
            <Text style={{ fontSize: 14, color: '#555' }}>
              유럽연합이 탄소 배출권 거래 시스템을 개편했습니다. 더 엄격한 배출
              한도와 인센티브가 포함됩니다.
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/webview/[keyword]',
              params: { keyword: stockName as string },
            })
          }}
          style={{
            backgroundColor: '#3BBB71',
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#ffffff' }}>
            구글 검색 페이지로 이동
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
