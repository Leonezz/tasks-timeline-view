import { useMemo } from 'react'
import {
  CheckboxGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Chip,
  Button
} from '@heroui/react'
import { ChipStyleCheckbox } from './ChipStyleCheckbox'
import type { TaskItem, TaskPriority, TaskStatus } from '../../@types/task-item'
// import { iconMap } from "../asserts/icons";
type FilterTypes = {
  Tags: string
  List: TaskItem['list']
  Priority: TaskPriority
  Status: TaskStatus
}

const to_string = <Key extends keyof FilterTypes>(
  key: Key,
  item: FilterTypes[Key]
): string => {
  if (key === 'List') {
    return (item as FilterTypes['List']).visual
  }
  return item as string
}

export const FilterSelector = <Key extends keyof FilterTypes>({
  options,
  label,
  selectedOptions,
  setSelectedOptions
}: {
  options: Readonly<Set<FilterTypes[Key]>>
  label: Key
  selectedOptions: Set<FilterTypes[Key]>
  setSelectedOptions: (s: Set<FilterTypes[Key]>) => void
}) => {
  const selectedOptionsCnt = useMemo(
    () => selectedOptions.size,
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
                onClick={() => setSelectedOptions(new Set())}
                size='sm'
                isDisabled={selectedOptionsCnt === 0}
                className='p-0'
                color='primary'
                variant='light'
              >
                Clear All
              </Button>
            </div>
          }
          orientation='vertical'
          value={[...selectedOptions].map((v) => to_string(label, v))}
          onValueChange={(value) => {
            if (value.length === options.size) {
              setSelectedOptions(new Set())
            } else {
              const selectedValues = [...options].filter((v) =>
                value.includes(to_string(label, v))
              )
              setSelectedOptions(new Set(selectedValues))
            }
          }}
        >
          {[...options].map((option) => {
            const option_str = to_string(label, option)
            return (
              <ChipStyleCheckbox
                showicon={true}
                key={option_str}
                value={option_str}
              >
                {option_str}
              </ChipStyleCheckbox>
            )
          })}
        </CheckboxGroup>
      </PopoverContent>
    </Popover>
  )
}
