import { useCallback, useState } from 'react'
import { Button, Input } from '@heroui/react'
import { TrivialSingleSelect } from './TrivialSingleSelect'
import { DatePickerListPopover } from './DatePickerListPopover'
import moment from 'moment'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import type { TaskItem } from '../../@types/task-item'
import { GlobalEmptyItem } from '../../@types/task-item'
import { TaskItemParser } from '../../tasks/TaskItemUtil'
import { FileIcon } from '../asserts/icons/file'
import { PriorityIcon } from '../asserts/icons/priority'
import { EnterIcon } from '../asserts/icons/enter'
// import { BUS } from '../../datastore/todoStoreEvents'

export const InputPanel = ({
  newItemDestinationOptions,
  priorityOptions
}: {
  newItemDestinationOptions: string[]
  priorityOptions?: string[]
}) => {
  const [taskItem, setTaskItem] = useState<TaskItem>(GlobalEmptyItem)
  const { add } = useTodoItemStore()
  const summitTaskItem = useCallback(() => {
    if (taskItem.content.title.trim().length === 0) return
    const newItem = {
      ...taskItem,
      content: {
        ...taskItem.content,
        rawText: TaskItemParser.generateTaskItemRawText(taskItem)
      }
    }
    add({ item: newItem })
    // BUS.emit('AddTaskItem', taskItem)
  }, [taskItem, add])

  priorityOptions = priorityOptions || ['No', 'Low', 'Mid', 'High']

  return (
    <Input
      id='task-input'
      label={TaskItemParser.generateTaskItemRawText(taskItem)}
      labelPlacement='outside'
      size='sm'
      classNames={{
        base: 'px-2 h-fit',
        label: 'w-full pl-1 font-mono text-sm',
        input: 'p-2 w-full absolute',
        innerWrapper: 'justify-end p-0 border-none',
        inputWrapper: 'p-0 h-fit'
      }}
      value={taskItem.content.title}
      onValueChange={(v) => {
        setTaskItem((prev) => ({
          ...prev,
          content: {
            ...prev.content,
            title: v
          }
        }))
      }}
      placeholder='new tasks'
      endContent={
        <div className='relative flex items-center gap-0 border-0 bg-transparent outline-none'>
          <TrivialSingleSelect
            key={'destination'}
            icon={<FileIcon />}
            ariaLabel='List'
            options={newItemDestinationOptions}
            selectedKeys={new Set(taskItem?.list.visual)}
            setSelectedKey={(v: string) => {
              setTaskItem((prev) => ({
                ...prev,
                list: {
                  ...prev.list,
                  visual: v
                }
              }))
            }}
          />
          <TrivialSingleSelect
            key={'priorities'}
            ariaLabel='Priority'
            icon={<PriorityIcon />}
            options={priorityOptions}
            selectedKeys={new Set(taskItem?.priority)}
            setSelectedKey={(v: string) => {
              setTaskItem(
                (prev) =>
                  ({
                    ...prev,
                    priority: v
                  }) as TaskItem
              )
            }}
          />
          <DatePickerListPopover
            initialDates={{
              start: moment(),
              due: moment(),
              misc: new Map()
            }}
            summitDates={(dates) => {
              setTaskItem(
                (prev) =>
                  ({
                    ...prev,

                    dateTime: {
                      ...dates
                    }
                  }) as TaskItem
              )
            }}
          />
          <Button
            isIconOnly
            variant='light'
            size='sm'
            startContent={<EnterIcon />}
            onClick={summitTaskItem}
          />
        </div>
      }
    />
  )
}
