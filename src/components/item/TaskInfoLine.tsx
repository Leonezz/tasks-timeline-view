import { IconOnlyBadge } from './IconOnlyBadge'
import { TagBadge } from './TagBadge'
import { MouseEventHandler } from 'react'
import { IconDateBadge } from './IconDateBadge'
import { IconTextBadge } from './IconTextBadge'
import { useTaskPriorityConfig } from '../options/GlobalOption'
import { TaskItem } from '../../@types/task-item'
import { TaskIcon } from '../asserts/icons/task'
import { StartIcon } from '../asserts/icons/start'
import { ScheduledIcon } from '../asserts/icons/scheduled'
import { DoneIcon } from '../asserts/icons/done'
import { DueIcon } from '../asserts/icons/due'
import { RepeatIcon } from '../asserts/icons/repeat'
import { FileIcon } from '../asserts/icons/file'
import { ThemeColor } from '../../@types/base'

export const TaskInfoLine = ({
  item,
  onModifyTask
}: {
  item: TaskItem
  onModifyTask?: MouseEventHandler
}) => {
  const { created, start, due, completion, scheduled } = item.dateTime

  const recurrenceLabel =
    (item.recurrence && item.recurrence.toText()) || 'no repeat'

  const { priority, list: position } = item

  const { getPriorityIcon, getPriorityColor } = useTaskPriorityConfig()
  const PriorityIcon = getPriorityIcon(priority)

  return (
    <div className='flex flex-col flex-wrap gap-1'>
      <div key='datetime' className='flex flex-wrap gap-1'>
        {onModifyTask && <IconOnlyBadge key={1} onclick={onModifyTask} />}
        {created && (
          <IconDateBadge
            icon={<TaskIcon width={12} height={12} />}
            key='create at'
            ariaLabelPrefix='create at '
            date={created}
          />
        )}
        {start && (
          <IconDateBadge
            icon={<StartIcon width={12} height={12} />}
            key='start at'
            ariaLabelPrefix='start at '
            date={start}
            color='primary'
          />
        )}
        {scheduled && (
          <IconDateBadge
            icon={<ScheduledIcon width={12} height={12} />}
            key='scheduled to'
            ariaLabelPrefix='scheduled to '
            date={scheduled}
            color='secondary'
          />
        )}
        {due && (
          <IconDateBadge
            icon={<DueIcon width={12} height={12} />}
            key='due at '
            ariaLabelPrefix='due at '
            date={due}
            color='danger'
          />
        )}
        {completion && (
          <IconDateBadge
            icon={<DoneIcon width={12} height={12} />}
            key='complete at'
            ariaLabelPrefix='complete at'
            date={completion}
            color='success'
          />
        )}
        <IconTextBadge
          key={priority}
          label={priority}
          ariaLabelPrefix='priority: '
          ariaLabel={priority}
          icon={<PriorityIcon width={12} height={12} />}
          color={getPriorityColor(priority) as ThemeColor}
        />
        <IconTextBadge
          key={recurrenceLabel}
          label={recurrenceLabel}
          ariaLabelPrefix='report: '
          ariaLabel={recurrenceLabel}
          icon={<RepeatIcon width={12} height={12} />}
        />
        <IconTextBadge
          key={position.visual}
          label={position.visual}
          ariaLabel={position.visual}
          icon={<FileIcon width={12} height={12} />}
        />
      </div>
      <div key='tags' className='flex flex-wrap gap-1'>
        {Array.from(item.tags).map((t, i) => {
          return (
            // <TaskItemEventHandlersContext.Consumer key={i}>
            // {({ handleTagClick }) => (
            <TagBadge
              key={i}
              tag={t}
              tagPalette={new Map()}
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
