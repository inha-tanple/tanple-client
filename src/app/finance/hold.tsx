// Hold.tsx

import { Stack } from 'expo-router'

import { Text, View } from 'react-native'

import Table from '#components/Table/Table'
import { defaultContainer } from '#constants/styles'

export default function Hold() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        top: '13%',
        paddingHorizontal: 20,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginRight: 220,
                }}
              >
                배출권 보유 현황
              </Text>
            </View>
          ),
          headerTransparent: true,
        }}
      />
      <View
        style={{
          ...defaultContainer,
          marginBottom: 15,
          borderRadius: 10,
          padding: 5,
        }}
      >
        <Table
          tableData={[
            [['매입금액'], ['100,000']],
            [['평가금액'], ['143,000']],
          ]}
        />
        <Table
          tableData={[
            [['평가손익'], ['43,000']],
            [['수익률(%)'], [11.73]],
          ]}
        />
      </View>
      <View
        style={{
          ...defaultContainer,
          height: '70%',
          borderRadius: 10,
          padding: 5,
          alignItems: 'flex-start',
        }}
      >
        <Table
          tableHeaders={[
            ['배출권명'],
            ['수량'],
            ['현재가', '평균단가'],
            ['평가손익', '수익률(%)'],
          ]}
          tableData={[
            [['KAU23'], ['10'], ['8,870', '7,810'], ['30,000', '12.3']],
            [['KAU25'], ['5'], ['8,610', '7,620'], ['13,000', '10.9']],
          ]}
          colorColumn={[2, 3]}
          isLeftHead={false}
        />
      </View>
    </View>
  )
}
