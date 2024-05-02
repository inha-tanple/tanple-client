// credit/detail/[id].tsx

import { useLocalSearchParams } from 'expo-router'

import { Text, View } from 'react-native'

export default function DetailScreen() {
  const { paramID } = useLocalSearchParams()

  return (
    <View>
      <Text>{paramID}</Text>
    </View>
  )
}
