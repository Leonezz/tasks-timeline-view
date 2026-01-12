import { Card, CardHeader, Chip } from '@heroui/react'
import moment from 'moment'
import { visualDateFormat } from '../../util/defs'
import { useGeneralOption } from '../options/GlobalOption'
function TodayCard() {
  const { todayFocus, setTodayFocus } = useGeneralOption()
  return (
    <Card
      classNames={{
        base: 'shadow-none bg-origin-content bg-transparent'
      }}
    >
      <CardHeader className='flex flex-1 cursor-default flex-col items-center gap-1 py-1 select-none'>
        <Chip
          classNames={{
            base: 'shadow-none bg-transparent',
            content:
              'text-3xl font-bold ' +
              (todayFocus ? 'text-primary' : 'text-black')
          }}
          onClick={() => setTodayFocus(!todayFocus)}
          style={{
            cursor: 'pointer'
          }}
        >
          Today
        </Chip>
        <span className='text-md text-default-500 font-mono'>
          {moment().format(visualDateFormat)}
        </span>
      </CardHeader>
    </Card>
  )
}

export default TodayCard
