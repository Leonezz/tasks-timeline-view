import { useCallback, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import TrivialSingleSelect from './TrivialSingleSelect'
import { enterIcon, iconMap } from '../asserts/icons'
import DatePickerListPopover from './DatePickerListPopover'
import { GlobalEmptyItem, TaskItem } from '../../tasks/TaskItem'
import { TaskItemParser } from '../../tasks/TaskItemUtil'
import moment from 'moment'
import { useTodoItemStore } from '../../datastore/useTodoStore'
// import { BUS } from '../../datastore/todoStoreEvents'

function InputPanel({
  newItemDestinationOptions,
  priorityOptions
}: {
  newItemDestinationOptions: string[]
  priorityOptions?: string[]
}) {
  const [taskItem, setTaskItem] = useState<TaskItem>(GlobalEmptyItem)
  const { add } = useTodoItemStore()
  const summitTaskItem = useCallback(() => {
    if (taskItem.content.rawText.trim().length === 0) return
    add({ item: taskItem })
    // BUS.emit('AddTaskItem', taskItem)
  }, [taskItem])

  taskItem.content.rawText = TaskItemParser.generateTaskItemRawText(taskItem)

  priorityOptions = priorityOptions || ['No', 'Low', 'Mid', 'High']

  return (
    <Input
      id='task-input'
      label={taskItem.content.rawText}
      labelPlacement='outside'
      size='sm'
      classNames={{
        base: 'px-2 h-fit',
        label: 'w-full pl-1 font-mono text-sm',
        input: 'p-2 w-full absolute',
        innerWrapper: 'justify-end p-0 border-none',
        inputWrapper: 'p-0 h-fit'
      }}
      value={taskItem?.content.visual}
      onValueChange={(v) => {
        setTaskItem(
          (prev) =>
            ({
              ...prev,
              content: {
                visual: v
              }
            }) as TaskItem
        )
      }}
      placeholder='new tasks'
      endContent={
        <div className='relative flex items-center gap-0 border-0 bg-transparent outline-none'>
          <TrivialSingleSelect
            key={'destination'}
            icon={iconMap.fileIcon}
            ariaLabel='List'
            options={newItemDestinationOptions}
            selectedKeys={new Set(taskItem?.position.visual)}
            setSelectedKey={(v: string) => {
              setTaskItem(
                (prev) =>
                  ({
                    ...prev,
                    position: {
                      visual: v
                    }
                  }) as TaskItem
              )
            }}
          />
          <TrivialSingleSelect
            key={'priorities'}
            ariaLabel='Priority'
            icon={iconMap.priorityIcon}
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
            startContent={enterIcon}
            onClick={summitTaskItem}
          />
        </div>
      }
    />
  )
}

export default InputPanel
