// styles.ts
import { ViewStyle } from 'react-native'

export const shadowStyle: ViewStyle = {
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
  elevation: 2,
}

export const defaultContainer: ViewStyle = {
  ...shadowStyle,
  width: '100%',
  borderRadius: 20,
  padding: 20,
  backgroundColor: 'white',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
