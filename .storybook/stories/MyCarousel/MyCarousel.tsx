// MyCarousel.tsx

import { router } from 'expo-router'
import { Image } from 'expo-image'

import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native'

import Carousel from 'react-native-snap-carousel'

import { shadowStyle } from '#constants/styles'

const { width } = Dimensions.get('window')

interface DataProps {
  imageUrl: string
  contentUrl: string
  title: string
  content: string
}

interface MyCarouselProps {
  data: DataProps[]
  style?: StyleProp<ViewStyle>
}

const CarouselComponent = ({ data, ...props }: MyCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)

  const renderItem = ({ item }: { item: DataProps }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/webview/origin/[url]',
          params: { url: item.contentUrl },
        })
      }}
      style={[styles.slide, props.style]}
      activeOpacity={1}
    >
      <Image source={item.imageUrl} style={styles.image} />
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <Carousel
      ref={carouselRef}
      data={data}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width * 0.8}
      onSnapToItem={(index) => setActiveIndex(index)}
      loop
      autoplay
      autoplayInterval={3500}
      loopClonesPerSide={5}
    />
  )
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: 'white',
    borderRadius: 10,
    ...shadowStyle,
  },
  image: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
  },
})

export default CarouselComponent
