import { useEffect, useMemo, useState } from 'react'
import { NextUIProvider, ScrollShadow } from '@nextui-org/react'
import moment from 'moment'
import { YearAccordion } from '../year/YearAccordion'
import { FilterSelectorList } from '../filter_sort/FilterSortSelectorList'
import { SelectedFilterSortOptions } from '../filter_sort/types'

import { innerDateFormat, innerDateTimeFormat } from '../../util/defs'
import TodayCard from '../today/TodayCard'
import { useGeneralOption } from '../options/GlobalOption'
import { OptionsPanel } from '../options/OptionsPanel'
import { TimelineOptionType } from '../options/OptionDef'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import {
  makeDateFilter,
  makePrioritiesFilter,
  makeStatusFilter,
  makeTagsFilter
} from '../../util/task-item/filter'
import { makeSortCmp, SortOptions } from '../../util/task-item/sort'
import { getTaskDateList } from '../../util/task-item/info'
import { TaskItem } from '../../@types/task-item'
import '../../../dist/style.css'
import { unique, uniqueBy } from '../../util/arrray/unique'
import { useVaultConfigStore } from '../../datastore/useValutConfigStore'

type TimelineViewProps = {
  initialItems: TaskItem[]
  initialTaskLists: TaskItem['list'][]
  onItemChange?: (item: TaskItem) => void
  onItemAdd?: (item: TaskItem) => void
  onItemRemove?: (item: TaskItem) => void
}
export const TimelineView = ({
  initialItems,
  initialTaskLists,
  onItemAdd,
  onItemChange,
  onItemRemove
}: TimelineViewProps) => {
  console.debug('raw item list: ', initialItems)
  const {
    getAll,
    getTagsSet,
    getStatusSet,
    getPrioritisSet,
    init,
    registerHandlers
  } = useTodoItemStore()

  useEffect(() => {
    if (
      onItemAdd !== undefined &&
      onItemChange !== undefined &&
      onItemRemove !== undefined
    ) {
      registerHandlers({
        onItemAdd: onItemAdd,
        onItemChange: onItemChange,
        onItemRemove: onItemRemove
      })
    }
    init({ items: initialItems })
  }, [
    initialItems,
    init,
    registerHandlers,
    onItemAdd,
    onItemChange,
    onItemRemove,
    initialTaskLists
  ])

  const taskList = getAll()

  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFilterSortOptions>({
      tags: new Set(),
      lists: new Set(),
      priorities: new Set(),
      status: new Set(),
      sortCmp: 'text',
      reversed: false
    })

  const tags = getTagsSet()
  const priorities = getPrioritisSet()
  const status = getStatusSet()

  const lists = useMemo(
    () =>
      new Set(
        uniqueBy(
          taskList.map((v) => v.list),
          (v) => v.rawText + v.visual
        )
      ),
    [taskList]
  )

  const { setTaskLists } = useVaultConfigStore()
  useEffect(() => {
    setTaskLists(new Set(initialTaskLists))
  }, [setTaskLists, initialTaskLists])

  let filteredTaskList = taskList
    .filter(makeTagsFilter(selectedFilters.tags))
    .filter(makePrioritiesFilter(selectedFilters.priorities))
    .filter(makeStatusFilter(selectedFilters.status))
    .sort(makeSortCmp(selectedFilters.sortCmp))
  if (selectedFilters.reversed) {
    filteredTaskList = filteredTaskList.reverse()
  }

  const forwardUnfinishedTasks = useGeneralOption(
    (state: TimelineOptionType) => state.forwardUnfinishedTasks
  )
  if (forwardUnfinishedTasks) {
    filteredTaskList = filteredTaskList.map((t) => {
      if (!t.dateTime?.misc) t.dateTime.misc = new Map()
      t.dateTime.misc.set('forward', moment())
      console.debug('add today to task')
      return t
    })
  } else {
    filteredTaskList = filteredTaskList.map((t) => {
      if (!t.dateTime?.misc) return t
      if (!t.dateTime.misc.has('forward')) return t
      t.dateTime.misc.delete('forward')
      return t
    })
  }

  const sortedInvolvedDates = uniqueBy(
    [
      ...filteredTaskList.flatMap((t) => {
        return getTaskDateList(t)
      }),
      moment()
    ],
    (v) => v.format(innerDateTimeFormat)
  ).sort((a, b) => {
    if (a.isBefore(b)) return -1
    else if (a.isAfter(b)) return 1
    return 0
  })

  const sortedInvolvedYears: number[] = unique(
    sortedInvolvedDates.flatMap((d) => {
      return d.year()
    })
  ).sort((a, b) => b - a)

  console.debug('filtered item list: ', filteredTaskList)
  console.debug('years: ', sortedInvolvedYears, sortedInvolvedDates)
  const yearDateTaskMap: Map<number, Map<string, TaskItem[]>> = new Map(
    sortedInvolvedYears
      .map((y) => {
        return {
          key: y,
          value: new Map(
            sortedInvolvedDates
              .filter((d) => d.year() === y)
              .map((d) => {
                return {
                  key: d.format(innerDateFormat),
                  value: filteredTaskList.filter(makeDateFilter(d))
                }
              })
              .map((e) => [e.key, e.value])
          )
        }
      })
      .map((e) => [e.key, e.value])
  )

  console.debug('data to render: ', yearDateTaskMap)

  //TODO: background color need to adjust according to the theme
  return (
    <NextUIProvider>
      <ScrollShadow
        hideScrollBar
        visibility='bottom'
        className='h-screen max-w-full overflow-clip bg-white pb-5'
      >
        <div className='sticky top-0 z-50 flex min-h-max flex-col gap-2 bg-inherit bg-opacity-0'>
          <OptionsPanel />
          <TodayCard />
          {/* <InputPanel newItemDestinationOptions={['a', 'b', 'ccc']} /> */}
          <FilterSelectorList
            options={{
              tags: tags,
              lists: lists,
              priorities: priorities,
              status: status,
              sortCmp: SortOptions,
              reversed: false
            }}
            selectedFilters={selectedFilters}
            setSelectedFilters={(value) =>
              setSelectedFilters((prev) => ({
                ...prev,
                ...value
              }))
            }
          />
          {/* {forwardUnfinishedTasks}
          <div>
            {selectedFilters.files}
            {selectedFilters.priorities}
            {selectedFilters.status}
            {selectedFilters.tags}
          </div> */}
        </div>
        <div className='relative z-40'>
          {sortedInvolvedYears.map((y) => {
            const tasksOfYear = yearDateTaskMap.get(y)
            return (
              tasksOfYear && (
                <YearAccordion key={y} year={y} dateTaskMap={tasksOfYear} />
              )
            )
          })}
        </div>
      </ScrollShadow>
    </NextUIProvider>
  )
}
