import type { TaskItem, TaskPriority, TaskStatus } from '../../@types/task-item'
import type { SortOptions } from '../../util/task-item/sort'

export interface FilterSortOptions {
  tags: Set<string>
  lists: Set<TaskItem['list']>
  priorities: Set<TaskPriority>
  status: Set<TaskStatus>
  sortCmp: readonly SortOptions[]
  reversed: boolean
}

export interface SelectedFilterSortOptions {
  tags: Set<string>
  lists: Set<TaskItem['list']>
  priorities: Set<TaskPriority>
  status: Set<TaskStatus>
  sortCmp: SortOptions
  reversed: boolean
}
