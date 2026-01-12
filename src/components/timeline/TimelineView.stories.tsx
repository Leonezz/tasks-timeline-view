import type { Meta, StoryObj } from '@storybook/react-vite'
import { TimelineView } from './TimelineView'
import moment from 'moment'
import type { TaskItem } from '../../@types/task-item'
import { v4 as uuid } from 'uuid'
import '../../index.css'

let TodoList: TaskItem[] = [
  {
    status: 'done',
    priority: 'high',
    content: {
      rawText: '- [x] Unchecked ✅ 2023-11-14',
      title: 'Unchecked'
    },
    tags: new Set(['#TODO', '#Inbox']),
    dateTime: {
      completion: moment('2023-11-14', 'YYYY-MM-DD'),
      misc: new Map()
    },
    list: {
      visual: 'test theme-defined markers.md',
      rawText: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: uuid()
  },
  {
    status: 'cancelled',
    priority: 'high',
    content: {
      rawText: '- [x] Unchecked ✅ 2023-11-14',
      title: 'Unchecked'
    },
    tags: new Set(['#TODO', '#Inbox']),
    dateTime: {
      completion: moment('2023-11-14', 'YYYY-MM-DD'),
      misc: new Map()
    },
    list: {
      visual: 'test theme-defined markers.md',
      rawText: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: uuid()
  },
  {
    status: 'done',
    priority: 'medium',
    content: {
      rawText: '- [x] Checked',
      title: 'Checked'
    },
    tags: new Set(['tag2']),
    dateTime: {
      created: moment('2023-12-14', 'YYYY-MM-DD'),
      misc: new Map()
    },
    list: {
      visual: 'test theme-defined markers.md',
      rawText: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: uuid()
  },
  {
    status: 'overdue',
    priority: 'low',
    content: {
      rawText: '- [>] Rescheduled',
      title: 'Rescheduled'
    },
    dateTime: {
      due: moment(),
      misc: new Map()
    },
    tags: new Set(['tag3']),
    list: {
      visual: 'test theme-defined markers.md',
      rawText: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: uuid()
  },
  {
    status: 'todo',
    priority: 'low',
    content: {
      rawText: '- [>] Rescheduled',
      title: 'Rescheduled'
    },
    dateTime: {
      due: moment(),
      misc: new Map()
    },
    tags: new Set(['tag3']),
    list: {
      visual: 'test theme-defined markers.md',
      rawText: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: uuid()
  },
  {
    status: 'unplanned',
    priority: 'low',
    content: {
      rawText: '- [>] Rescheduled',
      title: 'Rescheduled'
    },
    dateTime: {
      due: moment(),
      misc: new Map()
    },
    tags: new Set(['tag3']),
    list: {
      visual: 'test theme-defined markers.md',
      rawText: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: uuid()
  },
  {
    status: 'scheduled',
    priority: 'low',
    content: {
      rawText: '- [>] Rescheduled',
      title: 'Rescheduled'
    },
    dateTime: {
      due: moment(),
      misc: new Map()
    },
    tags: new Set(['tag3']),
    list: {
      visual: 'test theme-defined markers.md',
      rawText: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: uuid()
  }
]

const meta = {
  title: 'Example/TimelineView',
  component: TimelineView,
  tags: ['autodocs'],
  args: {
    initialItems: []
  }
} satisfies Meta<typeof TimelineView>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialItems: TodoList,
    initialTaskLists: [
      { rawText: 'list1', visual: 'list1' },
      { rawText: 'list2', visual: 'list2' }
    ],
    onItemAdd: (item) => TodoList.push(item),
    onItemChange: (item) =>
      (TodoList = TodoList.map((v) => (v.uuid === item.uuid ? item : v))),
    onItemRemove: (item) =>
      (TodoList = TodoList.filter((v) => v.uuid !== item.uuid))
  }
}

export const Empty: Story = {
  args: { initialItems: [], initialTaskLists: [] }
}
