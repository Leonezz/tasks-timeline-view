import moment from 'moment'
import { BasicTaskItemPriority, TaskItem } from 'tasks-timeline-view'

export const TodoList: TaskItem[] = [
    {
        status: 'Done',
        priority: BasicTaskItemPriority.High,
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
        meta: {}
    },
    {
        status: 'Cancelled',
        priority: BasicTaskItemPriority.High,
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
        meta: {}
    },
    {
        status: 'Done',
        priority: BasicTaskItemPriority.Medium,
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
        meta: {}
    },
    {
        status: 'Overdue',
        priority: BasicTaskItemPriority.Low,
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
        meta: {}
    },
    {
        status: 'Todo',
        priority: BasicTaskItemPriority.Low,
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
        meta: {}
    },
    {
        status: 'Unplanned',
        priority: BasicTaskItemPriority.Low,
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
        meta: {}
    },
    {
        status: 'Scheduled',
        priority: BasicTaskItemPriority.Low,
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
        meta: {}
    }
]
