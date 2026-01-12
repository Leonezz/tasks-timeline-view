import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Avatar,
  DatePicker
} from '@heroui/react'
import { CalendarDate } from '@internationalized/date'
// import { innerDateFormat } from "../../util/defs";
import { useEffect, useState } from 'react'
import moment from 'moment'
import { timeZone } from '../../util/defs'
import type { TaskItemDateTime } from '../../@types/task-item'
import { DueIcon } from '../asserts/icons/due'

const DatePickerItem = ({
  labelPrefix,
  date,
  setDate
}: {
  labelPrefix: string
  date: moment.Moment
  setDate: (d: moment.Moment) => void
}) => {
  return (
    <DatePicker
      size='sm'
      classNames={{
        base: 'p-0 h-fit',
        label: 'w-full pl-1 text-sm',
        input: 'p-0 w-full',
        innerWrapper: 'justify-end p-0 border-none',
        inputWrapper: 'p-0 h-fit'
      }}
      label={labelPrefix}
      value={new CalendarDate(date.year(), date.month(), date.day())}
      onChange={(value) => setDate(moment(value.toDate(timeZone)))}
      labelPlacement='outside-left'
    />
  )
}

export const DatePickerListPopover = ({
  initialDates,
  summitDates
}: {
  initialDates: TaskItemDateTime
  summitDates: (dates: TaskItemDateTime) => void
}) => {
  // const todayDateString = moment().format(innerDateFormat);
  const [dueDate, setDueDate] = useState(initialDates.due || moment())
  const [startDate, setStartDate] = useState(initialDates.start || moment())
  useEffect(() => {
    const dates = {
      due: dueDate,
      start: startDate
    } as TaskItemDateTime
    summitDates(dates)
  }, [dueDate, startDate, summitDates])

  return (
    <Popover
      placement='bottom'
      classNames={{
        base: 'p-0 w-fit',
        content: 'w-fit min-w-1'
      }}
    >
      <PopoverTrigger>
        <Avatar
          alt='Dates'
          icon={<DueIcon />}
          size='sm'
          radius='sm'
          isBordered={false}
          classNames={{
            base: 'bg-transparent px-0'
          }}
        />
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-2'>
        <DatePickerItem
          key='due'
          labelPrefix='Due at: '
          date={dueDate}
          setDate={setDueDate}
        />
        <DatePickerItem
          key='start'
          labelPrefix='Start at: '
          date={startDate}
          setDate={setStartDate}
        />
      </PopoverContent>
    </Popover>
  )
}
