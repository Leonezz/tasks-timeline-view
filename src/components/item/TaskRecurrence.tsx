import {
    Button,
    Checkbox,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Radio,
    RadioGroup,
    RadioProps,
    Select,
    SelectItem,
    Tab,
    Tabs,
    UseDisclosureProps,
    cn
} from '@nextui-org/react'
import moment from 'moment'
import React, { Fragment, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { innerDateFormat } from '../../util/defs'
import { ChipStyleCheckbox } from '../filter_sort/ChipStyleCheckbox'

const RecurrenceNumInput = ({
    prefix,
    postfix
}: {
    prefix: string
    postfix: string
}) => {
    return (
        <div className='flex flex-row gap-2'>
            <span className='self-center'>{prefix}</span>
            <Input
                type='number'
                size='sm'
                radius='sm'
                height={'fit'}
                width={'fit'}
                className='h-fit w-fit'
                classNames={{
                    innerWrapper: 'h-fit py-0',
                    input: 'py-0'
                }}
                min={1}
            />
            <span className='self-center'>{postfix}</span>
        </div>
    )
}

export const CustomRadio = (props: RadioProps) => {
    const { children, ...otherProps } = props

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between w-full max-w-full',
                    'flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                    'data-[selected=true]:border-primary'
                )
            }}
        >
            {children}
        </Radio>
    )
}

const RecurrenceIntervalModeTabs = () => {
    const weekdays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ]
    const monthdays = []
    for (let i = 1; i < 33; ++i) {
        monthdays.push(i)
    }

    return (
        <Tabs
            classNames={{
                tabList: 'w-full'
            }}
        >
            <Tab title='Day'>
                <RecurrenceNumInput prefix='Every' postfix='Days' />
            </Tab>
            <Tab title='Week' className='flex flex-col gap-5'>
                <RecurrenceNumInput prefix='Every' postfix='Weeks' />
                <div className='flex flex-row gap-2'>
                    <label className='min-w-max'>Weekday: </label>
                    <div className='flex flex-row flex-wrap gap-2'>
                        {weekdays.map((wd) => (
                            <ChipStyleCheckbox radius='sm' showicon={false}>
                                {wd}
                            </ChipStyleCheckbox>
                        ))}
                    </div>
                </div>
            </Tab>
            <Tab title='Month' className='flex flex-col gap-5'>
                <RecurrenceNumInput prefix='Every' postfix='Months' />
                <RadioGroup>
                    <CustomRadio value='weekday'>
                        <div className='flex flex-row gap-2'>
                            <h2 className='min-w-max self-center'>Every</h2>
                            <Select
                                items={[1, 2, 3, 4, 5, 6]}
                                fullWidth={true}
                                className='min-w-32'
                            >
                                {[1, 2, 3, 4, 5, 6].map((w) => (
                                    <SelectItem id={w.toString()} key={w}>
                                        {
                                            [
                                                'First',
                                                'Second',
                                                'Third',
                                                'Forth',
                                                'Fifth',
                                                'Last'
                                            ][w - 1]
                                        }
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select items={weekdays} className='min-w-32'>
                                {weekdays.map((wd) => (
                                    <SelectItem id={wd} key={wd}>
                                        {wd}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </CustomRadio>
                    <CustomRadio value='date'>
                        <div className='flex flex-col gap-3'>
                            <h2 className='min-w-max'>Month day</h2>
                            <div className='flex flex-row flex-wrap gap-2'>
                                {monthdays.map((d) => (
                                    <ChipStyleCheckbox showicon={false}>
                                        {d === 32 ? 'Last Day' : d}
                                    </ChipStyleCheckbox>
                                ))}
                            </div>
                        </div>
                    </CustomRadio>
                </RadioGroup>
            </Tab>
        </Tabs>
    )
}

const RecurrenceStartDateInput = () => {
    const todayStr = moment().format(innerDateFormat)
    const [date, setDate] = useState(todayStr)
    return (
        <div className='flex w-full flex-row gap-2'>
            <Input
                label='Start Date '
                labelPlacement='outside-left'
                type='date'
                classNames={{
                    label: 'min-w-max',
                    mainWrapper: 'w-full'
                }}
                value={date}
                onValueChange={setDate}
            />
            <Checkbox
                isSelected={date === todayStr}
                onValueChange={(v) => {
                    if (v) {
                        setDate(todayStr)
                    }
                }}
            >
                Today
            </Checkbox>
        </div>
    )
}

const TaskRecurrenceModal = ({
    disclosure
}: {
    disclosure: UseDisclosureProps
}) => {
    return (
        <Modal
            isOpen={disclosure.isOpen}
            onOpenChange={disclosure.onChange}
            onClose={disclosure.onClose}
            isDismissable={false}
            scrollBehavior='inside'
        >
            <ModalContent>
                {(onClose) => (
                    <Fragment>
                        <ModalHeader>Repeat</ModalHeader>
                        <Divider />
                        <ModalBody>
                            <h1>Repeat Mode</h1>
                            <RecurrenceIntervalModeTabs />

                            <Divider />

                            <h1>Repeat Range</h1>
                            <Tabs
                                classNames={{
                                    tabList: 'w-full'
                                }}
                            >
                                <Tab title='Infinity'>No range</Tab>
                                <Tab title='Count'>
                                    <RecurrenceNumInput
                                        prefix='Repeat'
                                        postfix='Times'
                                    />
                                </Tab>
                                <Tab title='Util'>
                                    <Input
                                        label='Repeat Util '
                                        labelPlacement='outside-left'
                                        type='date'
                                    />
                                </Tab>
                            </Tabs>
                            <RecurrenceStartDateInput />

                            <Divider />

                            <h1>Preview</h1>
                            <Calendar
                                className='self-center'
                                tileDisabled={(args) => {
                                    // set month-date view readonly
                                    return args.view === 'month'
                                }}
                            />
                        </ModalBody>

                        <Divider />

                        <ModalFooter>
                            <Button color='danger' onClick={onClose}>
                                Discard
                            </Button>
                            <Button color='primary'>Save</Button>
                        </ModalFooter>
                    </Fragment>
                )}
            </ModalContent>
        </Modal>
    )
}

export default TaskRecurrenceModal
