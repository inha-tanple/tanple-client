import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function Skeleton() {
  return (
    <View
      style={{
        position: 'absolute',
        top: '50%',
      }}
    >
      <ActivityIndicator size="large" color="gray" />
    </View>
  )
}
