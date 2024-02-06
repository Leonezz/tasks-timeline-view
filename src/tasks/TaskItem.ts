import { RRule } from "rrule"

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
    misc: Map<string, moment.Moment>
}

interface Loc {
    line: number
    col: number
    offset: number
}

interface Pos {
    start: Loc
    end: Loc
}

interface TaskItemPosition {
    visual: string
    filePath?: string
    filePos?: Pos
}

interface TaskItemContent {
    rawText: string
    visual: string
    description?: string
}

export enum BasicTaskItemPriority {
    High = 'High',
    Medium = 'Medium',
    No = 'No',
    Low = 'Low'
}

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
    status: string
    /**
     * Task item priority
     */
    priority: string
    content: TaskItemContent
    location?: string
    /**
     * Tags
     */
    tags: Set<string>
    /**
     * The position where the item is
     */
    position: TaskItemPosition
    /**
     * MISC metadate
     */
    meta: Record<string, string>
    uuid: string
}

export const GlobalEmptyItem = {
    dateTime: {} as TaskItemDateTime,
    status: '',
    priority: '',
    content: {
        rawText: '',
        visual: ''
    } as TaskItemContent,
    tags: new Set(),
    position: {
        visual: ''
    } as TaskItemPosition,
    meta: {},
    uuid: ''
} as TaskItem
