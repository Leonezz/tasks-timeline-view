import { Moment } from 'moment'
import { TaskItem } from '../../@types/task-item'

export const getTaskDateList = (item: TaskItem): Moment[] => {
  if (!item.dateTime) return []
  const dateTime = item.dateTime
  const dates = []
  dateTime.created && dates.push(dateTime.created)
  dateTime.start && dates.push(dateTime.start)
  dateTime.scheduled && dates.push(dateTime.scheduled)
  dateTime.completion && dates.push(dateTime.completion)
  dateTime.due && dates.push(dateTime.due)
  dateTime.misc && dates.push(...dateTime.misc.values())
  return dates
}
