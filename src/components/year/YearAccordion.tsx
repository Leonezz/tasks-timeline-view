import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader
} from '@nextui-org/react'
import React from 'react'
import moment from 'moment'
import TaskItemCheckbox from '../item/TaskItemCheckbox'
import DateTaskStatisticsLine from '../date/DateTaskStatisticsLine'
import DateCalendarIcon from '../date/DateCalendarIcon'
import YearHeaderProgress from './YearHeaderProgress'
import YearUnfinishedTip from './YearUnfinishedTip'
import { TaskItem, BasicTaskItemStatus } from '../../tasks/TaskItem'
import { innerDateFormat, visualDateFormat } from '../../util/defs'

function YearAccordion({
    year,
    dateTaskMap
}: {
    year: number
    dateTaskMap: Map<string, TaskItem[]>
}) {
    const dates: string[] = Array.from(dateTaskMap.keys()).sort((a, b) => {
        return a < b ? -1 : a === b ? 0 : 1
    })
    const itemClasses = {
        base:
            'py-0 px-0 w-full shadow-none ' +
            'group-[.is-splitted]:shadow-none ' +
            'group-[.is-splitted]:px-0',
        title: 'font-bold text-medium',
        trigger: 'px-2 py-2 w-full ' + 'shadow-none bg-opacity-0 ' + 'border-0', // "px - 2 py - 2 data - [hover = true]: bg -default -100 rounded - lg flex items - center",
        indicator: 'text-medium font-bold text-primary',
        content: 'text-small px-2'
    }
    const totalTaskCnt = Array.from(dateTaskMap.entries()).reduce(
        (result, entry) => result + (entry && entry[1] ? entry[1].length : 0),
        0
    )

    const completeCntOfThisYear = Array.from(dateTaskMap.entries()).reduce(
        (result, entry) =>
            result +
            (entry && entry[1]
                ? entry[1].reduce(
                      (completeCntInADay, item) =>
                          completeCntInADay +
                          (item.status === BasicTaskItemStatus.Done ? 1 : 0),
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
            entry[1].some((item) => item.status !== BasicTaskItemStatus.Done)
                ? 1
                : 0),
        0
    )
    const unfinishedTaskCntOfThisYear = totalTaskCnt - completeCntOfThisYear

    return (
        <Card
            fullWidth
            classNames={{
                base: 'shadow-none bg-origin-content bg-transparent tasktimeline-yearcard'
            }}
        >
            <CardHeader className='flex-col items-center'>
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
                    className='border-none p-0 shadow-none outline-none'
                    variant='splitted'
                    itemClasses={itemClasses}
                    showDivider={false}
                >
                    {dates.map((d: string, i: number) => {
                        const taskList = dateTaskMap.get(d) || []
                        const formattedDate = moment(d, innerDateFormat).format(
                            visualDateFormat
                        )
                        const overdueCnt = taskList.reduce(
                            (result, item) =>
                                result + item.status ===
                                BasicTaskItemStatus.Overdue
                                    ? 1
                                    : 0,
                            0
                        )
                        const unplannedCnt = taskList.reduce(
                            (result, item) =>
                                result + item.status ===
                                BasicTaskItemStatus.Unplanned
                                    ? 1
                                    : 0,
                            0
                        )
                        const completeCnt = taskList.reduce(
                            (result, item) =>
                                result + item.status ===
                                BasicTaskItemStatus.Done
                                    ? 1
                                    : 0,
                            0
                        )
                        const doingCnt = taskList.reduce(
                            (result, item) =>
                                result + item.status ===
                                BasicTaskItemStatus.Todo
                                    ? 1
                                    : 0,
                            0
                        )
                        const unStartCnt = taskList.reduce(
                            (result, item) =>
                                result + item.status ===
                                BasicTaskItemStatus.Scheduled
                                    ? 1
                                    : 0,
                            0
                        )
                        const cancelledCnt = taskList.reduce(
                            (result, item) =>
                                result + item.status ===
                                BasicTaskItemStatus.Cancelled
                                    ? 1
                                    : 0,
                            0
                        )
                        const todoCnt =
                            taskList.length -
                            overdueCnt -
                            unplannedCnt -
                            completeCnt -
                            doingCnt -
                            cancelledCnt
                        return (
                            <AccordionItem
                                key={i}
                                aria-label={formattedDate}
                                title={formattedDate}
                                subtitle={
                                    <DateTaskStatisticsLine
                                        overdueCnt={overdueCnt}
                                        scheduledCnt={unStartCnt}
                                        todoCnt={todoCnt}
                                        doingCnt={doingCnt}
                                        unplannedCnt={unplannedCnt}
                                        completeCnt={completeCnt}
                                    />
                                }
                                indicator={
                                    <DateCalendarIcon
                                        date={moment(d, innerDateFormat)}
                                    />
                                }
                            >
                                {taskList.map((t, i) => (
                                    <TaskItemCheckbox key={i} item={t} />
                                ))}
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </CardBody>
        </Card>
    )
}

export default YearAccordion
