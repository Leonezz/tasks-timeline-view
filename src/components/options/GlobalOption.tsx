import { iconMap } from '../asserts/icons'
import React from 'react'
import {
    TaskStatusConfig,
    TaskStatusConfigType,
    TaskStatusDef,
    TimelineOption,
    TimelineOptionType
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
