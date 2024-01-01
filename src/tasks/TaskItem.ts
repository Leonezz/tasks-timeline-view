export interface TaskItemDateTime {
    /** If present, then the time that this task was created. */
    created?: moment.Moment;
    /** If present, then the time that this task was due. */
    due?: moment.Moment;
    /** If present, then the time that this task was completed. */
    completion?: moment.Moment;
    /** If present, then the day that this task can be started. */
    start?: moment.Moment;
    /** If present, then the day that work on this task is scheduled. */
    scheduled?: moment.Moment;
    /** MISC dates */
    misc: Map<string, moment.Moment>;


}

interface Loc {
    line: number,
    col: number,
    offset: number,
}

interface Pos {
    start: Loc,
    end: Loc,
}

interface TaskItemPosition {
    visual: string,
    filePath?: string,
    filePos?: Pos,
}

interface TaskItemContent {
    rawText: string,
    visual: string,
    description?: string,
}

export enum BasicTaskItemStatus {
    "Done", // tasks that are completed
    "Scheduled", // tasks that are not yet started
    "Todo", // tasks that are not completed but already started
    "Overdue", // tasks that are not completed after the due date
    "Cancelled", // tasks that are not completed and cancelled
    "Unplanned" // tasks that have no dates assigned
}

export enum BasicTaskItemPriority {
    "High",
    "Medium",
    "No",
    "Low",
}

export interface TaskItem {
    /**
     * Date time infomation of a task item
     */
    dateTime: TaskItemDateTime;
    /**
     * recurrence
     */
    recurrence?: string;
    /**
     * Task item status
     */
    status: BasicTaskItemStatus;
    /**
     * Task item priority
     */
    priority: BasicTaskItemPriority;
    content: TaskItemContent;
    location?: string;
    /**
     * Tags
     */
    tags: Set<string>;
    /**
     * The position where the item is
     */
    position: TaskItemPosition;
    /**
     * MISC metadate
     */
    meta: Record<string, string>;
}

export default function getTaskDateList(item: TaskItem) {
    if (!item.dateTime) return [];
    const dateTime = item.dateTime;
    const dates = [];
    dateTime.created && dates.push(dateTime.created);
    dateTime.start && dates.push(dateTime.start);
    dateTime.scheduled && dates.push(dateTime.scheduled);
    dateTime.completion && dates.push(dateTime.completion);
    dateTime.due && dates.push(dateTime.due);
    dateTime.misc && dates.concat([...dateTime.misc.values()]);
    return dates;
}