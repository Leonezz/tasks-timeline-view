import {
  Button,
  Checkbox,
  Divider,
  Input,
  InputProps,
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
  Selection,
  Tab,
  Tabs,
  UseDisclosureProps,
  cn,
  RangeCalendar,
  DateValue
} from '@nextui-org/react'
import { today, startOfMonth, endOfMonth } from '@internationalized/date'
import moment from 'moment'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { innerDateFormat, timeZone } from '../../util/defs'
import { ChipStyleCheckbox } from '../filter_sort/ChipStyleCheckbox'
import {
  Options as RRuleOptions,
  RRule,
  Frequency,
  ByWeekday,
  Weekday
} from 'rrule'
import { todoStore } from '../../datastore/useTodoStore'
import { BUS } from '../../datastore/todoStoreEvents'

const RecurrenceNumInput = ({
  prefix,
  postfix,
  props
}: {
  prefix: string
  postfix: string
  props: Partial<InputProps>
}) => {
  return (
    <div className='flex flex-row gap-2'>
      <span className='self-center'>{prefix}</span>
      <Input
        {...props}
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
        ),
        labelWrapper: 'w-full'
      }}
    >
      {children}
    </Radio>
  )
}

const RecurrenceIntervalModeTabs = ({
  initialOptions,
  onValueChange
}: {
  initialOptions: Partial<RRuleOptions>
  onValueChange: (option: Partial<RRuleOptions>) => any
}) => {
  const weekdays = [
    RRule.MO,
    RRule.TU,
    RRule.WE,
    RRule.TH,
    RRule.FR,
    RRule.SA,
    RRule.SU
  ]
  const weekIndexs = [1, 2, 3, 4, -1]
  const weekIndexToStr = (idx: number) => {
    return ['First', 'Second', 'Third', 'Forth', 'Last'][
      ((idx > 0 ? idx - 1 : idx) + 5) % 5
    ]
  }
  const monthdays = []
  for (let i = 1; i < 32; ++i) {
    monthdays.push(i)
  }
  monthdays.push(-1)

  // repeat mode
  const [repeatBy, setRepeatBy] = useState(
    initialOptions.freq !== undefined ? initialOptions.freq : Frequency.DAILY
  )

  // repeat interval
  const [dailyInterval, setDailyInterval] = useState(
    initialOptions.freq !== undefined && initialOptions.freq === Frequency.DAILY
      ? initialOptions.interval || 1
      : 1
  )
  const [weeklyInterval, setWeeklyInterval] = useState(
    initialOptions.freq !== undefined &&
      initialOptions.freq === Frequency.WEEKLY
      ? initialOptions.interval || 1
      : 1
  )
  const [monthlyInterval, setMonthlyInterval] = useState(
    initialOptions.freq !== undefined &&
      initialOptions.freq === Frequency.MONTHLY
      ? initialOptions.interval || 1
      : 1
  )

  // repeat spec day
  const initialByWeekday =
    initialOptions.byweekday !== null &&
    initialOptions.byweekday !== undefined &&
    typeof initialOptions.byweekday === typeof [RRule.MO]
      ? (initialOptions.byweekday as ByWeekday[])
      : typeof initialOptions.byweekday === typeof RRule.MO
        ? [initialOptions.byweekday as ByWeekday]
        : [RRule.MO]
  const [repeatWeekdays, setRepeatWeekdays] = useState(initialByWeekday)
  const onSelectWeekday = (selected: boolean, wd: Weekday) => {
    if (selected) {
      setRepeatWeekdays((prev) => [...prev, wd])
    } else {
      setRepeatWeekdays((prev) => prev.filter((v) => v !== wd))
    }
  }

  const initialByMonthDay =
    initialOptions.bymonthday !== null &&
    initialOptions.bymonthday !== undefined &&
    typeof initialOptions.bymonthday === typeof [1]
      ? (initialOptions.bynmonthday as number[])
      : typeof initialOptions.bymonthday === 'number'
        ? [initialOptions.bymonthday as number]
        : [1]
  const [repeatMonthdays, setRepeatMonthdays] = useState(initialByMonthDay)

  const [repeatMonthDayMode, setRepeatMonthDayMode] = useState(
    'monthday' as 'monthday' | 'weekday'
  )
  const initialRepeatStepos =
    initialOptions.bysetpos !== null &&
    initialOptions.bysetpos !== undefined &&
    typeof initialOptions.bysetpos === typeof [1]
      ? (initialOptions.bysetpos as number[])
      : typeof initialOptions.bysetpos === 'number'
        ? [initialOptions.bysetpos as number]
        : [1]
  const [repeatStepos, setRepeatStepos] = useState(initialRepeatStepos)

  useEffect(() => {
    onValueChange({
      ...initialOptions,
      freq: repeatBy,
      interval:
        repeatBy === Frequency.DAILY
          ? dailyInterval
          : repeatBy === Frequency.WEEKLY
            ? weeklyInterval
            : monthlyInterval,
      byweekday:
        repeatBy === Frequency.WEEKLY ||
        (repeatBy === Frequency.MONTHLY && repeatMonthDayMode === 'weekday')
          ? repeatWeekdays
          : null,
      bymonthday:
        repeatBy === Frequency.MONTHLY && repeatMonthDayMode === 'monthday'
          ? repeatMonthdays
          : null,
      bysetpos:
        repeatBy === Frequency.MONTHLY && repeatMonthDayMode === 'weekday'
          ? repeatStepos
          : null,
      bynmonthday: null,
      bynweekday: null,
      byhour: null,
      byminute: null,
      bysecond: null
    })
  }, [
    repeatBy,
    dailyInterval,
    weeklyInterval,
    monthlyInterval,
    repeatMonthDayMode,
    repeatWeekdays,
    repeatMonthdays,
    repeatStepos
  ])

  return (
    <Tabs
      classNames={{
        tabList: 'w-full'
      }}
      selectedKey={repeatBy.toString()}
      onSelectionChange={(k: number) => {
        setRepeatBy(Number(k))
      }}
    >
      <Tab title='Day' key={Frequency.DAILY} value={Frequency.DAILY}>
        <RecurrenceNumInput
          prefix='Every'
          postfix='Days'
          props={{
            value: dailyInterval.toString(),
            onValueChange: (v) => setDailyInterval(Number(v))
          }}
        />
      </Tab>
      <Tab
        title='Week'
        className='flex flex-col gap-5'
        key={Frequency.WEEKLY}
        value={Frequency.WEEKLY}
      >
        <RecurrenceNumInput
          prefix='Every'
          postfix='Weeks'
          props={{
            value: weeklyInterval.toString(),
            onValueChange: (v) => setWeeklyInterval(Number(v))
          }}
        />
        <div className='flex flex-row gap-2'>
          <label className='min-w-max'>Weekday: </label>
          <div className='flex flex-row flex-wrap gap-2'>
            {weekdays.map((wd) => (
              <ChipStyleCheckbox
                radius='sm'
                showicon={false}
                key={wd.toString()}
                isSelected={repeatWeekdays.includes(wd)}
                onValueChange={(s) => onSelectWeekday(s, wd)}
              >
                {wd.toString()}
              </ChipStyleCheckbox>
            ))}
          </div>
        </div>
      </Tab>
      <Tab
        title='Month'
        className='flex flex-col gap-5'
        key={Frequency.MONTHLY}
        value={Frequency.MONTHLY}
      >
        <RecurrenceNumInput
          prefix='Every'
          postfix='Months'
          props={{
            value: monthlyInterval.toString(),
            onValueChange: (v) => setMonthlyInterval(Number(v))
          }}
        />
        <RadioGroup
          value={repeatMonthDayMode}
          onValueChange={(v) => {
            if (v === 'weekday' || v === 'monthday') {
              setRepeatMonthDayMode(v)
            }
          }}
        >
          <CustomRadio value='weekday' key='weekday'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-row gap-2'>
                <h2 className='min-w-max self-center'>Every</h2>
                <Select
                  size='sm'
                  selectionMode='multiple'
                  disallowEmptySelection
                  selectedKeys={repeatStepos.map((k) => k.toString())}
                  onSelectionChange={(ks: Selection) => {
                    if (ks === 'all') {
                      setRepeatStepos(weekIndexs)
                    } else {
                      setRepeatStepos(
                        [...ks.values()]
                          .map((v) => Number(v.toString()))
                          .sort((a, b) => {
                            return a * b * (a - b)
                          })
                      )
                    }
                  }}
                  key='weekidx'
                  aria-label='which week'
                >
                  {weekIndexs.map((w) => (
                    <SelectItem key={w} value={w}>
                      {weekIndexToStr(w)}
                    </SelectItem>
                  ))}
                </Select>
                <h2 className='min-w-max self-center'>Week's</h2>
                <Select
                  size='sm'
                  selectionMode='single'
                  disallowEmptySelection
                  selectedKeys={repeatWeekdays.map((k) => k.toString())}
                  onSelectionChange={(k) => {
                    if (k === 'all') return
                    const selectedWeekDays = Array.from(k)
                    if (selectedWeekDays.length === 0) {
                      setRepeatWeekdays([])
                    } else {
                      setRepeatWeekdays([
                        Number(selectedWeekDays[0].valueOf().toString())
                      ])
                    }
                  }}
                  key='weekday'
                  aria-label='which weekday'
                >
                  {weekdays.map((wd) => (
                    <SelectItem key={wd.weekday}>{wd.toString()}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </CustomRadio>
          <CustomRadio value='monthday' key='monthday'>
            <div className='flex flex-col gap-3'>
              <h2 className='min-w-max'>Month day</h2>
              <div className='flex flex-row flex-wrap gap-2'>
                {monthdays.map((d) => (
                  <ChipStyleCheckbox
                    showicon={false}
                    key={d}
                    isSelected={repeatMonthdays.includes(d)}
                    onValueChange={(s) => {
                      if (s) {
                        setRepeatMonthdays((prev) => [...prev, d])
                      } else {
                        setRepeatMonthdays((prev) =>
                          prev.filter((v) => v !== d)
                        )
                      }
                    }}
                  >
                    {d === -1 ? 'Last Day' : d}
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

const RecurrenceRangeEdit = ({
  ruleOption,
  onValueChange
}: {
  ruleOption: Partial<RRuleOptions>
  onValueChange: (option: Partial<RRuleOptions>) => any
}) => {
  const todayStr = moment().format(innerDateFormat)
  const [startDate, setStartDate] = useState(todayStr)

  const [endMode, setEndMode] = useState('no' as 'no' | 'cnt' | 'util')

  const [repeatCnt, setRepeatCnt] = useState(ruleOption.count || 1)
  const initialEndDate =
    ruleOption.until !== null && ruleOption.until !== undefined
      ? moment(ruleOption.until as Date).format(innerDateFormat)
      : moment().format(innerDateFormat)
  const [endDate, setEndDate] = useState(initialEndDate)

  useEffect(() => {
    onValueChange({
      ...ruleOption,
      dtstart: moment(startDate).utc(true).toDate(),
      count: endMode === 'cnt' ? repeatCnt : null,
      until: endMode === 'util' ? moment(endDate).utc(true).toDate() : null
    })
  }, [startDate, endMode, repeatCnt, endDate])

  return (
    <Fragment>
      <Tabs
        classNames={{
          tabList: 'w-full'
        }}
        selectedKey={endMode}
        onSelectionChange={(s) => {
          if (s === 'no' || s === 'cnt' || s === 'util') {
            setEndMode(s)
          }
        }}
      >
        <Tab title='Infinity' key='no' value='no'>
          No range
        </Tab>
        <Tab title='Count' key='cnt' value='cnt'>
          <RecurrenceNumInput
            prefix='Repeat'
            postfix='Times'
            props={{
              value: repeatCnt.toString(),
              onValueChange: (v) => setRepeatCnt(Number(v))
            }}
          />
        </Tab>
        <Tab title='Util' key='util' value='util'>
          <Input
            label='Repeat Util '
            labelPlacement='outside-left'
            type='date'
            value={endDate}
            onValueChange={(s) => setEndDate(s)}
          />
        </Tab>
      </Tabs>
      <div className='flex w-full flex-row gap-2'>
        <Input
          label='Start Date '
          labelPlacement='outside-left'
          type='date'
          classNames={{
            label: 'min-w-max',
            mainWrapper: 'w-full'
          }}
          value={startDate}
          onValueChange={setStartDate}
        />
        <Checkbox
          isSelected={startDate === todayStr}
          onValueChange={(v) => {
            if (v) {
              setStartDate(todayStr)
            }
          }}
        >
          Today
        </Checkbox>
      </div>
    </Fragment>
  )
}

const RecurrencePreview = ({
  rruleOptions
}: {
  rruleOptions: Partial<RRuleOptions>
}) => {
  const defaultDate = today(timeZone)
  const [previewMonth, setPreviewMonth] = useState(defaultDate)
  const rule = new RRule(rruleOptions)
  const dates = rule
    .between(
      startOfMonth(previewMonth).toDate(timeZone),
      endOfMonth(previewMonth).toDate(timeZone),
      true
    )
    .map((d) => d.getDay())
  const isDateAvaliable = (date: DateValue) => {
    return dates.includes(date.toDate(timeZone).getDay())
  }

  return (
    <RangeCalendar
      isReadOnly
      className='self-center'
      allowsNonContiguousRanges
      isDateUnavailable={(date: DateValue) => !isDateAvaliable(date)}
      onFocusChange={(date) => {
        setPreviewMonth(date)
      }}
    />
  )
}

const TaskRecurrenceModal = ({
  disclosure,
  id
}: {
  disclosure: UseDisclosureProps
  id: string
}) => {
  const initialRRuleOption = (
    todoStore.getItemById(id)?.recurrence || new RRule()
  ).origOptions
  const [rruleOption, setRRuleOption] = useState(initialRRuleOption)

  const summitRRuleOption = useCallback(() => {
    BUS.emit('ChangeTaskProperty', id, { recurrence: new RRule(rruleOption) })
  }, [rruleOption])
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
              <RecurrenceIntervalModeTabs
                initialOptions={rruleOption}
                onValueChange={setRRuleOption}
              />

              <Divider />

              <h1>Repeat Range</h1>
              <RecurrenceRangeEdit
                ruleOption={rruleOption}
                onValueChange={setRRuleOption}
              />
            </ModalBody>

            <Divider />

            <ModalFooter className='flex flex-col'>
              <div className='flex flex-col'>
                <h1>Preview</h1>
                <RecurrencePreview rruleOptions={rruleOption} />
              </div>
              <div className='flex flex-row gap-2 self-end'>
                <Button color='danger' onClick={onClose}>
                  Discard
                </Button>
                <Button
                  color='primary'
                  onClick={() => {
                    summitRRuleOption()
                    onClose()
                  }}
                >
                  Save
                </Button>
              </div>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  )
}

export default TaskRecurrenceModal
