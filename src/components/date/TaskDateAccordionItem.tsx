import { AccordionItem } from '@heroui/react'
import type moment from 'moment'
import { TaskItemCheckbox } from '../item/TaskItemCheckbox'
import { innerDateFormat } from '../../util/defs'
import type { TaskItem } from '../../@types/task-item'

export const TaskDateAccordionItem = ({
  date,
  taskList
}: {
  date: moment.Moment
  taskList: TaskItem[]
}) => {
  const formattedDate = date.format(innerDateFormat)
  return (
    <AccordionItem
      aria-label={date.format(formattedDate)}
      title={formattedDate}
      // className=" grid"
      classNames={{
        content: 'grid grid-cols-1 gap-4'
      }}
    >
      {taskList.map((t, i) => (
        <TaskItemCheckbox key={i} item={t} />
      ))}
    </AccordionItem>
  )
}
