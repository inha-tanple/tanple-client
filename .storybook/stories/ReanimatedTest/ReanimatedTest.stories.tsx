import React from 'react'
import { View } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import ReanimatedTest from './ReanimatedTest'

const ReanimatedTestMeta: Meta<typeof ReanimatedTest> = {
  title: 'ReanimatedTest',
  component: ReanimatedTest,
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default ReanimatedTestMeta

export const Basic: StoryObj<typeof ReanimatedTest> = {}
