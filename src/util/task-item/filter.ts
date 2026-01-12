import type { TaskItem, TaskPriority, TaskStatus } from '../../@types/task-item'
import { uniqueBy } from '../arrray/unique'
import { innerDateTimeFormat } from '../defs'
import { getTaskDateList } from './info'

export const makeDateTimeFilter = (
  date: moment.Moment,
  by: moment.unitOfTime.StartOf
) => {
  return (item: TaskItem) => {
    const dates = uniqueBy(getTaskDateList(item), (item) =>
      item.format(innerDateTimeFormat)
    )
    if (!dates) return false
    return dates.some((d) => d.isSame(date, by))
  }
}
export const makeDateFilter = (date: moment.Moment) => {
  return makeDateTimeFilter(date, 'date')
}
export const makeYearFilter = (date: moment.Moment) => {
  return makeDateTimeFilter(date, 'year')
}

export const makeDateTimeRangeFilter = (
  from: moment.Moment,
  to: moment.Moment,
  by: moment.unitOfTime.StartOf
) => {
  return (item: TaskItem) => {
    const dates = uniqueBy(getTaskDateList(item), (item) =>
      item.format(innerDateTimeFormat)
    )
    if (!dates) return false
    return dates.some((d) => d.isBetween(from, to, by))
  }
}
export const makeDateRangeFilter = (from: moment.Moment, to: moment.Moment) => {
  return makeDateTimeRangeFilter(from, to, 'date')
}

export const makeTagsFilter = (tags: Set<string>) => {
  return (item: TaskItem) =>
    tags.size === 0 || [...tags].some((tag) => item.tags.has(tag))
}

export const makePrioritiesFilter = (priorities: Set<TaskPriority>) => {
  return (item: TaskItem) =>
    priorities.size === 0 || priorities.has(item.priority)
}

export const makeStatusFilter = (status: Set<TaskStatus>) => {
  return (item: TaskItem) => status.size === 0 || status.has(item.status)
}
