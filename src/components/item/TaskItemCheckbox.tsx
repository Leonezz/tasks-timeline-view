import React, { Fragment } from 'react'
import { Checkbox } from '@nextui-org/react'
import TaskInfoLine from './TaskInfoLine'
import { TaskItem } from '../../tasks/TaskItem'
import { TaskStatusUtil } from '../../tasks/TaskItemUtil'

function TaskItemCheckbox({ item }: { item: TaskItem }) {
    const taskItemContent = item.content.visual || ''
    const itemStatus = item.status
    const checkboxIcon = TaskStatusUtil.getStatusIcon(itemStatus)
    const statusColor = TaskStatusUtil.getStatusColor(itemStatus)

    return (
        <Fragment>
            <div className='flex flex-row justify-between'>
                <Checkbox
                    icon={checkboxIcon}
                    isSelected={TaskStatusUtil.isStatusDone(itemStatus)}
                    lineThrough
                    classNames={{
                        icon: 'opacity-100 h-4 ' + 'text-' + statusColor,
                        wrapper: 'align-top before:hidden after:hidden'
                    }}
                >
                    <a className='pl-1'>{taskItemContent}</a>
                </Checkbox>
                <div className='text-nowrap pt-1 align-top font-mono text-sm text-default-500'>
                    {item.dateTime?.due
                        ? item.dateTime.due.format('h:m, A')
                        : ''}
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
