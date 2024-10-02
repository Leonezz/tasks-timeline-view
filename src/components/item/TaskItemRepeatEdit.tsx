import { Input, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import { Fragment } from 'react/jsx-runtime'
import { Frequency, RRule } from 'rrule'
import { TaskRecurrenceModal } from './TaskRecurrence'
import { useState } from 'react'
import moment from 'moment'

type TaskItemRepeatEditProps = {
  value: { recurrence: RRule }
  onValueChange: (value: RRule) => void
}
export const TaskItemRepeatEdit = ({
  value,
  onValueChange
}: TaskItemRepeatEditProps) => {
  const { recurrence } = value

  const editTaskRecurrenceDisclosure = useDisclosure()
  const [selectedKey, setSelectedKey] = useState('customize')
  const isCustomize = selectedKey === 'customize'
  const [untilDate, setUntilDate] = useState<string>()
  const until = moment(untilDate)
  return (
    <Fragment>
      <Select
        label='Repeat Mode'
        labelPlacement='outside'
        selectionMode='single'
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={['customize']}
        onSelectionChange={(keys) => setSelectedKey(Array.from(keys).join(''))}
      >
        <SelectItem key='none' onSelect={() => onValueChange(new RRule())}>
          No Repeat
        </SelectItem>
        <SelectItem
          key='day'
          onSelect={() =>
            onValueChange(
              new RRule({
                freq: Frequency.DAILY,
                until: until.isValid() ? until.toDate() : undefined
              })
            )
          }
        >
          Every Day
        </SelectItem>
        <SelectItem
          key='weekday'
          onSelect={() =>
            onValueChange(
              new RRule({
                byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
                until: until.isValid() ? until.toDate() : undefined
              })
            )
          }
        >
          Every Weekday
        </SelectItem>
        <SelectItem
          key='weekend'
          onSelect={() =>
            onValueChange(
              new RRule({
                byweekday: [RRule.SA, RRule.SU],
                until: until.isValid() ? until.toDate() : undefined
              })
            )
          }
        >
          Every Weekend
        </SelectItem>
        <SelectItem
          onEmptied={undefined}
          key='customize'
          onClick={editTaskRecurrenceDisclosure.onOpen}
        >
          Customize
        </SelectItem>
      </Select>
      <Input
        type='date'
        label='Until'
        labelPlacement='inside'
        value={untilDate}
        onValueChange={setUntilDate}
        isDisabled={isCustomize}
      />
      <TaskRecurrenceModal
        disclosure={editTaskRecurrenceDisclosure}
        recurrence={recurrence}
        onRecurrenceChange={(v) => onValueChange(v)}
      />
    </Fragment>
  )
}
