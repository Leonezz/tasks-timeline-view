import moment from 'moment'
import { TaskItem } from '../../@types/task-item'

export const TodoList: TaskItem[] = [
  {
    status: 'done',
    priority: 'high',
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
    status: 'cancelled',
    priority: 'high',
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
    status: 'done',
    priority: 'medium',
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
    status: 'overdue',
    priority: 'low',
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
    status: 'todo',
    priority: 'low',
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
    status: 'unplanned',
    priority: 'low',
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
    status: 'scheduled',
    priority: 'low',
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
