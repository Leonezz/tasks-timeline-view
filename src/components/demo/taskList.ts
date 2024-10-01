import moment from 'moment'
import { TaskItem } from '../../tasks/TaskItem'

export const TodoList: TaskItem[] = [
  {
    status: 'Done',
    priority: 'High',
    content: {
      rawText: '- [x] Unchecked ✅ 2023-11-14',
      visual: 'Unchecked'
    },
    tags: new Set(['#TODO', '#Inbox']),
    dateTime: {
      completion: moment('2023-11-14', 'YYYY-MM-DD'),
      misc: new Map()
    },
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: ''
  },
  {
    status: 'Cancelled',
    priority: 'High',
    content: {
      rawText: '- [x] Unchecked ✅ 2023-11-14',
      visual: 'Unchecked'
    },
    tags: new Set(['#TODO', '#Inbox']),
    dateTime: {
      completion: moment('2023-11-14', 'YYYY-MM-DD'),
      misc: new Map()
    },
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: ''
  },
  {
    status: 'Done',
    priority: 'Medium',
    content: {
      rawText: '- [x] Checked',
      visual: 'Checked'
    },
    tags: new Set(['tag2']),
    dateTime: {
      created: moment('2023-12-14', 'YYYY-MM-DD'),
      misc: new Map()
    },
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: ''
  },
  {
    status: 'Overdue',
    priority: 'Low',
    content: {
      rawText: '- [>] Rescheduled',
      visual: 'Rescheduled'
    },
    dateTime: {
      due: moment(),
      misc: new Map()
    },
    tags: new Set(['tag3']),
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: ''
  },
  {
    status: 'Todo',
    priority: 'Low',
    content: {
      rawText: '- [>] Rescheduled',
      visual: 'Rescheduled'
    },
    dateTime: {
      due: moment(),
      misc: new Map()
    },
    tags: new Set(['tag3']),
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: ''
  },
  {
    status: 'Unplanned',
    priority: 'Low',
    content: {
      rawText: '- [>] Rescheduled',
      visual: 'Rescheduled'
    },
    dateTime: {
      due: moment(),
      misc: new Map()
    },
    tags: new Set(['tag3']),
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: ''
  },
  {
    status: 'Scheduled',
    priority: 'Low',
    content: {
      rawText: '- [>] Rescheduled',
      visual: 'Rescheduled'
    },
    dateTime: {
      due: moment(),
      misc: new Map()
    },
    tags: new Set(['tag3']),
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {},
    uuid: ''
  }
]
