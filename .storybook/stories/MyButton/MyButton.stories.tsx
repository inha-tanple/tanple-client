import React from 'react'
import { View } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import MyButton from './MyButton'

const MyButtonMeta: Meta<typeof MyButton> = {
  title: 'MyButton',
  component: MyButton,
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

export default MyButtonMeta

export const Basic: StoryObj<typeof MyButton> = {}

export const green: StoryObj<typeof MyButton> = {
  args: {
    style: { heigt: 300, width: 300 },
    text: 'green',
  },
}
