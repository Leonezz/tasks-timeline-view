import { useCallback } from 'react'
import { Button, Textarea } from '@nextui-org/react'
import { useState } from 'react'
import moment from 'moment'
import { DatePickerListPopover } from './DatePickerListPopover'

import { useTaskPriorityConfig, useVaultConfig } from '../options/GlobalOption'
import {
  TrivialSingleSelect,
  DropdownStyleSingleSelectItem
} from './TrivialSingleSelect'
import { TaskPriorityDef } from '../options/OptionDef'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import {
  GlobalEmptyItem,
  TaskItem,
  TaskItemDateTime,
  TaskPriority
} from '../../@types/task-item'
import { FileIcon } from '../asserts/icons/file'
// import { BUS } from '../../datastore/todoStoreEvents'

const CategorySelect = ({
  initialCategory,
  setCategory
}: {
  initialCategory: string
  setCategory: (c: string) => void
}) => {
  const { getAllCategories } = useVaultConfig()
  const categoryOptions = getAllCategories()
  return (
    <TrivialSingleSelect
      options={categoryOptions}
      selectedKeys={new Set([initialCategory])}
      setSelectedKey={setCategory}
      icon={<FileIcon />}
      ariaLabel='Category'
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
    .map(
      (v: TaskPriorityDef) =>
        ({
          label: v.priority,
          icon: <v.icon />,
          color: v.color
        }) satisfies DropdownStyleSingleSelectItem
    )
  const Icon = getPriorityIcon(initialPriority)
  return (
    <TrivialSingleSelect
      options={prioritySelectOptions}
      selectedKeys={new Set([initialPriority])}
      setSelectedKey={(key) => setPriority(key as TaskPriority)}
      icon={<Icon />}
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

  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('no')

  const { add } = useTodoItemStore()

  const handleSubmitNewTask = useCallback(() => {
    if (text.trim().length === 0) return
    const newItem = {
      ...GlobalEmptyItem,
      ...{
        content: {
          rawText: text,
          visual: text
        },
        position: {
          visual: category
        },
        dateTime: { ...dates, created: moment() },
        priority: priority,
        status: 'todo'
      }
    } satisfies TaskItem
    add({ item: newItem })
    // BUS.emit('AddTaskItem', newItem)
  }, [text, dates, category, priority, add])

  return (
    <div>
      <Textarea
        value={text}
        onValueChange={setText}
        placeholder='Add a new task here'
        className='w-full text-medium'
      />
      <div className='mt-1.5 flex justify-between'>
        <div className='flex items-center gap-0'>
          <CategorySelect
            initialCategory={category}
            setCategory={setCategory}
          />
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
