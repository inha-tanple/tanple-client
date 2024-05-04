// login.tsx

import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import LogoTitle from '#assets/logo'
import GoogleButton from '#utils/GoogleButton'

export default function Login() {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <LogoTitle size={27} />
      {/* <View style={styles.textConT}>
        <TextInput
          value={email}
          onChangeText={(it) => setEmail(it)}
          placeholder="이메일"
          mode="outlined"
          activeOutlineColor="#BCDEC6"
          contentStyle={{ fontSize: 13 }}
          style={{ ...styles.textInput, marginTop: 20 }}
        />
        <TextInput
          value={password}
          onChangeText={(it) => setPassword(it)}
          placeholder="비밀번호"
          mode="outlined"
          activeOutlineColor="#BCDEC6"
          contentStyle={{ fontSize: 13 }}
          style={{ ...styles.textInput, marginBottom: 20 }}
        />
      </View> */}
      <View style={styles.buttonConT}>
        <GoogleButton />
        {/* <Button
          // onPress={}
          mode="contained"
          buttonColor="#E6F7E6"
          textColor="#369536"
          style={{
            height: 45,
            borderWidth: 0.2,
            borderColor: '#49A66D',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          기타 로그인
        </Button> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
  },
  textConT: {
    display: 'flex',
    flexDirection: 'column',
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
