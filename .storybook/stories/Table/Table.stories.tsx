import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Table from './Table'

const TableMeta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,

  decorators: [(Story) => <Story />],
}

export default TableMeta

export const Basic: StoryObj<typeof Table> = {
  args: {
    tableHeaders: ['', 'Subject1', 'Subject2', 'Subject3'],
    tableData: [
      ['Student1', 80, 75, 90],
      ['Student2', 85, 90, 95],
      ['Student3', 70, 65, 80],
      ['Student4', 95, 85, 75],
    ],
    // isLeftHead: false,
  },
}
