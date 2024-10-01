import type { Meta, StoryObj } from '@storybook/react'

import { DemoComponent } from './DemoComponent'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/DemoComponent',
  component: DemoComponent,
  tags: ['autodocs'],
  argTypes: {
    initialCount: { control: 'number' }
  }
} satisfies Meta<typeof DemoComponent>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    initialCount: 0
  }
}

export const WithInitialCount: Story = {
  args: {
    initialCount: 42
  }
}
