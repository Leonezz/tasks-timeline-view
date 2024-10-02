import { MouseEventHandler } from 'react'
import { TaskItemInfoBadge } from './TaskItemInfoBadge'
import { ThemeColor } from '../../@types/base'

export const IconTextBadge = ({
  icon,
  labelPrefix,
  label,
  labelSuffix,
  ariaLabelPrefix,
  ariaLabel,
  // ariaLabelSuffix,
  onClick,
  color
}: {
  icon: JSX.Element
  labelPrefix?: string
  label: string
  labelSuffix?: string
  ariaLabelPrefix?: string
  ariaLabel?: string
  ariaLabelSuffix?: string
  onClick?: MouseEventHandler
  color?: ThemeColor
}) => {
  labelPrefix = labelPrefix || ''
  labelSuffix = labelSuffix || ''
  ariaLabel = ariaLabel || ''
  ariaLabelPrefix = ariaLabelPrefix || ''
  // ariaLabelSuffix = ariaLabelSuffix || ''

  return (
    <TaskItemInfoBadge
      icon={icon}
      label={labelPrefix + label + labelSuffix}
      ariaLabel={ariaLabelPrefix + ariaLabel + labelSuffix}
      onClick={onClick}
      color={color === undefined ? 'default' : color}
      iconColor={color}
    />
  )
}
