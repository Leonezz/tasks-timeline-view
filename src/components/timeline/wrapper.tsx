import { useEffect } from 'react'
import { TaskItem } from '../../tasks/TaskItem'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import { TimelineView } from './TimelineView'
import '../../../dist/style.css'

type TimelineWrapperProps = {
  initialItems: TaskItem[]
}
export const TimelineWrapper = ({ initialItems }: TimelineWrapperProps) => {
  const { init } = useTodoItemStore()
  useEffect(() => init({ items: initialItems }), [initialItems, init])
  return <TimelineView />
}
