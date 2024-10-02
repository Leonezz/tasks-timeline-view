import { SortOptions } from '../../util/task-item/sort'

export interface FilterSortOptions {
  tags: string[]
  files: string[]
  priorities: string[]
  status: string[]
  sortCmp: Readonly<SortOptions[]>
  reversed: boolean
}

export interface SelectedFilterSortOptions {
  tags: string[]
  files: string[]
  priorities: string[]
  status: string[]
  sortCmp: SortOptions
  reversed: boolean
}
