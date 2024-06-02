// login/person.tsx

import { router } from 'expo-router'

import { useTheme } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-paper'

import MyButton from '#components/MyButton/MyButton'
import Spinner from '#components/Spinner/Spinner'
import { useAuthStore } from '#store/client/useAuthStore'
import usePersonQuery from '#store/server/useMemberQueries'

export default function Login() {
  const { userInfo, setUserInfo, setPersonInfo } = useAuthStore()
  const { mutate, isSuccess, isError, isPending } = usePersonQuery()
  const { colors } = useTheme()

  const [name, setName] = useState<string>()
  const [number, setNumber] = useState<string>()
  const [birth, setBirth] = useState<string>()

  const [isNameValid, setIsNameValid] = useState<boolean>(false)
  const [isNumberValid, setIsNumberValid] = useState<boolean>(false)
  const [isBirthValid, setIsBirthValid] = useState<boolean>(false)

  function handleNameChange(value: string) {
    setName(value)
    setIsNameValid(value.trim().length > 0)
  }

  function handleNumberChange(value: string) {
    const regex = /^[0-9]{0,11}$/
    if (regex.test(value)) {
      setNumber(value)
      setIsNumberValid(value.length === 11)
    }
  }

  function handleBirthChange(value: string) {
    const regex = /^[0-9]{0,8}$/
    if (regex.test(value)) {
      setBirth(value)
      setIsBirthValid(value.length === 8)
    }
  }

  const isButtonDisabled = !isNameValid || !isNumberValid || !isBirthValid

  function handleSubmit() {
    const year = birth?.slice(0, 4)
    const month = birth?.slice(4, 6)
    const day = birth?.slice(6, 8)
    const formattedDate = `${year}-${month}-${day}`
    const date = new Date(formattedDate).toISOString()
    if (number) mutate({ number, date })
  }

  useEffect(() => {
    // isSuccess로 바꾸기
    if (isError) {
      setPersonInfo(true)
      router.replace('/home')
    }
  }, [isError])

  return (
    <View style={styles.container}>
      {isPending && <Spinner />}
      <Text
        style={{
          fontSize: 19,
          fontWeight: 'bold',
          width: '75%',
          marginTop: 100,
          marginBottom: 50,
        }}
      >
        개인 인증을 위해 아래의 정보를 입력해 주세요
      </Text>
      <View style={styles.textConT}>
        <TextInput
          value={name}
          onChangeText={handleNameChange}
          placeholder="이름"
          mode="outlined"
          activeOutlineColor="#BCDEC6"
          contentStyle={{ fontSize: 13 }}
          style={{ ...styles.textInput }}
          error={!isNameValid && !!name?.length}
        />
        <TextInput
          value={number}
          onChangeText={handleNumberChange}
          placeholder="휴대폰 번호 (-제외)"
          mode="outlined"
          activeOutlineColor="#BCDEC6"
          contentStyle={{ fontSize: 13 }}
          style={{ ...styles.textInput }}
          error={!isNumberValid && !!number?.length}
          keyboardType="number-pad"
          maxLength={11}
        />
        <TextInput
          value={birth}
          onChangeText={handleBirthChange}
          placeholder="생년월일 8자리 (20010101)"
          mode="outlined"
          activeOutlineColor="#BCDEC6"
          contentStyle={{ fontSize: 13 }}
          error={!isBirthValid && !!birth?.length}
          keyboardType="number-pad"
          maxLength={8}
          style={{ ...styles.textInput, marginBottom: 20 }}
        />
      </View>
      <View style={styles.buttonConT}>
        <MyButton
          onPress={handleSubmit}
          text="인증하기"
          disabled={isButtonDisabled}
          style={{
            width: '100%',
          }}
        />

        <MyButton
          onPress={() => {
            setUserInfo(null)
            router.replace('/login/')
          }}
          text="다른 아이디로 로그인 하기"
          color="#E6F7E6"
          textColor="#369536"
          disabled={isButtonDisabled}
          style={{
            width: '100%',
            borderWidth: 0.2,
            borderColor: '#49A66D',
          }}
        />
      </View>
      <Text style={{ fontSize: 13, marginTop: 15, color: colors.darkGray }}>
        현재: {userInfo?.email}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textConT: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  textInput: {
    width: '75%',
    height: 45,
    backgroundColor: 'white',
  },
  buttonConT: {
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    gap: 15,
    marginTop: 20,
  },
})
