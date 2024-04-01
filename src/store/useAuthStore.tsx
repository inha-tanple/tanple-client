import { create } from 'zustand'

interface AuthState {
  isAuth: boolean
  setIsLogin: () => void
}

const useAuthStore = create<AuthState>()((set) => ({
  isAuth: false,
  setIsLogin: () => set(() => ({ isAuth: true })),
}))

export default useAuthStore
