import { ComponentType } from 'react'
import { ThemeColor } from '../../@types/base'
import { TaskPriority, TaskStatus } from '../../@types/task-item'
import { AlertIcon } from '../asserts/icons/alert'
import { CancelledIcon } from '../asserts/icons/cancelled'
import { DoneIcon } from '../asserts/icons/done'
import { HighPriorityIcon } from '../asserts/icons/high-priority'
import { LowPriorityIcon } from '../asserts/icons/low-priority'
import { MediumPriorityIcon } from '../asserts/icons/medium-priority'
import { PriorityIcon } from '../asserts/icons/priority'
import { ScheduledIcon } from '../asserts/icons/scheduled'
import { TaskIcon } from '../asserts/icons/task'
import { UnplannedIcon } from '../asserts/icons/unplanned'

export type DateIconStyles = 'monthday' | 'weekday' | 'weekdayicon'

export const TimelineOption = {
  forwardUnfinishedTasks: false as boolean,
  dateIconStyle: 'monthday' as DateIconStyles,
  todayFocus: false as boolean
}

export type TimelineOptionType = typeof TimelineOption

export type TaskStatusDef = {
  status: TaskStatus
  icon: ComponentType<{ width?: number; height?: number }>
  color:
    | 'success'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'default'
    | 'primary'
    | undefined
  isDoneType: boolean
  isAlertType: boolean
  marker?: string
}

export const TaskStatusConfig = {
  statusConfigs: [
    {
      status: 'done',
      icon: DoneIcon,
      color: 'success',
      isDoneType: true,
      isAlertType: false,
      marker: 'x'
    },
    {
      status: 'scheduled',
      icon: ScheduledIcon,
      color: 'secondary',
      isDoneType: false,
      isAlertType: false,
      marker: '<'
    },
    {
      status: 'todo',
      icon: TaskIcon,
      color: 'warning',
      isDoneType: false,
      isAlertType: false,
      marker: ' '
    },
    {
      status: 'overdue',
      icon: AlertIcon,
      color: 'danger',
      isDoneType: false,
      isAlertType: true,
      marker: ''
    },
    {
      status: 'cancelled',
      icon: CancelledIcon,
      color: 'secondary',
      isDoneType: true,
      isAlertType: false,
      marker: '-'
    },
    {
      status: 'unplanned',
      icon: UnplannedIcon,
      color: 'default',
      isDoneType: false,
      isAlertType: false,
      marker: ' '
    }
  ] satisfies TaskStatusDef[]
}

export type TaskStatusConfigType = typeof TaskStatusConfig

export const VaultConfig = {
  allCategories: [] as string[]
}

export type VaultConfigType = typeof VaultConfig

export type TaskPriorityDef = {
  priority: TaskPriority
  sortBy: number
  icon: ComponentType<{ width?: number; height?: number }>
  color: ThemeColor
}

export const TaskPriorityConfig = {
  priorityConfigs: [
    {
      priority: 'high',
      sortBy: 100,
      icon: HighPriorityIcon,
      color: 'warning'
    },
    {
      priority: 'medium',
      sortBy: 70,
      icon: MediumPriorityIcon,
      color: 'secondary'
    },
    { priority: 'no', sortBy: 40, icon: PriorityIcon, color: 'default' },
    { priority: 'low', sortBy: 10, icon: LowPriorityIcon, color: 'success' }
  ] satisfies TaskPriorityDef[]
}

export type TaskPriorityConfigType = typeof TaskPriorityConfig
