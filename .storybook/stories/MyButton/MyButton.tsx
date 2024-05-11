import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { shadowStyle } from '#constants/styles'
import { useTheme } from '@react-navigation/native'

export type MyButtonProps = {
  onPress: () => void
  text: string
  color?: string
  textColor?: string
  style?: object
  disabled?: boolean
}

export default function MyButton({
  onPress,
  text,
  color,
  textColor,
  disabled,
  ...props
}: MyButtonProps) {
  const { colors } = useTheme()

  return (
    <Button
      onPress={onPress}
      mode="contained"
      buttonColor={color || colors.primary}
      textColor={textColor || ''}
      disabled={disabled}
      style={[styles.buttonStyle, props.style]}
    >
      {text}
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    ...shadowStyle,
    elevation: 4,
    borderRadius: 10,
    width: 160,
    height: 45,
    justifyContent: 'center',
  },
})
