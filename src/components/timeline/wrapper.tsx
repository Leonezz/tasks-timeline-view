import { useEffect } from 'react'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import { TimelineView } from './TimelineView'
import '../../../dist/style.css'
import { TaskItem } from '../../@types/task-item'

type TimelineWrapperProps = {
  initialItems: TaskItem[]
}
export const TimelineWrapper = ({ initialItems }: TimelineWrapperProps) => {
  const { init } = useTodoItemStore()
  useEffect(() => init({ items: initialItems }), [initialItems, init])
  return <TimelineView />
}
