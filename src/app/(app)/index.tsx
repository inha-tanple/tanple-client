// App.tsx

import { View } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import Main from '#components/Main'

export default function App() {
  return (
    <PaperProvider>
      <View>
        <Main />
      </View>
    </PaperProvider>
  )
}
