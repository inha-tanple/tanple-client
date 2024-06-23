/* eslint-disable no-nested-ternary */
/* eslint-disable dot-notation */
// Credit.tsx

import { Stack, router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { LineChart } from 'react-native-chart-kit'

import { shadowStyle } from '#constants/styles'
import {
  dateCreditsType,
  useFetchCredits,
  useFetchDateCredits,
} from '#store/server/useCreditsQueries'
import { getDate } from '#utils/getDate'

const screenWidth = Dimensions.get('window').width

export default function Analysis() {
  const today = new Date().toISOString().slice(0, 10)
  const [selectedDate, setSelectedDate] = useState(today)

  const { data: credits } = useFetchCredits()
  const { data: dateCredits } = useFetchDateCredits(getDate())

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    useShadowColorFromDataset: true,
  }

  const data = {
    datasets: [
      {
        data: [...dateCredits]
          .reverse()
          .filter((item) => item.plusACC !== undefined)
          .map((item) => item.plusACC),
        color: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
        strokeWidth: 3,
      },
      {
        data: [...dateCredits]
          .reverse()
          .filter((item) => item.plusACC !== undefined)
          .map((item) => item.plusACC),
        color: (opacity = 0) => `rgba(0, 128, 0, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  }

  LocaleConfig.locales['kor'] = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    dayNames: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  }
  LocaleConfig.defaultLocale = 'kor'

  const dateContent = (selected: string) => {
    const filteredData: dateCreditsType[] = dateCredits.filter(
      (item: dateCreditsType) => item.date === selected,
    )

    if (filteredData.length === 0) {
      return (
        <Text
          style={{
            alignSelf: 'center',
            color: '#808080',
          }}
        >
          항목이 없습니다
        </Text>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.entries(
            filteredData.reduce(
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
          renderItem={({ item: [, items] }) => (
            <View style={{ marginBottom: 20 }}>
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
          contentContainerStyle={{ paddingRight: 16 }}
        />
      </View>
    )
  }

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
                상세 분석
              </Text>
            </View>
          ),
          headerTransparent: true,
        }}
      />

      <View
        style={{
          ...shadowStyle,
          width: '90%',
          height: '16%',
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 20,
          marginBottom: 15,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Ionicons size={18} name="caret-back-outline" />
          <Text
            style={{ fontSize: 16, fontWeight: '600', marginHorizontal: 8 }}
          >
            6월
          </Text>
          <Ionicons size={18} name="caret-forward-outline" />
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 5 }}>
              {credits?.totalCredits.toLocaleString()}p
            </Text>
            <Text style={{ fontSize: 12, color: '#808080' }}>
              지난달보다{' '}
              {(
                (credits?.thisMonthCredits || 0) -
                (credits?.lastMonthCredits || 0)
              ).toLocaleString()}
              p 더 적립했어요
            </Text>
          </View>

          <LineChart
            data={data}
            width={200}
            height={100}
            chartConfig={chartConfig}
            bezier
            withVerticalLines={false}
            withHorizontalLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withDots={false}
            withShadow={false}
            transparent
            style={{ marginLeft: -30, marginTop: -30 }}
          />
        </View>
      </View>

      <Calendar
        renderHeader={() => null}
        onMonthChange={(month) => {
          console.log('month changed', month)
        }}
        hideExtraDays
        hideArrows
        disableMonthChange
        hideDayNames={false}
        disableAllTouchEventsForDisabledDays
        markingType="custom"
        dayComponent={({ date, state }) => {
          const points: dateCreditsType[] = dateCredits.filter(
            (item: dateCreditsType) => item.date === date?.dateString,
          )

          let plus = 0
          let minus = 0
          if (points) {
            points.map((it) => {
              if (it.creditType === '적립') plus += it.credit
              else minus += it.credit
            })
          }

          const isSelected = date?.dateString === selectedDate
          const isToday = date?.dateString === today

          return (
            <TouchableOpacity
              onPress={() => setSelectedDate(date?.dateString || '')}
              style={{ alignItems: 'center' }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color:
                    state === 'disabled'
                      ? 'gray'
                      : isSelected
                        ? isToday
                          ? '#3979EF'
                          : '#75C4ED'
                        : 'black',
                  fontWeight: isSelected ? (isToday ? '600' : '600') : '400',
                }}
              >
                {date?.day}
              </Text>

              {plus ? (
                <Text style={{ fontSize: 12, color: 'green' }}>+{plus}</Text>
              ) : (
                ''
              )}
              {minus ? (
                <Text style={{ fontSize: 12, color: '#808080' }}>-{minus}</Text>
              ) : (
                ''
              )}
            </TouchableOpacity>
          )
        }}
        style={{
          ...shadowStyle,
          width: screenWidth * 0.9,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderRadius: 20,
          marginBottom: 15,
        }}
      />
      <View
        style={{
          ...shadowStyle,
          width: '90%',
          height: Platform.OS === 'ios' ? '28%' : '31%',
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {dateContent(selectedDate)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
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
