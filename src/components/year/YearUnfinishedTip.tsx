export const YearUnfinishedTip = ({
  unfinishedTaskCnt,
  unfinishedDayCnt
}: {
  unfinishedTaskCnt: number
  unfinishedDayCnt: number
}) => {
  if (unfinishedTaskCnt > 0) {
    return (
      <span className='flex gap-1'>
        <p key={1} className='text-danger font-mono text-xs font-bold'>
          {unfinishedTaskCnt}
        </p>
        <p key={2} className='text-default font-mono text-xs'>
          {'unfinished tasks in '}
        </p>
        <p key={3} className='text-danger font-mono text-xs font-bold'>
          {unfinishedDayCnt}
        </p>
        <p key={4} className='text-default font-mono text-xs'>
          {' days.'}
        </p>
      </span>
    )
  }
  return (
    <p className='text-success font-mono text-xs font-bold'>All Finished! 👍</p>
  )
}
