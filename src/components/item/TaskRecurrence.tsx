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
  Tab,
  Tabs,
  UseDisclosureProps,
  cn,
  RangeCalendar,
  DateValue
} from '@nextui-org/react'
import { today, startOfMonth, endOfMonth } from '@internationalized/date'
import moment from 'moment'
import { Fragment, useState } from 'react'
import { timeZone } from '../../util/defs'
import { ChipStyleCheckbox } from '../filter_sort/ChipStyleCheckbox'
import { Options as RRuleOptions, RRule, Frequency } from 'rrule'

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

const trimAsArray = (value: null | undefined | any | any[]): any[] => {
  if (value === null || value === undefined) {
    return []
  }
  if (Array.isArray(value)) {
    return value
  }
  return [value]
}

const RecurrenceIntervalModeTabs = ({
  initialOptions,
  onValueChange
}: {
  initialOptions: Partial<RRuleOptions>
  onValueChange: (option: Partial<RRuleOptions>) => void
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

  return (
    <Tabs
      classNames={{
        tabList: 'w-full'
      }}
      selectedKey={repeatBy.toString()}
      onSelectionChange={(k) => {
        setRepeatBy(Number(k))
        onValueChange({ freq: Number(k) })
      }}
    >
      <Tab title='Day' key={Frequency.DAILY} value={Frequency.DAILY}>
        <RecurrenceNumInput
          prefix='Every'
          postfix='Times'
          props={{
            value: (initialOptions.interval || 1).toString(),
            onValueChange: (v) =>
              onValueChange({
                interval: Number(v),
                freq: Frequency.DAILY,
                byweekday: undefined,
                bymonthday: undefined,
                bysetpos: undefined
              })
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
          postfix='Times'
          props={{
            value: (initialOptions.interval || 1).toString(),
            onValueChange: (v) =>
              onValueChange({
                interval: Number(v),
                freq: Frequency.WEEKLY,
                bymonthday: undefined
              })
          }}
        />
        <div className='flex flex-row gap-2'>
          <label className='min-w-max' htmlFor='weekdays'>
            Weekday:{' '}
          </label>
          <div className='flex flex-row flex-wrap gap-2' id='weekdays'>
            {weekdays.map((wd) => (
              <ChipStyleCheckbox
                radius='sm'
                showicon={false}
                key={wd.toString()}
                isSelected={trimAsArray(initialOptions.byweekday).includes(wd)}
                onValueChange={(selected) => {
                  const weekdays = trimAsArray(initialOptions.byweekday)
                  if (selected) {
                    onValueChange({
                      byweekday: [...weekdays, wd],
                      freq: Frequency.DAILY,
                      bymonthday: undefined
                    })
                  } else {
                    onValueChange({
                      byweekday: [...weekdays.filter((v) => v !== wd)],
                      freq: Frequency.DAILY,
                      bymonthday: undefined
                    })
                  }
                }}
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
          postfix='Times'
          props={{
            value: (initialOptions.interval || 1).toString(),
            onValueChange: (v) =>
              onValueChange({
                interval: Number(v),
                freq: Frequency.DAILY
              })
          }}
        />
        <RadioGroup>
          <CustomRadio
            value='weekday'
            key='weekday'
            onSelect={() =>
              onValueChange({
                bymonthday: undefined,
                freq: Frequency.MONTHLY
              })
            }
          >
            <div className='flex flex-col gap-3'>
              <div className='flex flex-row gap-2'>
                <h2 className='min-w-max self-center'>Every</h2>
                <Select
                  size='sm'
                  selectionMode='multiple'
                  disallowEmptySelection
                  selectedKeys={trimAsArray(initialOptions.bysetpos).map((k) =>
                    k.toString()
                  )}
                  onSelectionChange={(ks) => {
                    const selectedKeys = Array.from(ks)
                    onValueChange({
                      freq: Frequency.MONTHLY,
                      bysetpos: selectedKeys
                        .map((v) => Number(v.toString()))
                        .sort((a, b) => a * b * (a - b))
                    })
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
                <h2 className='min-w-max self-center'>Weeks</h2>
                <Select
                  size='sm'
                  selectionMode='single'
                  disallowEmptySelection
                  selectedKeys={trimAsArray(initialOptions.byweekday).map((k) =>
                    k.toString()
                  )}
                  onSelectionChange={(k) => {
                    const selectedWeekDays = Array.from(k)
                    if (selectedWeekDays.length === 1) {
                      onValueChange({
                        byweekday: Number(selectedWeekDays[0]),
                        freq: Frequency.MONTHLY
                      })
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
                    isSelected={trimAsArray(initialOptions.bymonthday).includes(
                      d
                    )}
                    onValueChange={(s) => {
                      const currentMonthDays = trimAsArray(
                        initialOptions.bymonthday
                      )
                      if (s) {
                        onValueChange({
                          bymonthday: [...currentMonthDays, d],
                          freq: Frequency.MONTHLY,
                          bysetpos: undefined,
                          byweekday: undefined
                        })
                      } else {
                        onValueChange({
                          bymonthday: [
                            ...currentMonthDays.filter((v) => v !== d)
                          ],
                          freq: Frequency.MONTHLY,
                          bysetpos: undefined,
                          byweekday: undefined
                        })
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
  onValueChange: (option: Partial<RRuleOptions>) => void
}) => {
  return (
    <Fragment>
      <Tabs
        classNames={{
          tabList: 'w-full'
        }}
        onSelectionChange={(key) => {
          if (key === 'no') {
            onValueChange({
              count: undefined,
              until: undefined,
              dtstart: undefined
            })
          } else if (key === 'cnt') {
            onValueChange({ until: undefined, count: undefined })
          } else if (key === 'util') {
            onValueChange({ count: undefined, until: undefined })
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
              value: (ruleOption.count || 1).toString(),
              onValueChange: (v) => onValueChange({ count: Number(v) })
            }}
          />
        </Tab>
        <Tab title='Util' key='util' value='util'>
          <Input
            label='Repeat Util '
            labelPlacement='outside-left'
            type='date'
            value={ruleOption.until?.toString()}
            onValueChange={(s) => onValueChange({ until: moment(s).toDate() })}
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
          value={ruleOption.dtstart?.toString()}
          onValueChange={(value) =>
            onValueChange({ dtstart: moment(value).toDate() })
          }
        />
        <Checkbox
          isSelected={
            ruleOption.dtstart?.toDateString() ===
            moment().toDate().toDateString()
          }
          onValueChange={(v) => {
            if (v) {
              onValueChange({
                dtstart: moment().toDate()
              })
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
    .map((d) => d.getDate())
  console.log(rruleOptions, rule, rule.toString(), dates)
  const isDateAvaliable = (date: DateValue) => {
    return dates.includes(date.toDate(timeZone).getDate())
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

export const TaskRecurrenceModal = ({
  disclosure,
  recurrence,
  onRecurrenceChange
}: {
  disclosure: UseDisclosureProps
  recurrence: RRule
  onRecurrenceChange: (value: RRule) => void
}) => {
  const [rruleOption, setRRuleOption] = useState(recurrence.origOptions)

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
                onValueChange={(value) =>
                  setRRuleOption((prev) => ({
                    ...prev,
                    ...value
                  }))
                }
              />

              <Divider />

              <h1>Repeat Range</h1>
              <RecurrenceRangeEdit
                ruleOption={rruleOption}
                onValueChange={(value) =>
                  setRRuleOption((prev) => ({
                    ...prev,
                    ...value
                  }))
                }
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
                    onRecurrenceChange(new RRule(rruleOption))
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
