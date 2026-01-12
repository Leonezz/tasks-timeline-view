import { Fragment, useMemo } from 'react'
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure
} from '@heroui/react'
import { TaskInfoLine } from './TaskInfoLine'
import { useTaskStatusConfig } from '../options/GlobalOption'

import { TaskItemEditModal } from './EditItemModal'
import moment from 'moment'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import type { TaskItem, TaskStatus } from '../../@types/task-item'
import { EditableText } from '../atomic/EditableText'
import clsx from 'clsx'

const StatusDropdownItem = ({ option, onStatusChange, getIconFromStatus }) => {
  const IconComponent = getIconFromStatus(option.status)
  // Icon is now ComponentType, so pass it directly to startContent
  return (
    <DropdownItem
      startContent={IconComponent}
      key={option.status}
      color={option.color}
      onClick={() => onStatusChange(option.status)}
    >
      {option.status}
    </DropdownItem>
  )
}

const CheckboxIcon = ({
  status,
  item
}: {
  status: TaskStatus
  item: TaskItem
}) => {
  const { statusConfigs, getStatusColor, getIconFromStatus } =
    useTaskStatusConfig()
  const statusColor = getStatusColor(status)

  const { edit } = useTodoItemStore()

  const onStatusChange = (newStatus: TaskStatus) => {
    if (newStatus === status) {
      return
    }
    const newItem: Partial<TaskItem> = { status: newStatus }
    if (newStatus === 'done') {
      newItem.dateTime = { ...item.dateTime, completion: moment() }
    }
    edit({ id: item.uuid, value: newItem })
  }

  const editItemModelDisclosure = useDisclosure()
  const statusIconComponent = useMemo(
    () => getIconFromStatus(status), // Returns ComponentType
    [status, getIconFromStatus]
  )

  return (
    <Fragment>
      <Dropdown placement='right'>
        <DropdownTrigger className='p-0'>
          <Button
            isIconOnly
            className={clsx(
              'h-5 scale-125 bg-transparent p-0 opacity-100',
              `text-${statusColor}`
            )}
          >
            {/* statusIconComponent is ComponentType, so render it */}
            {statusIconComponent ? <statusIconComponent /> : null}
          </Button>
        </DropdownTrigger>
        <DropdownMenu className='relative z-10 p-1' title='Mark as'>
          <DropdownSection className='mb-0'>
            {statusConfigs.map((option: (typeof statusConfigs)[0]) => (
              <StatusDropdownItem
                key={option.status}
                option={option}
                onStatusChange={onStatusChange}
                getIconFromStatus={getIconFromStatus}
              />
            ))}
          </DropdownSection>
          <DropdownSection className='mb-0'>
            <DropdownItem
              key={'k'}
              onClick={() => editItemModelDisclosure.onOpen()}
            >
              Edit
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <TaskItemEditModal item={item} disclosure={editItemModelDisclosure} />
    </Fragment>
  )
}

export const TaskItemCheckbox = ({ item }: { item: TaskItem }) => {
  const taskItemContent = item.content.title
  const itemStatus = item.status
  // const checkboxIcon = TaskStatusUtil.getStatusIcon(itemStatus)

  const { getStatusColor, isStatusDoneType } = useTaskStatusConfig()
  const statusColor = getStatusColor(itemStatus)
  const { edit } = useTodoItemStore()

  return (
    <div className='grid grid-cols-[2em_1fr] grid-rows-[auto_1fr]'>
      <Checkbox
        icon={<CheckboxIcon status={itemStatus} item={item} />}
        classNames={{
          wrapper: 'align-top before:hidden after:hidden w-full',
          label: '!items-top',
          base: 'items-start',
          hiddenInput: 'hidden'
        }}
        className='col-start-1 row-start-1'
      />
      <div
        className={clsx(
          "after:content[''] flex w-full shrink-0 justify-center pt-1 pb-1 after:h-full after:w-[1.5px]",
          `after:bg-${statusColor}`,
          'col-start-1 row-start-2'
        )}
      />
      <div className='text-medium col-start-2 row-start-1 flex h-full w-full max-w-full flex-row items-start justify-between'>
        <EditableText
          classNames={{
            text: `${isStatusDoneType(itemStatus) ? 'line-through' : ''} text-${statusColor}`
          }}
          value={taskItemContent}
          onValueChange={(value) => {
            if (value !== item.content.title) {
              edit({
                id: item.uuid,
                value: { content: { ...item.content, title: value } }
              })
            }
          }}
        />

        <div className='text-default-500 col-start-2 row-start-2 w-fit min-w-fit font-mono text-sm text-nowrap'>
          {item.dateTime?.due?.format('h:m, A') || ''}
        </div>
      </div>
      <TaskInfoLine item={item} />
    </div>
  )
}
