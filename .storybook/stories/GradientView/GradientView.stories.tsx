import React from 'react'
import { View } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import GradientView from './GradientView'

const GradientViewMeta: Meta<typeof GradientView> = {
  title: 'GradientView',
  component: GradientView,

  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default GradientViewMeta

export const Basic: StoryObj<typeof GradientView> = {
  args: {},
}

export const Pink: StoryObj<typeof GradientView> = {
  args: {
    colors: ['#FF9A8B', '#FF6A88'],
  },
}
export const Orange: StoryObj<typeof GradientView> = {
  args: {
    colors: ['#FE8C00', '#F83600'],
  },
}
export const Purple: StoryObj<typeof GradientView> = {
  args: {
    colors: ['#6B73FF', '#A857FF'],
  },
}

export const LightPink: StoryObj<typeof GradientView> = {
  args: {
    colors: ['#FAD0C9', '#FFD1FF'],
  },
}
export const Green: StoryObj<typeof GradientView> = {
  args: {
    colors: ['#3D7E9F', '#38E54D'],
  },
}
export const Mint: StoryObj<typeof GradientView> = {
  args: {
    colors: ['#0CEBEB', '#20E3B2'],
  },
}
