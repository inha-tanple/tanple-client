/* eslint-disable import/no-unresolved */
import { router } from 'expo-router'

import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  EXPO_CLIENT_ID,
  WEB_CLIENT_ID,
  SERVER_URL,
} from '@env'
import { makeRedirectUri } from 'expo-auth-session'
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

  const redictUri = makeRedirectUri({
    scheme: 'com.gwjun.bullet',
    path: '/home',
  })

  const config = {
    redictUri,
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  }

  const [, response, promptAsync] = Google.useAuthRequest(config)

  // backend temp code
  const getUserInfo = async (token: unknown) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const user = await res.json()
      setUserInfo(user)
    } catch (error) {
      console.error('Failed to fetch user data:', response)
    }
  }

  const getUserInfoFromBackend = async (token: string) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: token }),
      })

      if (res.ok) {
        const user = await res.json()
        setUserInfo(user)
      } else {
        console.error('Failed to fetch user data from backend:', response)
      }
    } catch (error) {
      console.error('Error fetching user data from backend:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      if (response?.type === 'success') {
        const { authentication } = response
        if (authentication?.accessToken) {
          await getUserInfo(authentication.accessToken)
          // await getUserInfoFromBackend(authentication.accessToken)
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
      router.navigate('/home')
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
