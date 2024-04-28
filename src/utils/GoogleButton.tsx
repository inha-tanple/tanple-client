/* eslint-disable import/no-unresolved */
import { router } from 'expo-router'

import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  EXPO_CLIENT_ID,
  WEB_CLIENT_ID,
} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'
import { Button } from 'react-native-paper'

import GoogleIcon from '#assets/images/GoogleIcon.svg'

import { useAuthStore, useInitStore } from '#store/useAuthStore'

WebBrowser.maybeCompleteAuthSession()

export default function GoogleButton() {
  const { userInfo, setUserInfo } = useAuthStore()
  const { setIsInit } = useInitStore()

  const config = {
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [request, response, promptAsync] = Google.useAuthRequest(config)

  const getUserInfo = async (token: unknown) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const user = await res.json()
      await AsyncStorage.setItem('user', JSON.stringify(user))

      setUserInfo(user)
    } catch (error) {
      console.error('Failed to fetch user data:', response)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      if (response?.type === 'success') {
        const { authentication } = response
        if (authentication?.accessToken) {
          await getUserInfo(authentication.accessToken)
        }
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  useEffect(() => {
    handleGoogleSignIn()
  }, [response])

  useEffect(() => {
    if (Object.keys(userInfo || {}).length) {
      setIsInit(false)
      console.log(userInfo)
      router.navigate('/')
    }
  }, [userInfo])

  return (
    <Button
      onPress={() => promptAsync()}
      mode="contained"
      buttonColor="#5DB476"
      icon={GoogleIcon}
      style={{
        height: 45,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
      }}
      contentStyle={{
        width: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      labelStyle={{ position: 'relative', left: 30 }}
    >
      Google 계정으로 로그인
    </Button>
  )
}
