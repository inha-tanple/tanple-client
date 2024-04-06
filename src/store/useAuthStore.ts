// useAuthStore.ts

/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export default useAuthStore
