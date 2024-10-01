import { Meta, StoryObj } from '@storybook/react'
import { TodoList } from '../demo/taskList'
import { TimelineWrapper } from './wrapper'

const meta = {
  title: 'Example/TimelineView',
  component: TimelineWrapper,
  tags: ['autodocs'],
  args: {
    initialItems: []
  }
} satisfies Meta<typeof TimelineWrapper>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { initialItems: TodoList }
}

export const Empty: Story = {
  args: { initialItems: [] }
}
