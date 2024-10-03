import { RRule } from 'rrule'

export interface TaskItemDateTime {
  /** If present, then the time that this task was created. */
  created?: moment.Moment
  /** If present, then the time that this task was due. */
  due?: moment.Moment
  /** If present, then the time that this task was completed. */
  completion?: moment.Moment
  /** If present, then the day that this task can be started. */
  start?: moment.Moment
  /** If present, then the day that work on this task is scheduled. */
  scheduled?: moment.Moment
  /** MISC dates */
  misc?: Map<string, moment.Moment>
}

type TaskList = {
  rawText: string
  visual: string
}

type TaskItemContent = {
  rawText: string
  title: string
  detail?: string
}

// export enum BasicTaskItemPriority {
//     High = 'High',
//     Medium = 'Medium',
//     No = 'No',
//     Low = 'Low'
// }

export const TaskStatus = [
  'done',
  'scheduled',
  'todo',
  'overdue',
  'cancelled',
  'unplanned'
] as const
export type TaskStatus = (typeof TaskStatus)[number]

export const TaskPriorities = ['high', 'medium', 'no', 'low'] as const
export type TaskPriority = (typeof TaskPriorities)[number]

export interface TaskItem {
  /**
   * Date time infomation of a task item
   */
  dateTime: TaskItemDateTime
  /**
   * recurrence
   */
  recurrence?: RRule
  /**
   * Task item status
   */
  status: TaskStatus
  /**
   * Task item priority
   */
  priority: TaskPriority
  content: TaskItemContent
  /**
   * Tags
   */
  tags: Set<string>
  /**
   * The position where the item is
   */
  list: TaskList
  /**
   * MISC metadate
   */
  meta: Record<string, string>
  uuid: string
}

export const GlobalEmptyItem: TaskItem = {
  dateTime: {},
  status: 'todo',
  priority: 'no',
  content: {
    rawText: '',
    title: ''
  },
  tags: new Set(),
  list: {
    visual: '',
    rawText: ''
  },
  meta: {},
  uuid: ''
}
