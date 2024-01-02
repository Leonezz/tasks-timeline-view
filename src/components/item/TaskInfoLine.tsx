import IconOnlyBadge from './IconOnlyBadge'
import TagBadge from './TagBadge'
import { Fragment, MouseEventHandler, useMemo } from 'react'
// import { getFileTitle } from '../../util/string'
import { iconMap } from '../asserts/icons'
import IconDateBadge from './IconDateBadge'
import IconTextBadge from './IconTextBadge'
import { TaskItem } from '../../tasks/TaskItem'
import React from 'react'

function TaskInfoLine({
    item,
    onModifyTask
}: {
    item: TaskItem
    onModifyTask?: MouseEventHandler
}) {
    const dates = item.dateTime

    const buildDateBadge = (
        date: moment.Moment | undefined,
        ariaLabelPrefix: string,
        icon: JSX.Element,
        color?: string
    ) => {
        if (!date) return <Fragment />
        return (
            <IconDateBadge
                key={ariaLabelPrefix}
                ariaLabelPrefix={ariaLabelPrefix}
                date={date}
                icon={icon}
                color={color || 'default'}
            />
        )
    }

    const createDateBadge = useMemo(
        () => buildDateBadge(dates?.created, 'create at ', iconMap.taskIcon),
        [dates?.created]
    )
    const startDateBadge = useMemo(
        () => buildDateBadge(dates?.start, 'start at ', iconMap.startIcon),
        [dates?.start]
    )
    const scheduledDateBadge = useMemo(
        () =>
            buildDateBadge(
                dates?.scheduled,
                'scheduled to ',
                iconMap.scheduledIcon
            ),
        [dates?.scheduled]
    )
    const dueDateBadge = useMemo(
        () => buildDateBadge(dates?.due, 'due at ', iconMap.dueIcon),
        [dates?.due]
    )
    const completeDateBadge = useMemo(
        () =>
            buildDateBadge(
                dates?.completion,
                'complete at ',
                iconMap.doneIcon,
                'text-success'
            ),
        [dates?.completion]
    )

    const buildIconTextBadge = (
        icon: JSX.Element,
        label?: string,
        ariaLabelPrefix?: string,
        ariaLabel?: string,
        color?: string
    ) => {
        if (!label) return <Fragment />
        return (
            <IconTextBadge
                key={label}
                label={label}
                ariaLabelPrefix={ariaLabelPrefix}
                ariaLabel={ariaLabel}
                icon={icon}
                color={color}
            />
        )
    }

    const recurrenceBadge = useMemo(
        () =>
            buildIconTextBadge(
                iconMap.repeatIcon,
                item.recurrence || '',
                'recurrent: ',
                item.recurrence
            ),
        [item.recurrence]
    )
    const priorityBadge = useMemo(
        () =>
            buildIconTextBadge(
                iconMap.priorityIcon,
                item.priority,
                'priority: ',
                item.priority,
                item.priority === 'High'
                    ? 'text-warning'
                    : item.priority === 'Medium'
                      ? 'text-secondary'
                      : ''
            ),
        [item.priority]
    )
    const positionBadge = useMemo(
        () =>
            buildIconTextBadge(
                iconMap.fileIcon,
                item.position.visual,
                item.position.visual
            ),
        [item.position.visual]
    )

    return (
        <div className='flex flex-col flex-wrap gap-1'>
            <div key='datetime' className='flex flex-wrap gap-1'>
                {onModifyTask && (
                    <IconOnlyBadge key={1} onclick={onModifyTask} />
                )}
                {createDateBadge}
                {startDateBadge}
                {scheduledDateBadge}
                {dueDateBadge}
                {completeDateBadge}
                {recurrenceBadge}
                {priorityBadge}
                {positionBadge}
            </div>
            <div key='tags' className='flex flex-wrap gap-1'>
                {Array.from(item.tags).map((t, i) => {
                    return (
                        // <TaskItemEventHandlersContext.Consumer key={i}>
                        // {({ handleTagClick }) => (
                        <TagBadge
                            key={i}
                            tag={t}
                            tagPalette={{} as Map<string, string>}
                            // onTagClick={handleTagClick}
                        />
                        // )}
                        // </TaskItemEventHandlersContext.Consumer>
                    )
                })}
            </div>
        </div>
    )
}

export default TaskInfoLine
