import React, { useEffect } from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
} from 'react-native-reanimated'
import { shadowStyle } from '#constants/styles'

const { width, height } = Dimensions.get('window')

interface CardProps {
  children?: React.ReactNode
  content?: { [key: string]: React.ReactNode }
  delay?: number
  duration?: number
  style?: object
}

function rgbaStringToHex(rgbaString: string) {
  const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/
  const match = rgbaRegex.exec(rgbaString)

  if (!match) {
    console.error('Invalid RGBA string:', rgbaString)
    return null
  }

  const red = parseInt(match[1])
  const green = parseInt(match[2])
  const blue = parseInt(match[3])

  const redHex = red.toString(16).padStart(2, '0')
  const greenHex = green.toString(16).padStart(2, '0')
  const blueHex = blue.toString(16).padStart(2, '0')
  const result = `#${redHex}${greenHex}${blueHex}`.toUpperCase()

  return result
}

export default function CardTransition({
  children,
  content = {},
  delay = 3500,
  duration = 600,
  ...props
}: CardProps) {
  const cardColor = useSharedValue(Object.keys(content)[0])
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: cardColor.value,
  }))

  useEffect(() => {
    const animations = Object.keys(content).map((color) => {
      return withDelay(delay, withTiming(color, { duration }))
    })
    cardColor.value = withSequence(
      ...animations,
      withRepeat(withSequence(...animations), -1),
    )
  }, [content, delay, duration])

  useEffect(() => {
    console.log(rgbaStringToHex(cardColor.value))
  }, [cardColor.value])

  return (
    <Animated.View style={[styles.card, animatedStyle, props.style]}>
      {content[rgbaStringToHex(cardColor.value) || '']}
      {/* {content['#D86C95']} */}
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    ...shadowStyle,
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 10,
    alignItems: 'center',
  },
})
