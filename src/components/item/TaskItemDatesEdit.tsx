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
    <div className='flex flex-col gap-3'>
      <Input
        isReadOnly={!enableStartTime}
        label={<span className='text-medium font-semibold'>Start At</span>}
        type='datetime-local'
        labelPlacement='outside'
        endContent={
          <Checkbox
            isSelected={enableStartTime}
            onValueChange={setEnableStartTime}
          />
        }
        placeholder={moment().format(innerDateTimeFormat)}
        value={start?.format(innerDateTimeFormat)}
        onValueChange={(value) => onValueChange({ start: moment(value) })}
      />
      <Input
        isReadOnly={!enableDueTime}
        label={<span className='text-medium font-semibold'>Due At</span>}
        type='datetime-local'
        labelPlacement='outside'
        endContent={
          <Checkbox
            isSelected={enableDueTime}
            onValueChange={setEnableDueTime}
          />
        }
        value={due?.format(innerDateTimeFormat)}
        onValueChange={(value) => onValueChange({ due: moment(value) })}
      />
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
        label={<span className='text-medium font-semibold'>Status</span>}
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

      <Input
        isReadOnly={!enableDoneTime}
        label={<span className='text-medium font-semibold'>Done At</span>}
        type='datetime-local'
        labelPlacement='outside'
        placeholder={moment().format(innerDateTimeFormat)}
        value={completion?.format(innerDateTimeFormat)}
        onValueChange={(value) => onValueChange({ completion: moment(value) })}
        endContent={
          <Checkbox
            isSelected={enableDoneTime}
            onValueChange={setEnableDoneTime}
          />
        }
      />
    </div>
  )
}
