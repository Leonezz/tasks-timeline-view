import EventEmitter from 'events'
import { TaskItem } from '../tasks/TaskItem'

export type EVENT_MAP = {
  ChangeTaskProperty: [uuid: string, change: Partial<TaskItem>]
  AddTaskItem: [item: TaskItem]
}

export const BUS = new EventEmitter<EVENT_MAP>({
  captureRejections: true
})
