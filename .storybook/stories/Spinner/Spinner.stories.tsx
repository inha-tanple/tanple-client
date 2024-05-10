import { View } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import Spinner from './Spinner'

const SpinnerMeta: Meta<typeof Spinner> = {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    text: 'Hello world',
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default SpinnerMeta

export const Basic: StoryObj<typeof Spinner> = {}

export const AnotherExample: StoryObj<typeof Spinner> = {
  args: {
    text: 'Another example',
  },
}
