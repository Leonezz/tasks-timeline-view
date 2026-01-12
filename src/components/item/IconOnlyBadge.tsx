import type { MouseEventHandler } from 'react'
import { TaskItemInfoBadge } from './TaskItemInfoBadge'
import { PencilIcon } from '../asserts/icons/pencil'

export const IconOnlyBadge = ({ onclick }: { onclick: MouseEventHandler }) => {
  return (
    <TaskItemInfoBadge
      isIconOnly={true}
      onClick={onclick}
      icon={<PencilIcon />}
    />
  )
}
