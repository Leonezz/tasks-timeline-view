import { ThemeColor } from '../../@types/base'
import { IconTextBadge } from '../item/IconTextBadge'
import { useTaskStatusConfig } from '../options/GlobalOption'

export type CounterType = {
  label: string
  color: ThemeColor
  isDoneType: boolean
  cnt: number
}

export const DateTaskStatisticsLine = ({
  counters
}: {
  counters: CounterType[]
}) => {
  const todoCnt = counters.reduce(
    (result, counter) => result + (counter.isDoneType ? 0 : counter.cnt),
    0
  )
  const { getIconFromStatus } = useTaskStatusConfig()
  const totalCount = counters.reduce((prev, cur) => prev + cur.cnt, 0)

  if (todoCnt === 0) {
    return (
      <span className='font-mono text-sm text-neutral-400'>{`${totalCount} tasks all finished`}</span>
    )
  }
  const ariaLabelSuffix = 'tasks on this date.'

  return (
    <div className='flex flex-row gap-1'>
      {counters.map((counter) => {
        if (counter.cnt === 0) {
          return null
        }
        const Icon = getIconFromStatus(counter.label)

        return (
          <IconTextBadge
            key={counter.label}
            icon={<Icon width={10} height={10} />}
            label={counter.cnt.toString()}
            ariaLabelPrefix={counter.cnt.toString()}
            ariaLabel={`${counter.label.toLowerCase()} ${ariaLabelSuffix}`}
            color={counter.color}
          />
        )
      })}
    </div>
  )
}
