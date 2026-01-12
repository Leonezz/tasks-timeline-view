import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader
} from '@heroui/react'
import { useState } from 'react'
import moment from 'moment'
import { TaskItemCheckbox } from '../item/TaskItemCheckbox'
import type { CounterType } from '../date/DateTaskStatisticsLine'
import { DateTaskStatisticsLine } from '../date/DateTaskStatisticsLine'
import { DateCalendarIcon } from '../date/DateCalendarIcon'
import { YearHeaderProgress } from './YearHeaderProgress'
import { YearUnfinishedTip } from './YearUnfinishedTip'
import { innerDateFormat, visualDateFormat } from '../../util/defs'
import { useGeneralOption, useTaskStatusConfig } from '../options/GlobalOption'
import { NewTaskQuickInput } from '../input/NewTaskQuickInput'
import type { TaskItem } from '../../@types/task-item'
import { AddIcon } from '../asserts/icons/add'

const AddTaskButton = ({ dateStr }: { dateStr: string }) => {
  const [isAdding, setIsAdding] = useState(false)

  const closeNewTaskQuickInput = () => setIsAdding(false)

  return (
    <div className='pt-2'>
      {isAdding ? (
        <NewTaskQuickInput
          initialDate={moment(dateStr, innerDateFormat)}
          onCancel={closeNewTaskQuickInput}
          onAdd={closeNewTaskQuickInput}
        />
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          variant='light'
          color='primary'
          size='sm'
          startContent={<AddIcon />}
          className='trainsition-colors items-left flex w-fit items-center gap-1.5 px-1 py-0 align-middle text-sm text-neutral-400 hover:text-neutral-800'
        >
          New Task
        </Button>
      )}
    </div>
  )
}

export const YearAccordion = ({
  year,
  dateTaskMap
}: {
  year: number
  dateTaskMap: Map<string, TaskItem[]>
}) => {
  const dates: string[] = Array.from(dateTaskMap.keys()).sort((a, b) => {
    return a < b ? -1 : a === b ? 0 : 1
  })
  const itemClasses = {
    base:
      'py-0 px-0 w-full shadow-none ' +
      'group-[.is-splitted]:shadow-none ' +
      'group-[.is-splitted]:px-0',
    title: 'font-bold text-medium',
    trigger: 'px-2 py-0.5 w-full ' + 'shadow-none bg-opacity-0 ' + 'border-0', // "px - 2 py - 2 data - [hover = true]: bg -default -100 rounded - lg flex items - center",
    indicator: 'text-medium font-bold text-primary',
    content: 'text-small px-2'
  }
  const totalTaskCnt = Array.from(dateTaskMap.entries()).reduce(
    (result, entry) => result + (entry && entry[1] ? entry[1].length : 0),
    0
  )

  const { statusConfigs, isStatusDoneType } = useTaskStatusConfig()

  const completeCntOfThisYear = Array.from(dateTaskMap.entries()).reduce(
    (result, entry) =>
      result +
      (entry && entry[1]
        ? entry[1].reduce(
            (completeCntInADay, item) =>
              completeCntInADay + (isStatusDoneType(item.status) ? 1 : 0),
            0
          )
        : 0),
    0
  )
  const daysWithUnfinishedTasks = [...dateTaskMap.entries()].reduce(
    (result, entry) =>
      result +
      (entry &&
      entry[1] &&
      entry[1].some((item) => isStatusDoneType(item.status))
        ? 1
        : 0),
    0
  )
  const unfinishedTaskCntOfThisYear = totalTaskCnt - completeCntOfThisYear

  // hide other year when todayFocus activated
  const { todayFocus } = useGeneralOption()
  const hideAll = todayFocus && moment().year() !== year
  const hideHead = (date: string) =>
    todayFocus && date !== moment().format(innerDateFormat)
  return (
    <Card
      fullWidth
      classNames={{
        base:
          'shadow-none bg-origin-content bg-transparent ' +
          (hideAll ? 'hidden' : '')
      }}
      className='max-w-full'
    >
      <CardHeader
        className={`flex-col items-center px-0 py-0 pt-1 ${todayFocus ? 'hidden' : ''}`}
      >
        <span className='text-3xl font-bold'>{year.toString()}</span>
        <YearUnfinishedTip
          unfinishedTaskCnt={unfinishedTaskCntOfThisYear}
          unfinishedDayCnt={daysWithUnfinishedTasks}
        />
        <YearHeaderProgress
          finished={completeCntOfThisYear}
          total={totalTaskCnt}
        />
      </CardHeader>
      <CardBody className='p-0'>
        <Accordion
          selectionMode='multiple'
          aria-label=''
          className='gap-0 border-none p-0 shadow-none outline-none'
          variant='splitted'
          itemClasses={itemClasses}
          showDivider={false}
        >
          {dates.map((d: string) => {
            const taskList = dateTaskMap.get(d) || []
            const formattedDate = moment(d, innerDateFormat).format(
              visualDateFormat
            )
            const counters = statusConfigs.map(
              (config: (typeof statusConfigs)[0]) => {
                return {
                  label: config.status,
                  color: config.color,
                  isDoneType: config.isDoneType,
                  cnt: taskList.reduce(
                    (result, item) =>
                      result + (item.status === config.status ? 1 : 0),
                    0
                  )
                } as CounterType
              }
            )
            return (
              <AccordionItem
                key={d}
                aria-label={formattedDate}
                title={formattedDate}
                subtitle={<DateTaskStatisticsLine counters={counters} />}
                indicator={
                  <DateCalendarIcon date={moment(d, innerDateFormat)} />
                }
                className={`${hideHead(d) ? 'hidden' : ''} max-w-full overflow-clip`}
                classNames={{
                  content: 'grid grid-cols-1 gap-1',
                  trigger: 'px-0 py-1'
                }}
              >
                {taskList.length === 0 ? (
                  <div className='flex items-center justify-center pt-20'>
                    <span className='font-sans text-lg text-neutral-300'>
                      No Tasks Today
                    </span>
                  </div>
                ) : (
                  taskList.map((t) => (
                    <TaskItemCheckbox key={t.uuid} item={t} />
                  ))
                )}
                <AddTaskButton dateStr={d} />
              </AccordionItem>
            )
          })}
        </Accordion>
      </CardBody>
    </Card>
  )
}
