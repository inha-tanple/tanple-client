// useAuthStore.ts

/* eslint-disable no-unused-vars */
import { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const storage = new MMKV()

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
      storage: {
        getItem: (name) => {
          const value = storage.getString(name)
          return value ? JSON.parse(value) : null
        },
        setItem: (name, value) => {
          storage.set(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          storage.delete(name)
        },
      },
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
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const value = storage.getString(name)
          return value ? JSON.parse(value) : null
        },
        setItem: (name, value) => {
          storage.set(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          storage.delete(name)
        },
      })),
    },
  ),
)

export { useAuthStore, useInitStore }
