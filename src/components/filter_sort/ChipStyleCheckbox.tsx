import { SVGProps } from 'react'
import {
  useCheckbox,
  Chip,
  VisuallyHidden,
  tv,
  CheckboxProps
} from '@nextui-org/react'

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='1em'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    viewBox='0 0 24 24'
    width='1em'
    {...props}
  >
    <polyline points='20 6 9 17 4 12' />
  </svg>
)

const checkbox = tv({
  slots: {
    base: 'border-default hover:bg-default-200',
    content: 'text-default-500'
  },
  variants: {
    isSelected: {
      true: {
        base: 'border-primary bg-primary hover:bg-primary-500 hover:border-primary-500',
        content: 'text-primary-foreground pl-1'
      }
    },
    isFocusVisible: {
      true: {
        base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background'
      }
    }
  }
})

interface ChipStyleCheckboxProps extends CheckboxProps {
  showicon: boolean
}

export const ChipStyleCheckbox = (props: ChipStyleCheckboxProps) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps
  } = useCheckbox({
    ...props
  })

  const styles = checkbox({ isSelected, isFocusVisible })

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content()
        }}
        radius={props.radius}
        color={props.color}
        startContent={
          isSelected && props.showicon ? <CheckIcon className='ml-1' /> : null
        }
        variant='faded'
        {...getLabelProps()}
        ref={undefined}
      >
        {children ? children : isSelected ? 'Enabled' : 'Disabled'}
      </Chip>
    </label>
  )
}
