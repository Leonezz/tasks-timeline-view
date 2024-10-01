import { MouseEventHandler } from 'react'
import TaskItemInfoBadge from './TaskItemInfoBadge'

function IconTextBadge({
  icon,
  labelPrefix,
  label,
  labelSuffix,
  ariaLabelPrefix,
  ariaLabel,
  ariaLabelSuffix,
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
  color?: string
}) {
  labelPrefix = labelPrefix || ''
  labelSuffix = labelSuffix || ''
  ariaLabel = ariaLabel || ''
  ariaLabelPrefix = ariaLabelPrefix || ''
  ariaLabelSuffix = ariaLabelSuffix || ''

  return (
    <TaskItemInfoBadge
      icon={icon}
      label={labelPrefix + label + labelSuffix}
      ariaLabel={'' + ariaLabelPrefix + ariaLabel + labelSuffix}
      onClick={onClick}
      iconColor={color}
    />
  )
}

export default IconTextBadge
