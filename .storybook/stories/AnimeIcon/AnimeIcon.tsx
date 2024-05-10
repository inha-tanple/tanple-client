// AnimeIcon.tsx

import { ReactNode } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export default function AnimeIcon({ children }: { children: ReactNode }) {
  const scaleX = useSharedValue(1)
  const scaleY = useSharedValue(1)

  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scaleX.value = withTiming(1.2, { duration: 50 })
      scaleY.value = withTiming(0.8, { duration: 50 })
    },
    onFinish: () => {
      scaleX.value = withTiming(1, { duration: 50 })
      scaleY.value = withTiming(1, { duration: 50 })
    },
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}
