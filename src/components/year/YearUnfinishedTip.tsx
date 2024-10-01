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
        <p key={1} className='text-sm font-bold text-danger'>
          {unfinishedTaskCnt}
        </p>
        <p key={2} className='text-sm text-default'>
          {'unfinished tasks in'}
        </p>
        <p key={3} className='text-sm font-bold text-danger'>
          {unfinishedDayCnt}
        </p>
        <p key={4} className='text-sm text-default'>
          {'days.'}
        </p>
      </span>
    )
  }
  return <p className=' text-sm font-bold text-success'>All Finished! 👍</p>
}

export default YearUnfinishedTip
