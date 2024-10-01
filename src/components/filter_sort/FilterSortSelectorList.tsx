import { useEffect, useMemo, useState, Fragment } from 'react'
import FilterSelector from './FilterSelector'
import SortOptionSelector from './SortSelector'
import { FilterSortOptions, SelectedFilterSortOptions } from './types'

function FilterSelectorList({
  options,
  selectedFilters,
  setSelectedFilters
}: {
  options: FilterSortOptions
  selectedFilters: SelectedFilterSortOptions
  setSelectedFilters: (filters: SelectedFilterSortOptions) => void
}) {
  const [filterTags, setFilterTags] = useState<string[]>(selectedFilters.tags)
  const [filterFiles, setFilterFiles] = useState<string[]>(
    selectedFilters.files
  )
  const [filterPriorities, setFilterPriorities] = useState<string[]>(
    selectedFilters.priorities
  )
  const [filterStatus, setFilterStatus] = useState<string[]>(
    selectedFilters.status
  )
  const [sortCmp, setSortCmp] = useState(selectedFilters.sortCmp)
  const [sortReversed, setSortReversed] = useState<boolean>(
    selectedFilters.reversed
  )

  useEffect(() => {
    setSelectedFilters({
      tags: filterTags,
      files: filterFiles,
      priorities: filterPriorities,
      status: filterStatus,
      sortCmp: sortCmp,
      reversed: sortReversed
    })
  }, [
    filterTags,
    filterFiles,
    filterPriorities,
    filterStatus,
    sortCmp,
    sortReversed
  ])

  const BuildFilterSelector = (
    label: string,
    options: string[],
    selectd: string[],
    setSelected: (s: string[]) => void
  ) =>
    options && options.length > 0 ? (
      <FilterSelector
        key={label}
        label={label}
        options={options}
        selectedOptions={selectd}
        setSelectedOptions={setSelected}
      />
    ) : (
      <Fragment />
    )

  const TagFilterSelector = useMemo(
    () => BuildFilterSelector('Tags', options.tags, filterTags, setFilterTags),
    [options.tags, filterTags]
  )
  const FileFilterSelector = useMemo(
    () =>
      BuildFilterSelector('Files', options.files, filterFiles, setFilterFiles),
    [options.files, filterFiles]
  )
  const PriorityFilterSelector = useMemo(
    () =>
      BuildFilterSelector(
        'Priority',
        options.priorities,
        filterPriorities,
        setFilterPriorities
      ),
    [options.priorities, filterPriorities]
  )
  const StatusFilterSelector = useMemo(
    () =>
      BuildFilterSelector(
        'Status',
        options.status,
        filterStatus,
        setFilterStatus
      ),
    [options.status, filterStatus]
  )

  const SortOptionSelectorCached = useMemo(
    () => (
      <SortOptionSelector
        options={options.sortCmp}
        label='Sort'
        selectedOption={sortCmp}
        setSelectedOption={setSortCmp}
        reversed={sortReversed}
        setReversed={setSortReversed}
      />
    ),
    [options.sortCmp, sortCmp, sortReversed]
  )

  return (
    <div className='flex flex-wrap gap-2 px-2'>
      {TagFilterSelector}
      {FileFilterSelector}
      {PriorityFilterSelector}
      {StatusFilterSelector}
      {SortOptionSelectorCached}
    </div>
  )
}

export default FilterSelectorList
