// index.tsx

import { PaperProvider } from 'react-native-paper'

import Main from '#components/Main'

export default function Home() {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  )
}
