/* eslint-disable react/no-unstable-nested-components */
// Credit.tsx

import { Stack, router } from 'expo-router'

import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native'
import { PaperProvider, SegmentedButtons } from 'react-native-paper'

import { shadowStyle } from '#constants/styles'

import {
  creditData,
  creditDataType,
  progressData,
  progressDataType,
} from './creditDummy'

export default function Credit() {
  const [value, setValue] = useState('history')

  const historyContent = (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(
          creditData.reduce(
            (acc, item) => {
              const { date, ...rest } = item
              if (!acc[date]) {
                acc[date] = []
              }
              acc[date].push(rest)
              return acc
            },
            {} as { [key: string]: Omit<creditDataType, 'date'>[] },
          ),
        )}
        keyExtractor={([date]) => date}
        renderItem={({ item: [date, items] }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.dateText}>{date}</Text>
            <View
              style={{
                height: 2,
                backgroundColor: '#808080',
                marginTop: 5,
                marginBottom: 10,
              }}
            />

            {items.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: '/credit/detail/[id]',
                    params: { id: item.id },
                  })
                }}
                key={item.id}
              >
                <View>
                  <View style={styles.itemContainer}>
                    <View>
                      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'gray',
                            marginRight: 6,
                          }}
                        >
                          {item.time}
                        </Text>
                        <View
                          style={{
                            width: 1,
                            height: '50%',
                            backgroundColor: '#808080',
                            alignSelf: 'center',
                            marginRight: 6,
                          }}
                        />
                        <Text style={styles.methodText}>{item.method}</Text>
                      </View>
                      <Text style={styles.detailText}>{item.detail}</Text>
                    </View>
                    <View style={styles.creditContainer}>
                      <Text style={styles.amountText}>
                        {item.balance.toLocaleString()}p
                      </Text>
                      <Text
                        style={[
                          styles.creditText,
                          item.type === '적립'
                            ? styles.earnedText
                            : styles.spentText,
                        ]}
                      >
                        {item.type === '적립' ? '+' : '-'}{' '}
                        {item.credit.toLocaleString()}p
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      backgroundColor: '#DEDEDE',
                      marginBottom: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        contentContainerStyle={{ paddingRight: 16 }}
      />
    </View>
  )

  const progressContent = (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(
          progressData.reduce(
            (acc, item) => {
              const { date, ...rest } = item
              if (!acc[date]) {
                acc[date] = []
              }
              acc[date].push(rest)
              return acc
            },
            {} as { [key: string]: Omit<progressDataType, 'date'>[] },
          ),
        )}
        keyExtractor={([date]) => date}
        renderItem={({ item: [date, items] }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.dateText}>{date}</Text>
            <View
              style={{
                height: 2,
                backgroundColor: '#808080',
                marginTop: 5,
                marginBottom: 10,
              }}
            />

            {items.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: '/credit/detail/[id]',
                    params: { id: item.id },
                  })
                }}
                key={item.id}
              >
                <View>
                  <View style={styles.itemContainer}>
                    <View>
                      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'gray',
                            marginRight: 6,
                          }}
                        >
                          {item.time}
                        </Text>
                        <View
                          style={{
                            width: 1,
                            height: '50%',
                            backgroundColor: '#808080',
                            alignSelf: 'center',
                            marginRight: 6,
                          }}
                        />
                        <Text style={styles.methodText}>{item.method}</Text>
                      </View>
                      <Text style={styles.detailText}>{item.detail}</Text>
                    </View>
                    <View style={styles.creditContainer}>
                      <Text style={styles.amountText}>산정중</Text>
                      <Text
                        style={[
                          styles.creditText,
                          item.type === '적립'
                            ? styles.earnedText
                            : styles.spentText,
                        ]}
                      >
                        {item.type === '적립' ? '+' : '-'}{' '}
                        {item.credit.toLocaleString()}p
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      backgroundColor: '#DEDEDE',
                      marginBottom: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        contentContainerStyle={{ paddingRight: 16 }}
      />
    </View>
  )

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          top: Platform.OS === 'ios' ? 115 : 95,
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
                  크레딧 이용 현황
                </Text>
              </View>
            ),
            headerTransparent: true,
          }}
        />

        <LinearGradient
          colors={['#64BA7D', '#338874']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            ...shadowStyle,
            width: 360,
            height: 150,
            padding: 25,
            borderRadius: 20,
            marginBottom: 15,
          }}
        >
          <View style={styles.contentStyle}>
            <Text style={styles.titleStyle}>총 보유 크레딧</Text>
            <Text style={styles.valueStyle}>10,000p</Text>
          </View>
          <View style={styles.contentStyle}>
            <Text style={styles.titleStyle}>5월 적립 크레딧</Text>
            <Text style={styles.valueStyle}>2,000p</Text>
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

        <View
          style={{
            ...shadowStyle,
            width: 360,
            height: Platform.OS === 'ios' ? 530 : 500,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 15,
            alignItems: 'center',
          }}
        >
          <SegmentedButtons
            theme={{ colors: { secondaryContainer: '#DDF0E8' } }}
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: 'history',
                label: '거래내역',
                style: { borderColor: '#DEDEDE' },
              },
              {
                value: 'progress',
                label: '처리 중',
                style: { borderColor: '#DEDEDE' },
              },
            ]}
            style={{ marginBottom: 20 }}
          />
          {value === 'history' ? historyContent : progressContent}
        </View>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  titleStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  valueStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    bottom: 5,
  },
  buttonStyle: {
    width: 180,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
    width: 350,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
  },
  detailText: {
    fontSize: 16,
  },
  methodText: {
    fontSize: 14,
    color: 'gray',
  },
  creditContainer: {
    alignItems: 'flex-end',
  },
  creditText: {
    fontSize: 18,
    fontWeight: '600',
  },
  earnedText: {
    color: 'green',
  },
  spentText: {
    color: '#F56042',
  },
  amountText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
})
