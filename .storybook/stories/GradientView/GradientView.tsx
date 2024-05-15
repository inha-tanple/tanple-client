import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { shadowStyle } from '../../../src/constants/styles'
import { StyleProp, ViewStyle } from 'react-native'

interface Props {
  children?: React.ReactNode
  colors?: string[]
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export default function GradientView({
  children,
  colors = ['#64BA7D', '#338874'],
  ...props
}: Props) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          ...shadowStyle,
          width: '90%',
          height: 150,
          borderRadius: 20,
        },
        props.style,
      ]}
    >
      {children}
    </LinearGradient>
  )
}
