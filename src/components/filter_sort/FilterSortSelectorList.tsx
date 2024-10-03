import { FilterSelector } from './FilterSelector'
import { SortOptionSelector } from './SortSelector'
import { FilterSortOptions, SelectedFilterSortOptions } from './types'

export const FilterSelectorList = ({
  options,
  selectedFilters,
  setSelectedFilters
}: {
  options: FilterSortOptions
  selectedFilters: SelectedFilterSortOptions
  setSelectedFilters: (filters: Partial<SelectedFilterSortOptions>) => void
}) => {
  return (
    <div className='flex flex-wrap gap-2 px-2'>
      <FilterSelector
        label='Tags'
        options={options.tags}
        selectedOptions={selectedFilters.tags}
        setSelectedOptions={(s) => setSelectedFilters({ tags: s })}
      />
      <FilterSelector
        label='List'
        options={options.lists}
        selectedOptions={selectedFilters.lists}
        setSelectedOptions={(s) => setSelectedFilters({ lists: s })}
      />
      <FilterSelector
        label='Priority'
        options={options.priorities}
        selectedOptions={selectedFilters.priorities}
        setSelectedOptions={(s) => setSelectedFilters({ priorities: s })}
      />
      <FilterSelector
        label='Status'
        options={options.status}
        selectedOptions={selectedFilters.status}
        setSelectedOptions={(s) => setSelectedFilters({ status: s })}
      />
      <SortOptionSelector
        label='Sort'
        options={options.sortCmp}
        selectedOption={selectedFilters.sortCmp}
        setSelectedOption={(s) => setSelectedFilters({ sortCmp: s })}
        reversed={selectedFilters.reversed}
        setReversed={(r) => setSelectedFilters({ reversed: r })}
      />
    </div>
  )
}
