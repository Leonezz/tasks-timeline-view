import React from 'react'

function YearUnfinishedTip({
    unfinishedTaskCnt,
    unfinishedDayCnt
}: {
    unfinishedTaskCnt: number
    unfinishedDayCnt: number
}) {
    if (unfinishedTaskCnt > 0) {
        return (
            <span className='flex gap-1'>
                <a key={1} className='text-sm font-bold text-danger'>
                    {unfinishedTaskCnt}
                </a>
                <a key={2} className='text-sm text-default'>
                    {'unfinished tasks in'}
                </a>
                <a key={3} className='text-sm font-bold text-danger'>
                    {unfinishedDayCnt}
                </a>
                <a key={4} className='text-sm text-default'>
                    {'days.'}
                </a>
            </span>
        )
    }
    return <a className=' text-sm font-bold text-success'>All Finished! 👍</a>
}

export default YearUnfinishedTip
