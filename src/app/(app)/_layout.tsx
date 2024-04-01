import { Redirect, Stack } from 'expo-router'

import useAuthStore from '#store/useAuthStore'

export default function Layout() {
  const { isAuth } = useAuthStore()

  if (!isAuth) return <Redirect href="/login/" />

  return <Stack />
}
