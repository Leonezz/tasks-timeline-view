import { getLocalTimeZone } from '@internationalized/date'
export const innerDateFormat = 'YYYY-MM-DD'
export const innerTimeFormat = 'HH:MM'
export const innerDateTimeFormat = innerDateFormat + ' ' + innerTimeFormat
export const visualDateFormat = 'dddd, MMM, D'
export const timeZone = getLocalTimeZone()
