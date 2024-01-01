import React from 'react'
import {
    Card,
    CardFooter,
    CardHeader,
    Divider,
    Avatar
} from '@nextui-org/react'
import moment from 'moment'

function DateCalendarIcon({
    date,
    mode
}: {
    date: moment.Moment
    mode: 'monthday' | 'weekday' | 'weekdayicon'
}) {
    const month = date.format('MMM')
    const day = date.format('DD')
    const weekday = date.format('ddd')
    switch (mode) {
        case 'monthday':
        case 'weekday': {
            const weekendClassNames = date.weekday() > 4 ? 'bg-pink-200' : ''
            return (
                <Card
                    className={
                        'h-12 w-12 items-center gap-0 ' + weekendClassNames
                    }
                    radius='sm'
                >
                    <CardHeader className='justify-center px-1 py-0 text-center font-extrabold text-red-500'>
                        {mode === 'monthday' ? month : weekday}
                    </CardHeader>
                    <Divider />
                    <CardFooter className='justify-center px-1 py-0 text-center text-lg font-extrabold'>
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
    }
}

export default DateCalendarIcon
