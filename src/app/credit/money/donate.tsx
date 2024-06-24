// Donate.tsx

import { Stack } from 'expo-router'

import { useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'

import MyButton from '#components/MyButton/MyButton'
import SubmitModal from '#components/SubmitModal/SubmitModal'
import { useFetchDateCredits } from '#store/server/useCreditsQueries'
import { getDate } from '#utils/getDate'

export default function Donate() {
  const [bill, setBill] = useState('0')
  const [submitModal, setSubmitModal] = useState(false)
  const { data: dateCredits } = useFetchDateCredits(getDate())

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
                style={{ fontSize: 20, fontWeight: 'bold', marginRight: 220 }}
              >
                기부하기
              </Text>
            </View>
          ),
          headerTransparent: true,
        }}
      />
      <Text
        style={{
          fontSize: 22,
          fontWeight: '600',
          alignSelf: 'flex-start',
          marginBottom: 10,
        }}
      >
        금액을 선택해 주세요
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '300',
          alignSelf: 'flex-start',
          marginBottom: 30,
        }}
      >
        현재 잔액: {dateCredits[0]?.balance.toLocaleString()}p
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 50,
        }}
      >
        <TextInput
          value={bill}
          onChangeText={() => setBill(bill)}
          placeholder="금액 선택"
          underlineStyle={{ backgroundColor: 'gray', height: 0.7 }}
          contentStyle={{ right: 15, fontSize: 18 }}
          style={{
            width: '55%',
            height: 45,
            backgroundColor: 'transparent',
            marginBottom: 20,
          }}
        />
        <MyButton
          onPress={() =>
            setBill((it) => {
              let value = parseInt(it, 10) + 1000
              const curr = Math.floor(dateCredits[0].balance / 1000) * 1000
              value = value > curr ? curr : value
              return value.toString()
            })
          }
          text="+"
          style={{ width: 65 }}
        />
        <MyButton
          onPress={() =>
            setBill((it) => {
              let value = parseInt(it, 10) - 1000
              value = value < 0 ? 0 : value
              return value.toString()
            })
          }
          text="-"
          color="#DDD"
          textColor="black"
          style={{ width: 65 }}
        />
      </View>

      <MyButton
        onPress={() => setSubmitModal(true)}
        text="기부"
        disabled={bill === '0'}
        style={{ width: 250 }}
      />

      <SubmitModal
        open={submitModal}
        setOpen={setSubmitModal}
        content="정말 기부하시겠습니까?"
        submitText="기부"
      />
    </View>
  )
}
