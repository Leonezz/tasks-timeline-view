import { Fragment } from 'react'
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure
} from '@nextui-org/react'
import { TaskInfoLine } from './TaskInfoLine'
import { useTaskStatusConfig } from '../options/GlobalOption'

import { TaskItemEditModal } from './EditItemModal'
import moment from 'moment'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import { TaskItem, TaskStatus } from '../../@types/task-item'
import { EditableText } from '../atomic/EditableText'

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
  const StatusIcon = getIconFromStatus(status)

  return (
    <Fragment>
      <Dropdown placement='right'>
        <DropdownTrigger className='p-0'>
          <Button
            isIconOnly
            className={
              'h-5 scale-125 bg-transparent p-0 opacity-100' +
              ' text-' +
              statusColor
            }
          >
            <StatusIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className='relative z-10 p-1' title='Mark as'>
          <DropdownSection className='mb-0'>
            {statusConfigs.map((option: (typeof statusConfigs)[0]) => {
              const Icon = getIconFromStatus(option.status)
              return (
                <DropdownItem
                  startContent={<Icon />}
                  key={option.status}
                  color={option.color}
                  onClick={() => onStatusChange(option.status)}
                >
                  {option.status}
                </DropdownItem>
              )
            })}
          </DropdownSection>
          <DropdownSection className='mb-0'>
            <DropdownItem onClick={editItemModelDisclosure.onOpen}>
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

  return (
    <Fragment>
      <div className='flex flex-row justify-between pb-1'>
        <Checkbox
          icon={<CheckboxIcon status={itemStatus} item={item} />}
          isSelected={isStatusDoneType(itemStatus)}
          lineThrough
          classNames={{
            wrapper: 'align-top before:hidden after:hidden',
            label: 'w-full justify-start'
          }}
          className='w-[90%] max-w-[90%] overflow-hidden'
        >
          <EditableText
            value={taskItemContent}
            onValueChange={(value) => console.log(value)}
          />
        </Checkbox>
        <div className='text-nowrap pt-1 align-top font-mono text-sm text-default-500 '>
          {item.dateTime?.due?.format('h:m, A') || ''}
        </div>
      </div>
      <div className='flex'>
        <div
          className={
            "after:content[''] mr-2 flex w-5 flex-shrink-0 justify-center pb-1 pt-1 after:flex after:h-full after:w-[1px] " +
            'after:bg-' +
            statusColor
          }
        />
        <TaskInfoLine item={item} />
      </div>
    </Fragment>
  )
}
