import type { ComponentType } from 'react'
import type { TaskPriority } from '../../@types/task-item'
import { PriorityIcon } from '../asserts/icons/priority'
import { TaskIcon } from '../asserts/icons/task'
import type {
  TaskPriorityConfigType,
  TaskPriorityDef,
  TaskStatusConfigType,
  TaskStatusDef,
  TimelineOptionType
} from './OptionDef'
import {
  TaskPriorityConfig,
  TaskStatusConfig,
  TimelineOption
} from './OptionDef'
import { create } from 'zustand'

type GeneralOptionActions = {
  setForwardUnfinishedTasks: (forward: boolean) => void
  setDateIconStyle: (style: typeof TimelineOption.dateIconStyle) => void
  setTodayFocus: (focus: boolean) => void
}

export const useGeneralOption = create<
  TimelineOptionType & GeneralOptionActions
>((set) => ({
  forwardUnfinishedTasks: TimelineOption.forwardUnfinishedTasks,
  setForwardUnfinishedTasks: (forward: boolean) =>
    set(() => ({ forwardUnfinishedTasks: forward })),
  dateIconStyle: TimelineOption.dateIconStyle,
  setDateIconStyle: (style) => set(() => ({ dateIconStyle: style })),

  todayFocus: TimelineOption.todayFocus,
  setTodayFocus: (focus) => set(() => ({ todayFocus: focus }))
}))

type TaskStatusConfigActions = {
  getIconFromStatus: (
    status: string
  ) => ComponentType<{ width?: number; height?: number }>
  getStatusColor: (status: string) => string
  isStatusDoneType: (status: string) => boolean
}

export const useTaskStatusConfig = create<
  TaskStatusConfigType & TaskStatusConfigActions
>((set, get) => ({
  statusConfigs: TaskStatusConfig.statusConfigs,
  getIconFromStatus: (status: string) => {
    const configs: TaskStatusDef[] = get().statusConfigs
    const config = configs.filter((item) => item.status === status)
    if (config.length === 0) {
      return TaskIcon
    }
    return config[0].icon
  },
  getStatusColor: (status: string) => {
    const configs: TaskStatusDef[] = get().statusConfigs
    const config = configs.filter((item) => item.status === status)
    if (config.length === 0) return 'default'
    return config[0].color || ''
  },
  isStatusDoneType: (status: string) => {
    const configs: TaskStatusDef[] = get().statusConfigs
    const config = configs.filter((item) => item.status === status)
    if (config.length === 0) return false
    return config[0].isDoneType
  }
}))

type TaskPriorityConfigActions = {
  getTaskPriorityLabels: () => string[]
  getPriorityIcon: (
    p: TaskPriority
  ) => ComponentType<{ width?: number; height?: number }>
  getPriorityColor: (p: TaskPriority) => string
  getPrioritySort: (p: TaskPriority) => number
}

export const useTaskPriorityConfig = create<
  TaskPriorityConfigType & TaskPriorityConfigActions
>((set, get) => ({
  priorityConfigs: TaskPriorityConfig.priorityConfigs,
  getTaskPriorityLabels: () =>
    get().priorityConfigs.map((config: TaskPriorityDef) => config.priority),
  getPriorityIcon: (p: TaskPriority) => {
    const config = get().priorityConfigs.filter(
      (config: TaskPriorityDef) => config.priority === p
    )
    if (config.length !== 1) {
      return PriorityIcon
    }

    return config[0].icon
  },
  getPriorityColor: (p: string) => {
    const config = get().priorityConfigs.filter(
      (config: TaskPriorityDef) => config.priority === p
    )
    if (config.length !== 1) return 'default'
    return config[0].color || 'default'
  },
  getPrioritySort: (p: string) => {
    const config = get().priorityConfigs.filter(
      (config: TaskPriorityDef) => config.priority === p
    )
    if (config.length !== 1) {
      return 0
    }
    return config[0].sortBy
  }
}))
