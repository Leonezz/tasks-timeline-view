import { TaskItem } from "../tasks/TaskItem"

export enum EVENTS {
    ChangeTaskProperty = 'changeTaskStatus',
    AddTaskItem = 'addTaskItem'
}

interface TaskItemEventParam {
    uuid: string
}

export interface ChangeTaskPropertyParam extends TaskItemEventParam {
    change: Partial<TaskItem>
}
