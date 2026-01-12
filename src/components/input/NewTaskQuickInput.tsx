import { useCallback, useMemo } from 'react'
import { Button, Textarea } from '@heroui/react'
import { useState } from 'react'
import moment from 'moment'
import { DatePickerListPopover } from './DatePickerListPopover'

import { useTaskPriorityConfig } from '../options/GlobalOption'
import type { DropdownStyleSingleSelectItem } from './TrivialSingleSelect'
import { TrivialSingleSelect } from './TrivialSingleSelect'
import type { TaskPriorityDef } from '../options/OptionDef'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import type {
  TaskItem,
  TaskItemDateTime,
  TaskPriority
} from '../../@types/task-item'
import { GlobalEmptyItem } from '../../@types/task-item'
import { FileIcon } from '../asserts/icons/file'
import { useVaultConfigStore } from '../../datastore/useValutConfigStore'
import { uniqueBy } from '../../util/arrray/unique'
// import { BUS } from '../../datastore/todoStoreEvents'

const CategorySelect = ({
  initialCategory,
  setCategory
}: {
  initialCategory: TaskItem['list']
  setCategory: (c: TaskItem['list']) => void
}) => {
  const predefinedLists = useVaultConfigStore((state) => state.taskLists)
  const itemLists = uniqueBy(
    useTodoItemStore((state) => state.getAll().map((v) => v.list)),
    (v) => v.rawText + v.visual
  )
  const taskListOptions = [...predefinedLists, ...itemLists]
  return (
    <TrivialSingleSelect
      options={taskListOptions.map((v) => v.rawText)}
      selectedKeys={new Set([initialCategory.rawText])}
      setSelectedKey={(key) => {
        const selectedItem = taskListOptions.filter((v) => v.rawText === key)
        if (selectedItem.length === 1) {
          setCategory(selectedItem[0])
        }
      }}
      icon={FileIcon} // Pass ComponentType
      ariaLabel='List'
    />
  )
}

const PrioritySelect = ({
  initialPriority,
  setPriority
}: {
  initialPriority: TaskPriority
  setPriority: (p: TaskPriority) => void
}) => {
  const { priorityConfigs, getPriorityIcon } = useTaskPriorityConfig()
  const prioritySelectOptions = priorityConfigs
    .sort((l: TaskPriorityDef, r: TaskPriorityDef) => r.sortBy - l.sortBy)
    .map((v: TaskPriorityDef) => {
      // v.icon is ComponentType
      return {
        label: v.priority,
        icon: v.icon, // Pass ComponentType directly
        color: v.color
      } satisfies DropdownStyleSingleSelectItem
    })
  const iconComponent = useMemo(
    () => getPriorityIcon(initialPriority), // This returns ComponentType
    [initialPriority, getPriorityIcon]
  )
  return (
    <TrivialSingleSelect
      options={prioritySelectOptions}
      selectedKeys={new Set([initialPriority])}
      setSelectedKey={(key) => setPriority(key as TaskPriority)}
      icon={iconComponent} // Pass ComponentType
      ariaLabel='Priority'
    />
  )
}

export const NewTaskQuickInput = ({
  onCancel,
  onAdd,
  initialDate
}: {
  onCancel: () => void
  onAdd: () => void
  initialDate?: moment.Moment
}) => {
  const [text, setText] = useState('')

  initialDate = initialDate || moment()

  const [dates, setDates] = useState({
    start: initialDate,
    due: initialDate
  } as TaskItemDateTime)

  const [list, setList] = useState<TaskItem['list']>({
    rawText: '',
    visual: ''
  })
  const [priority, setPriority] = useState<TaskPriority>('no')

  const { add } = useTodoItemStore()

  const handleSubmitNewTask = useCallback(() => {
    if (text.trim().length === 0) return
    const newItem: TaskItem = {
      ...GlobalEmptyItem,
      ...{
        content: {
          rawText: text,
          title: text
        },
        list: list,
        dateTime: { ...dates, created: moment() },
        priority: priority,
        status: 'todo'
      }
    }
    add({ item: newItem })
    // BUS.emit('AddTaskItem', newItem)
  }, [text, dates, list, priority, add])

  return (
    <div>
      <Textarea
        value={text}
        onValueChange={setText}
        placeholder='Add a new task here'
        className='text-medium w-full'
      />
      <div className='mt-1.5 flex justify-between'>
        <div className='flex items-center gap-0'>
          <CategorySelect initialCategory={list} setCategory={setList} />
          <PrioritySelect
            initialPriority={priority}
            setPriority={setPriority}
          />
          <DatePickerListPopover initialDates={dates} summitDates={setDates} />
        </div>
        <div className='flex items-center gap-1.5'>
          <Button variant='light' color='danger' onClick={onCancel}>
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={() => {
              handleSubmitNewTask()
              onAdd()
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
