export enum EVENTS {
    ChangeTaskStauts = 'changeTaskStatus',
    AddTaskItem = 'addTaskItem'
}

interface TaskItemEventParam {
    uuid: string
}

export interface ChangeTaskStautsParam extends TaskItemEventParam {
    newStatus: string
}
