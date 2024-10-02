import { useMemo } from 'react'
import {
  CheckboxGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Chip,
  Button
} from '@nextui-org/react'
import { ChipStyleCheckbox } from './ChipStyleCheckbox'
// import { iconMap } from "../asserts/icons";

export const FilterSelector = ({
  options,
  label,
  selectedOptions,
  setSelectedOptions
}: {
  options: Readonly<string[]>
  label: string
  selectedOptions: string[]
  setSelectedOptions: (s: string[]) => void
}) => {
  const selectedOptionsCnt = useMemo(
    () => selectedOptions.length,
    [selectedOptions]
  )

  return (
    <Popover placement='bottom'>
      <PopoverTrigger>
        <Chip
          size='sm'
          color={selectedOptionsCnt > 0 ? 'primary' : 'default'}
          aria-label={'Filter with: ' + label}
        >
          {label}
        </Chip>
      </PopoverTrigger>
      <PopoverContent>
        <CheckboxGroup
          className='gap-1'
          label={
            <div className='flex items-center justify-between gap-2'>
              <p>{`${selectedOptionsCnt} ${label} selected`}</p>
              <Button
                onClick={() => setSelectedOptions([])}
                size='sm'
                isDisabled={selectedOptionsCnt === 0}
                className='p-0'
              >
                Clear All
              </Button>
            </div>
          }
          orientation='vertical'
          value={selectedOptions}
          onValueChange={(value) => {
            if (value.length === options.length) {
              setSelectedOptions([])
            } else {
              setSelectedOptions(value)
            }
          }}
        >
          {options.map((option, i) => (
            <ChipStyleCheckbox showicon={true} key={i} value={option}>
              {option}
            </ChipStyleCheckbox>
          ))}
        </CheckboxGroup>
      </PopoverContent>
    </Popover>
  )
}

