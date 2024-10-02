import { Progress } from '@nextui-org/react'

export const YearHeaderProgress = ({
  finished,
  total
}: {
  finished: number
  total: number
}) => {
  return (
    <Progress
      label={<span className='font-mono text-sm'>progress of this year</span>}
      value={finished}
      maxValue={total}
      showValueLabel={true}
      valueLabel={
        <span className='font-mono text-sm'>{`${finished.toString()} / ${total.toString()}`}</span>
      }
      size='sm'
      className='gap-0'
      classNames={{
        base: 'pt-1',
        label: 'text-sm'
      }}
    />
  )
}
