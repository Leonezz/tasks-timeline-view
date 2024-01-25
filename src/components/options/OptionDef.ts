import { iconMap } from '../asserts/icons'

export type DateIconStyles = 'monthday' | 'weekday' | 'weekdayicon'

export const TimelineOption = {
    forwardUnfinishedTasks: false as boolean,
    dateIconStyle: 'monthday' as DateIconStyles,
    todayFocus: false as boolean
}

export type TimelineOptionType = typeof TimelineOption

export type TaskStatusDef = {
    label: string
    icon: JSX.Element | string
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
            label: 'Done',
            icon: iconMap.doneIcon,
            color: 'success',
            isDoneType: true,
            isAlertType: false,
            marker: 'x'
        },
        {
            label: 'Scheduled',
            icon: iconMap.scheduledIcon,
            color: 'secondary',
            isDoneType: false,
            isAlertType: false,
            marker: '<'
        },
        {
            label: 'Todo',
            icon: iconMap.taskIcon,
            color: 'warning',
            isDoneType: false,
            isAlertType: false,
            marker: ' '
        },
        {
            label: 'Overdue',
            icon: iconMap.alertIcon,
            color: 'danger',
            isDoneType: false,
            isAlertType: true,
            marker: ''
        },
        {
            label: 'Cancelled',
            icon: iconMap.cancelledIcon,
            color: 'secondary',
            isDoneType: true,
            isAlertType: false,
            marker: '-'
        },
        {
            label: 'Unplanned',
            icon: iconMap.unplannedIcon,
            color: 'default',
            isDoneType: false,
            isAlertType: false,
            marker: ' '
        }
    ] as TaskStatusDef[]
}

export type TaskStatusConfigType = typeof TaskStatusConfig
