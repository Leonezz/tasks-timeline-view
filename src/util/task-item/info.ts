import type { Moment } from 'moment'
import type { TaskItem } from '../../@types/task-item'

export const getTaskDateList = (item: TaskItem): Moment[] => {
  if (!item.dateTime) return []
  const dateTime = item.dateTime
  const dates = []
  if (dateTime.created) dates.push(dateTime.created)
  if (dateTime.start) dates.push(dateTime.start)
  if (dateTime.scheduled) dates.push(dateTime.scheduled)
  if (dateTime.completion) dates.push(dateTime.completion)
  if (dateTime.due) dates.push(dateTime.due)
  if (dateTime.misc) dates.push(...dateTime.misc.values())
  return dates
}