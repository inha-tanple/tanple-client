// Money.tsx

import { Stack } from 'expo-router'

import { Image } from 'expo-image'
import { useState } from 'react'
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput, Modal, Portal } from 'react-native-paper'

import ibk from '#assets/images/bank/ibk.png'
import kakao from '#assets/images/bank/kakao.png'
import kb from '#assets/images/bank/kb.png'
import keb from '#assets/images/bank/keb.png'
import mg from '#assets/images/bank/mg.png'
import nh from '#assets/images/bank/nh.png'
import oori from '#assets/images/bank/oori.png'
import sinhan from '#assets/images/bank/sinhan.png'
import toss from '#assets/images/bank/toss.png'
import MyButton from '#components/MyButton/MyButton'
import SubmitModal from '#components/SubmitModal/SubmitModal'
import { useFetchCredits } from '#store/server/useCreditsQueries'

import { Banks, RecentAccout } from './Banks'

const screenHeight = Dimensions.get('window').height

export default function Money() {
  const [bill, setBill] = useState('0')
  const [account, setAccount] = useState()
  const [selectedBank, setSelectedBank] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [submitModal, setSubmitModal] = useState(false)

  const { data } = useFetchCredits()
  const currBalance = data?.totalCredits

  function srcBank(bankName) {
    if (bankName === 'kakao') return kakao
    if (bankName === 'nh') return nh
    if (bankName === 'toss') return toss
    if (bankName === 'kb') return kb
    if (bankName === 'sinhan') return sinhan
    if (bankName === 'oori') return oori
    if (bankName === 'ibk') return ibk
    if (bankName === 'keb') return keb
    if (bankName === 'mg') return mg
  }

  const renderItem = ({ item }) => {
    const imageSource = srcBank(item.index)

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedBank(item.name)
          setOpenModal(false)
        }}
        style={{
          width: '30%',
          height: 80,
          backgroundColor: '#F4F4F4',
          borderRadius: 10,
          padding: 10,
          marginBottom: 15,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Image source={imageSource} style={{ width: 25, height: 25 }} />
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        top: screenHeight * 0.13,
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
                환전하기
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
        금액과 계좌를 선택해 주세요
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '300',
          alignSelf: 'flex-start',
          marginBottom: 30,
        }}
      >
        현재 잔액: {currBalance?.toLocaleString()}p
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
              const curr = Math.floor(currBalance || 0 / 1000) * 1000
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
      <TextInput
        value={account}
        onChangeText={() => setAccount(account)}
        placeholder="계좌번호 입력"
        underlineStyle={{ backgroundColor: 'gray', height: 0.7 }}
        contentStyle={{ right: 15, fontSize: 18 }}
        keyboardType="number-pad"
        style={{
          width: '100%',
          height: 45,
          backgroundColor: 'transparent',
          marginBottom: 20,
        }}
      />
      <MyButton
        onPress={() => setOpenModal(true)}
        text={selectedBank || '은행 선택'}
        color="#DDD"
        textColor="black"
        style={{
          width: '100%',
          height: 45,
          marginBottom: 50,
        }}
      />

      <MyButton
        onPress={() => setSubmitModal(true)}
        text="환전"
        disabled={bill === '0' || account || selectedBank.length === 0}
        style={{ width: 250, marginBottom: 50 }}
      />

      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#555555',
          alignSelf: 'flex-start',
          marginBottom: 20,
        }}
      >
        최근 보낸 계좌
      </Text>
      {RecentAccout.map((acc) => {
        const imageSource = srcBank(acc.index)

        return (
          <TouchableOpacity
            key={acc.account}
            style={{
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginBottom: 30,
            }}
          >
            <Image
              source={imageSource}
              style={{
                width: 25,
                height: 25,
                alignSelf: 'center',
                marginRight: 15,
              }}
            />

            <View
              style={{
                justifyContent: 'flex-start',
              }}
            >
              <Text
                style={{ fontSize: 17, fontWeight: '600', marginBottom: 7 }}
              >
                {acc.name}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text>{acc.bankName}</Text>
                <Text> </Text>
                <Text>{acc.account}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })}

      <Portal>
        <Modal
          visible={openModal}
          onDismiss={() => setOpenModal(false)}
          contentContainerStyle={{
            alignSelf: 'center',
            width: '95%',
            height: '60%',
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'flex-start',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 15 }}>
            은행을 선택해 주세요
          </Text>
          <FlatList
            data={Banks}
            renderItem={renderItem}
            keyExtractor={(item) => item.index.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </Modal>

        <SubmitModal
          open={submitModal}
          setOpen={setSubmitModal}
          content="정말 환전하시겠습니까?"
          submitText="환전"
        />
      </Portal>
    </View>
  )
}
