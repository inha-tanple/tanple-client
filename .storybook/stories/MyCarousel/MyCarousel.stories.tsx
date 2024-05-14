import React from 'react'
import { View } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import MyCarousel from './MyCarousel'

const MyCarouselMeta: Meta<typeof MyCarousel> = {
  title: 'MyCarousel',
  component: MyCarousel,

  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default MyCarouselMeta

export const Basic: StoryObj<typeof MyCarousel> = {
  args: {
    data: [
      {
        imageUrl: 'https://picsum.photos/seed/696/3000/2000',
        title: 'Item 1',
        content: 'This is the content for item 1',
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Item 2',
        content: 'This is the content for item 2',
      },
    ],
  },
}
