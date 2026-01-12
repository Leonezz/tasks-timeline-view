import type { MouseEventHandler } from 'react'
import type moment from 'moment'
import { IconTextBadge } from './IconTextBadge'
import { innerDateFormat } from '../../util/defs'
import type { ThemeColor } from '../../@types/base'

export const IconDateBadge = ({
  icon,
  labelPrefix,
  labelSuffix,
  ariaLabelPrefix,
  ariaLabelSuffix,
  date,
  // onClick,
  color
}: {
  icon: JSX.Element
  labelPrefix?: string
  labelSuffix?: string
  ariaLabelPrefix?: string
  ariaLabelSuffix?: string
  date: moment.Moment
  onClick?: MouseEventHandler
  color?: ThemeColor
}) => {
  labelPrefix = labelPrefix || ''
  labelSuffix = labelSuffix || ''
  ariaLabelPrefix = ariaLabelPrefix || ''
  ariaLabelSuffix = ariaLabelPrefix || ''

  const label = date.format(innerDateFormat)

  return (
    <IconTextBadge
      icon={icon}
      labelPrefix={labelPrefix}
      labelSuffix={labelSuffix}
      ariaLabelPrefix={ariaLabelPrefix}
      ariaLabelSuffix={ariaLabelSuffix}
      label={label}
      ariaLabel={label}
      color={color}
    />
  )
}
