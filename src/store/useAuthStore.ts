// useAuthStore.ts

/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// useAuthStore
interface UserInfo {
  email: string
  family_name: string
  given_name: string
  id: string
  locale: string
  name: string
  picture: string
  verified_email: boolean
}

interface AuthState {
  userInfo: UserInfo | null
  setUserInfo: (info: UserInfo | null) => void
  // personInfo dev temp
  personInfo: boolean | null
  setPersonInfo: (info: boolean | null) => void
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
      personInfo: null,
      setPersonInfo: (info) => set({ personInfo: info }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

// useInitStore
interface InitState {
  isInit: boolean
  setIsInit: (data: boolean) => void
}

const useInitStore = create(
  persist<InitState>(
    (set) => ({
      isInit: true,
      setIsInit: (data) => set({ isInit: data }),
    }),
    {
      name: 'initial-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export { useAuthStore, useInitStore }
