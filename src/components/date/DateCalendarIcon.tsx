import { Fragment } from 'react'
import {
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Avatar
} from '@nextui-org/react'
import moment from 'moment'
import { useGeneralOption } from '../options/GlobalOption'

export const DateCalendarIcon = ({ date }: { date: moment.Moment }) => {
  const month = date.format('MMM')
  const day = date.format('DD')
  const weekday = date.format('ddd')
  const { dateIconStyle } = useGeneralOption()
  switch (dateIconStyle) {
    case 'monthday':
    case 'weekday': {
      const weekendClassNames = date.weekday() > 4 ? 'bg-pink-200' : ''
      return (
        <Card
          className={
            'h-10 w-10 items-center gap-0 border-small shadow-none ' +
            weekendClassNames
          }
          radius='sm'
        >
          <CardHeader className='justify-center px-1 py-0 text-center text-sm font-extrabold text-red-500'>
            {dateIconStyle === 'monthday' ? month : weekday}
          </CardHeader>
          <Divider />
          <CardFooter className='justify-center px-1 py-0 text-center text-medium font-extrabold'>
            {day}
          </CardFooter>
        </Card>
      )
    }
    case 'weekdayicon':
      return (
        <Avatar
          src={
            'https://img.icons8.com/color/48/' +
            date.format('dddd').toLowerCase() +
            '.png'
          }
          size='sm'
          radius='sm'
        />
      )
    default:
      return <Fragment />
  }
}
