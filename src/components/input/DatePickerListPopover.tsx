import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Avatar,
    Input
} from '@nextui-org/react'
import { iconMap } from '../asserts/icons'
// import { innerDateFormat } from "../../util/defs";
import { useEffect, useState } from 'react'
import React from 'react'

export interface TaskItemDateInfo {
    due: string
    start: string
}

function DatePickerItem({
    labelPrefix,
    date,
    setDate
}: {
    labelPrefix: string
    date: string
    setDate: (d: string) => void
}) {
    return (
        <Input
            type='date'
            size='sm'
            classNames={{
                base: 'p-0 h-fit',
                label: 'w-full pl-1 text-sm',
                input: 'p-0 w-full',
                innerWrapper: 'justify-end p-0 border-none',
                inputWrapper: 'p-0 h-fit'
            }}
            label={labelPrefix}
            value={date}
            onValueChange={setDate}
            // startContent={iconMap.startIcon}
            labelPlacement='outside-left'
        />
    )
}

function DatePickerListPopover({
    summitDates
}: {
    summitDates: (dates: TaskItemDateInfo) => void
}) {
    // const todayDateString = moment().format(innerDateFormat);
    const [dueDate, setDueDate] = useState('')
    const [startDate, setStartDate] = useState('')
    useEffect(() => {
        const dates = {
            due: dueDate,
            start: startDate
        }
        summitDates(dates)
    }, [dueDate, startDate])

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
                    icon={iconMap.dueIcon}
                    size='sm'
                    radius='sm'
                    isBordered={false}
                    classNames={{
                        base: 'bg-transparent px-0'
                    }}
                />
            </PopoverTrigger>
            <PopoverContent>
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

export default DatePickerListPopover
