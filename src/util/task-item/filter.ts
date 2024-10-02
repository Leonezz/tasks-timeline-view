import { TaskItem } from '../../@types/task-item'
import { getTaskDateList } from './info'

export const makeDateTimeFilter = (
  date: moment.Moment,
  by: moment.unitOfTime.StartOf
) => {
  return (item: TaskItem) => {
    const dates = getTaskDateList(item).unique()
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
    const dates = getTaskDateList(item).unique()
    if (!dates) return false
    return dates.some((d) => d.isBetween(from, to, by))
  }
}
export const makeDateRangeFilter = (from: moment.Moment, to: moment.Moment) => {
  return makeDateTimeRangeFilter(from, to, 'date')
}

export const makeTagsFilter = (tags: string[]) => {
  return (item: TaskItem) =>
    tags.length === 0 || tags.some((tag) => item.tags.has(tag))
}

export const makePrioritiesFilter = (priorities: string[]) => {
  return (item: TaskItem) =>
    priorities.length === 0 || priorities.includes(item.priority)
}

export const makeStatusFilter = (status: string[]) => {
  return (item: TaskItem) => status.length === 0 || status.includes(item.status)
}
