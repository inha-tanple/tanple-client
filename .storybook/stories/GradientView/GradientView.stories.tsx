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
