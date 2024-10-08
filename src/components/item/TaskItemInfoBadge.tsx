import { CSSProperties, MouseEventHandler } from 'react'
import { Chip } from '@nextui-org/react'
import { ThemeColor } from '../../@types/base'

export const CheckIcon = ({
  size,
  height,
  width
}: {
  size: number
  height?: number
  width?: number
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z'
        fill='currentColor'
      />
    </svg>
  )
}

export const TaskItemInfoBadge = ({
  label,
  ariaLabel,
  icon,
  onClick,
  color,
  isIconOnly,
  className,
  iconColor,
  style
}: {
  label?: string
  ariaLabel?: string
  icon?: JSX.Element
  onClick?: MouseEventHandler
  color?: ThemeColor
  isIconOnly?: boolean
  className?: string
  iconColor?: ThemeColor
  style?: CSSProperties
}) => {
  isIconOnly = isIconOnly || false
  let contentPaddingLeft = 'pl-1'
  if (isIconOnly) {
    contentPaddingLeft = 'pl-0'
  }
  return (
    <Chip
      avatar={icon || ''}
      // startContent={}
      aria-label={ariaLabel || ''}
      onClick={onClick}
      variant='flat'
      color={color}
      size='sm'
      radius='sm'
      className={`${className} h-fit items-center py-0.5 pr-0`}
      classNames={{
        base: 'border-opacity-50 hover:border-opacity-100 ',
        content: 'text-sx align-middle font-mono ' + contentPaddingLeft,
        avatar: 'text-' + iconColor
      }}
      style={{ ...style }}
    >
      {label}
    </Chip>
  )
}
