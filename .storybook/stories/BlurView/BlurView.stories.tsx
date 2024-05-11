import { Text } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import BlurView from './BlurView'

const BlurViewMeta: Meta<typeof BlurView> = {
  title: 'BlurView',
  component: BlurView,
  decorators: [(Story) => <Story />],
}

export default BlurViewMeta

export const Basic: StoryObj<typeof BlurView> = {
  args: {
    children: <Text>Hello world</Text>,
  },
}
