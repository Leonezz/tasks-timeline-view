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
        <p key={1} className='font-mono text-xs font-bold text-danger'>
          {unfinishedTaskCnt}
        </p>
        <p key={2} className='font-mono text-xs text-default'>
          {'unfinished tasks in '}
        </p>
        <p key={3} className='font-mono text-xs font-bold text-danger'>
          {unfinishedDayCnt}
        </p>
        <p key={4} className='font-mono text-xs text-default'>
          {' days.'}
        </p>
      </span>
    )
  }
  return (
    <p className='font-mono text-xs font-bold text-success'>All Finished! 👍</p>
  )
}
