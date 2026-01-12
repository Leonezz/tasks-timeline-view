import type { TaskItem } from '../../@types/task-item'

export const SortOptions = ['text', 'due date'] as const
export type SortOptions = (typeof SortOptions)[number]
export const sortByText = (a: TaskItem, b: TaskItem): number => {
  return a.content.title < b.content.title
    ? 1
    : a.content.title === b.content.title
      ? 0
      : -1
}
export const sortByDueDate = (a: TaskItem, b: TaskItem): number => {
  if (!a.dateTime.due || !b.dateTime.due) return 0
  return a.dateTime.due.isBefore(b.dateTime.due)
    ? -1
    : a.dateTime.due.isAfter(b.dateTime.due)
      ? 1
      : 0
}
const sorterMap = {
  text: sortByText,
  'due date': sortByDueDate
}

export const makeSortCmp = (by: SortOptions) => {
  return (a: TaskItem, b: TaskItem) => sorterMap[by](a, b)
}
