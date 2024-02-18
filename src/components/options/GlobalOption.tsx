import { iconMap, priorityIcon } from '../asserts/icons'
import React from 'react'
import {
    TaskPriorityConfig,
    TaskPriorityConfigType,
    TaskPriorityDef,
    TaskStatusConfig,
    TaskStatusConfigType,
    TaskStatusDef,
    TimelineOption,
    TimelineOptionType,
    VaultConfig,
    VaultConfigType
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
    getIconFromStatus: (status: string) => JSX.Element
    getStatusColor: (status: string) => string
    isStatusDoneType: (status: string) => boolean
}

export const useTaskStatusConfig = create<
    TaskStatusConfigType & TaskStatusConfigActions
>((set, get) => ({
    statusConfigs: TaskStatusConfig.statusConfigs,
    getIconFromStatus: (status: string) => {
        const configs: TaskStatusDef[] = get().statusConfigs
        const config = configs.filter((item) => item.label === status)
        if (config.length === 0) return iconMap.taskIcon
        const icon = config[0].icon
        if (typeof icon === 'string') {
            return <img src={icon} />
        }
        return icon
    },
    getStatusColor: (status: string) => {
        const configs: TaskStatusDef[] = get().statusConfigs
        const config = configs.filter((item) => item.label === status)
        if (config.length === 0) return 'default'
        return config[0].color || ''
    },
    isStatusDoneType: (status: string) => {
        const configs: TaskStatusDef[] = get().statusConfigs
        const config = configs.filter((item) => item.label === status)
        if (config.length === 0) return false
        return config[0].isDoneType
    }
}))

type VaultConfigActions = {
    getAllCategories: () => string[]
    setAllCategories: (c: string[]) => void
}

export const useVaultConfig = create<VaultConfigType & VaultConfigActions>(
    (set, get) => ({
        allCategories: VaultConfig.allCategories,
        getAllCategories: () => {
            return get().allCategories
        },
        setAllCategories: (categoryList: string[]) =>
            set(() => ({ allCategories: categoryList }))
    })
)

type TaskPriorityConfigActions = {
    getTaskPriorityLabels: () => string[]
    getPriorityIcon: (p: string) => JSX.Element
    getPriorityColor: (p: string) => string
    getPrioritySort: (p: string) => number
}

export const useTaskPriorityConfig = create<
    TaskPriorityConfigType & TaskPriorityConfigActions
>((set, get) => ({
    priorityConfigs: TaskPriorityConfig.priorityConfigs,
    getTaskPriorityLabels: () =>
        get().priorityConfigs.map((config: TaskPriorityDef) => config.label),
    getPriorityIcon: (p: string) => {
        const config = get().priorityConfigs.filter(
            (config: TaskPriorityDef) => config.label === p
        )
        if (config.length !== 1) return priorityIcon
        if (typeof config[0].icon === 'string')
            return <img src={config[0].icon} />
        return config[0].icon
    },
    getPriorityColor: (p: string) => {
        const config = get().priorityConfigs.filter(
            (config: TaskPriorityDef) => config.label === p
        )
        if (config.length !== 1) return 'default'
        return config[0].color || 'default'
    },
    getPrioritySort: (p: string) => {
        const config = get().priorityConfigs.filter(
            (config: TaskPriorityDef) => config.label === p
        )
        if (config.length !== 1) return 0
        return config[0].sortBy
    }
}))
