import { Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import { Fragment } from 'react/jsx-runtime'
import { TaskItem, TaskStatus } from '../../@types/task-item'
import { useState } from 'react'
import { useTaskStatusConfig } from '../options/GlobalOption'
import { TaskStatusDef } from '../options/OptionDef'
import { innerDateTimeFormat } from '../../util/defs'
import moment from 'moment'

type TaskItemDatesEditProps = {
  value: {
    status: TaskStatus
  } & Pick<TaskItem['dateTime'], 'start' | 'due' | 'completion'>
  onValueChange: (value: Partial<TaskItemDatesEditProps['value']>) => void
}
export const TaskItemDatesEdit = ({
  value,
  onValueChange
}: TaskItemDatesEditProps) => {
  const { status, due, completion, start } = value
  const { statusConfigs, getIconFromStatus, getStatusColor } =
    useTaskStatusConfig()
  const [enableStartTime, setEnableStartTime] = useState(start !== undefined)
  const [enableDueTime, setEnableDueTime] = useState(due !== undefined)
  const [enableDoneTime, setEnableDoneTime] = useState(completion !== undefined)

  const renderStatusRow = (statusOption: TaskStatusDef) => {
    const Icon = getIconFromStatus(statusOption.status)
    return (
      <div
        key={status}
        className={`flex flex-row gap-2 text-${getStatusColor(status)}`}
      >
        <div className='self-center'>
          <Icon />
        </div>
        <span>{status}</span>
      </div>
    )
  }
  return (
    <Fragment>
      <div className='flex flex-row gap-2'>
        <Input
          isReadOnly={!enableStartTime}
          label='Start At'
          type='datetime-local'
          labelPlacement='inside'
          value={start?.format(innerDateTimeFormat)}
          onValueChange={(value) => onValueChange({ start: moment(value) })}
        />
        <Checkbox
          isSelected={enableStartTime}
          onValueChange={setEnableStartTime}
        />
      </div>
      <div className='flex flex-row gap-2'>
        <Input
          isReadOnly={!enableDueTime}
          label='Due At'
          type='datetime-local'
          labelPlacement='inside'
          value={due?.format(innerDateTimeFormat)}
          onValueChange={(value) => onValueChange({ due: moment(value) })}
        />
        <Checkbox isSelected={enableDueTime} onValueChange={setEnableDueTime} />
      </div>
      <Select
        items={statusConfigs}
        selectionMode='single'
        selectedKeys={[status]}
        onSelectionChange={(keys) => {
          const statusLabel = Array.from(keys).join('') as TaskStatus
          const isLabelDone = statusLabel === 'done'
          const doneTime = isLabelDone ? moment() : undefined
          onValueChange({
            status: statusLabel,
            completion: doneTime
          })
          setEnableDoneTime(isLabelDone)
        }}
        label='Status'
        labelPlacement='outside'
        renderValue={(items) => {
          return items.map(
            (item) => item.data && renderStatusRow(item.data as TaskStatusDef)
          )
        }}
      >
        {(option: TaskStatusDef) => {
          const Icon = getIconFromStatus(option.status)
          return (
            <SelectItem
              startContent={<Icon />}
              key={option.status}
              color={option.color}
            >
              {option.status}
            </SelectItem>
          )
        }}
      </Select>

      <div className='flex flex-row gap-2'>
        <Input
          isReadOnly={!enableDoneTime}
          label='Done At'
          type='datetime-local'
          labelPlacement='inside'
          value={completion?.format(innerDateTimeFormat)}
          onValueChange={(value) =>
            onValueChange({ completion: moment(value) })
          }
        />
        <Checkbox
          isSelected={enableDoneTime}
          onValueChange={setEnableDoneTime}
        />
      </div>
    </Fragment>
  )
}
