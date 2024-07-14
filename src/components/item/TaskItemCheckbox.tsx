import React, { Fragment } from 'react'
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
import TaskInfoLine from './TaskInfoLine'
import { TaskItem } from '../../tasks/TaskItem'
import { useTaskStatusConfig } from '../options/GlobalOption'

import TaskItemEditModal from './EditItemModal'
import moment from 'moment'
import { BUS } from '../../datastore/todoStoreEvents'

function CheckboxIcon({ status, itemId }: { status: string; itemId: string }) {
  const { statusConfigs, getStatusColor, getIconFromStatus } =
    useTaskStatusConfig()
  const statusColor = getStatusColor(status)

  const onStatusChange = (newStatus: string) => {
    if (newStatus === status) return
    const newItem = { status: newStatus } as Partial<TaskItem>
    if (newStatus === 'Done') {
      newItem.dateTime = { completion: moment(), misc: new Map() }
    }
    BUS.emit('ChangeTaskProperty', itemId, newItem)
  }

  const editItemModelDisclosure = useDisclosure()

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
            {getIconFromStatus(status)}
          </Button>
        </DropdownTrigger>
        <DropdownMenu className='relative z-10 p-1' title='Mark as'>
          <DropdownSection>
            {statusConfigs.map((option: (typeof statusConfigs)[0]) => (
              <DropdownItem
                startContent={getIconFromStatus(option.label)}
                key={option.label}
                color={option.color}
                onClick={() => onStatusChange(option.label)}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownSection>
          <DropdownSection>
            <DropdownItem onClick={editItemModelDisclosure.onOpen}>
              Edit
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <TaskItemEditModal id={itemId} disclosure={editItemModelDisclosure} />
    </Fragment>
  )
}

function TaskItemCheckbox({ item }: { item: TaskItem }) {
  const taskItemContent = item.content.visual || ''
  const itemStatus = item.status
  // const checkboxIcon = TaskStatusUtil.getStatusIcon(itemStatus)

  const { getStatusColor, isStatusDoneType } = useTaskStatusConfig()
  const statusColor = getStatusColor(itemStatus)

  return (
    <Fragment>
      <div className='flex flex-row justify-between'>
        <Checkbox
          icon={<CheckboxIcon status={itemStatus} itemId={item.uuid} />}
          isSelected={isStatusDoneType(itemStatus)}
          lineThrough
          classNames={{
            wrapper: 'align-top before:hidden after:hidden'
          }}
          onAuxClick={(e) => e.stopPropagation()}
          onAuxClickCapture={(e) => e.stopPropagation()}
        >
          <a
            className={
              'pl-1 ' + isStatusDoneType(itemStatus)
                ? 'text-' + statusColor
                : ''
            }
          >
            {taskItemContent}
          </a>
        </Checkbox>
        <div className='text-nowrap pt-1 align-top font-mono text-sm text-default-500'>
          {item.dateTime?.due ? item.dateTime.due.format('h:m, A') : ''}
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

export default TaskItemCheckbox
