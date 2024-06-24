// Credit.tsx

import { Stack, router, useLocalSearchParams } from 'expo-router'

import { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native'
import { SegmentedButtons } from 'react-native-paper'

import GradientView from '#components/GradientView/GradientView'
import { shadowStyle } from '#constants/styles'
import { useProgressDataStore } from '#store/client/useCreditStore'
import {
  dateCreditsType,
  useFetchDateCredits,
} from '#store/server/useCreditsQueries'
import { getDate } from '#utils/getDate'

// import { dateCredits } from './creditDummy'

export default function Credit() {
  const { segment } = useLocalSearchParams()
  const valueCheck = segment === 'history' || segment === 'progress'
  const [value, setValue] = useState(valueCheck ? segment : 'history')

  const { data: dateCredits } = useFetchDateCredits(getDate())
  const { progressData } = useProgressDataStore()

  const historyContent = (
    <View style={styles.container}>
      <FlatList<[string, Omit<dateCreditsType, 'date'>[]]>
        data={Object.entries(
          dateCredits.reduce(
            (acc, item) => {
              const { date, ...rest } = item
              if (!acc[date]) {
                acc[date] = []
              }
              acc[date].push(rest)
              return acc
            },
            {} as { [key: string]: Omit<dateCreditsType, 'date'>[] },
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
                        <Text style={styles.methodText}>{item.creditType}</Text>
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
                          item.creditType === '적립'
                            ? styles.earnedText
                            : styles.spentText,
                        ]}
                      >
                        {item.creditType === '적립' ? '+' : '-'}{' '}
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
        contentContainerStyle={{ paddingRight: 15 }}
      />
    </View>
  )

  const progressContent = (
    <View style={styles.container}>
      {progressData.length ? (
        <FlatList<[string, Omit<dateCreditsType, 'date'>[]]>
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
              {} as { [key: string]: Omit<dateCreditsType, 'date'>[] },
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
                        <View
                          style={{ flexDirection: 'row', marginBottom: 10 }}
                        >
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
                          <Text style={styles.methodText}>
                            {item.creditType}
                          </Text>
                        </View>
                        <Text style={styles.detailText}>{item.detail}</Text>
                      </View>
                      <View style={styles.creditContainer}>
                        <Text style={styles.amountText}>산정중</Text>
                        <Text
                          style={[
                            styles.creditText,
                            item.creditType === '적립'
                              ? styles.earnedText
                              : styles.spentText,
                          ]}
                        >
                          {item.creditType === '적립' ? '+' : '-'}{' '}
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
          contentContainerStyle={{ paddingRight: 15 }}
        />
      ) : (
        <View style={{ alignSelf: 'center' }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: '#808080',
              marginBottom: 5,
            }}
          >
            처리 중인 데이터가 없습니다.
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color: '#808080' }}>
            물품을 구매하고 영수증을 등록해 보세요!
          </Text>
        </View>
      )}
    </View>
  )

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        top: '13%',
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

      <GradientView style={{ paddingTop: 25, marginBottom: 15 }}>
        <View style={styles.contentStyle}>
          <Text style={styles.titleStyle}>총 보유 크레딧</Text>
          <Text style={styles.valueStyle}>
            {dateCredits[0]?.balance.toLocaleString()}p
          </Text>
        </View>
        <View style={styles.contentStyle}>
          <Text style={styles.titleStyle}>
            {new Date().getMonth() + 1}월 적립 크레딧
          </Text>
          <Text style={styles.valueStyle}>
            {dateCredits[0]?.plusACC.toLocaleString()}p
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

      <View
        style={{
          ...shadowStyle,
          width: '90%',
          height: Platform.OS === 'ios' ? '62%' : '64%',
          backgroundColor: 'white',
          borderRadius: 20,
          paddingVertical: 15,
          paddingLeft: 15,
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
          style={{ marginBottom: 20, paddingRight: 15 }}
        />
        {value === 'history' ? historyContent : progressContent}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 25,
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
    width: '50%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    width: '100%',
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
