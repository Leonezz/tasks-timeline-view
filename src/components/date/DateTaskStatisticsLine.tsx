import React, { Fragment } from 'react'
import IconTextBadge from '../item/IconTextBadge'
import { useTaskStatusOption } from '../options/GlobalOption'

export type CounterType = {
    label: string
    color: string
    isDoneType: boolean
    cnt: number
}

function DateTaskStatisticsLine({ counters }: { counters: CounterType[] }) {
    const todoCnt = counters.reduce(
        (result, counter) => result + (counter.isDoneType ? 0 : counter.cnt),
        0
    )

    if (todoCnt === 0) {
        return <span className='success'>All done today! 👍</span>
    }
    const ariaLabelSuffix = 'tasks on this date.'

    const { getIconFromStatus } = useTaskStatusOption()
    return (
        <div className='gap-2'>
            {counters.map((counter) => {
                if (counter.cnt === 0) return <Fragment />
                return (
                    <IconTextBadge
                        key={counter.label}
                        icon={getIconFromStatus(counter.label)}
                        label={counter.cnt.toString()}
                        ariaLabelPrefix={counter.cnt.toString()}
                        ariaLabel={` ${counter.label.toLowerCase()} ${ariaLabelSuffix}`}
                        color={counter.color}
                    />
                )
            })}
        </div>
    )
}

export default DateTaskStatisticsLine
