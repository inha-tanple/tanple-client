// login/person.tsx

import { router } from 'expo-router'

import { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import { useAuthStore } from '#store/client/useAuthStore'

export default function Login() {
  const { userInfo, setUserInfo, setPersonInfo } = useAuthStore()

  const [name, setName] = useState<string>()
  const [number, setNumber] = useState<string>()
  const [birth, setBirth] = useState<string>()

  const [isNameValid, setIsNameValid] = useState<boolean>(true)
  const [isNumberValid, setIsNumberValid] = useState<boolean>(true)
  const [isBirthValid, setIsBirthValid] = useState<boolean>(true)

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
    const regex = /^[0-9]{0,6}$/
    if (regex.test(value)) {
      setBirth(value)
      setIsBirthValid(value.length === 6)
    }
  }

  const isButtonDisabled = !isNameValid || !isNumberValid || !isBirthValid

  function handleSubmit() {
    setPersonInfo(true)
    router.replace('/home')
  }

  return (
    <View style={styles.container}>
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
          error={!isNameValid}
        />
        <TextInput
          value={number}
          onChangeText={handleNumberChange}
          placeholder="휴대폰 번호 (-제외)"
          mode="outlined"
          activeOutlineColor="#BCDEC6"
          contentStyle={{ fontSize: 13 }}
          style={{ ...styles.textInput }}
          error={!isNumberValid}
          keyboardType="number-pad"
          maxLength={11}
        />
        <TextInput
          value={birth}
          onChangeText={handleBirthChange}
          placeholder="생년월일 6자리"
          mode="outlined"
          activeOutlineColor="#BCDEC6"
          contentStyle={{ fontSize: 13 }}
          error={!isBirthValid}
          keyboardType="number-pad"
          maxLength={6}
          style={{ ...styles.textInput, marginBottom: 20 }}
        />
      </View>
      <View style={styles.buttonConT}>
        <Button
          onPress={handleSubmit}
          mode="contained"
          buttonColor="#5DB476"
          disabled={isButtonDisabled}
          style={{
            height: 45,
            borderWidth: 0.2,
            borderColor: '#49A66D',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          인증하기
        </Button>
        <Button
          onPress={() => {
            setUserInfo(null)
            router.replace('/login/')
          }}
          mode="contained"
          buttonColor="#E6F7E6"
          textColor="#369536"
          disabled={isButtonDisabled}
          style={{
            height: 45,
            borderWidth: 0.2,
            borderColor: '#49A66D',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          다른 아이디로 로그인 하기
        </Button>
      </View>
      <Text style={{ fontSize: 13, marginTop: 15, color: '#808080' }}>
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
