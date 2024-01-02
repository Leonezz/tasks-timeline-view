import { Card, CardHeader, Chip } from '@nextui-org/react'
import moment from 'moment'
import React from 'react'
import { visualDateFormat } from '../../util/defs'
function TodayCard({
    unfinishedCnt,
    isTodayActive,
    setTodayActive
}: {
    unfinishedCnt: number
    isTodayActive: boolean
    setTodayActive: (s: boolean) => void
}) {
    return (
        <Card
            classNames={{
                base: 'shadow-none bg-origin-content bg-transparent'
            }}
        >
            <CardHeader className='flex flex-1 cursor-default select-none flex-col items-center py-1'>
                <Chip
                    classNames={{
                        base: 'shadow-none bg-transparent',
                        content:
                            'text-3xl font-bold ' +
                            (isTodayActive ? 'text-primary' : 'text-black')
                    }}
                    onClick={() => setTodayActive(!isTodayActive)}
                >
                    Today
                </Chip>
                <div className='text-md text-default-500'>
                    {moment().format(visualDateFormat)}
                </div>
            </CardHeader>
        </Card>
    )
}

export default TodayCard
