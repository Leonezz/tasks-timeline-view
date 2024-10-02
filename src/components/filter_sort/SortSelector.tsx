import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Chip,
  Switch,
  DropdownSection
} from '@nextui-org/react'
import { SortOptions } from '../../util/task-item/sort'

export const SortOptionSelector = ({
  options,
  label,
  selectedOption,
  setSelectedOption,
  reversed,
  setReversed
}: {
  options: Readonly<SortOptions[]>
  label: string
  selectedOption: SortOptions
  setSelectedOption: (s: SortOptions) => void
  reversed: boolean
  setReversed: (r: boolean) => void
}) => {
  const isActive = selectedOption.length > 0 || reversed

  console.debug('sort selector re-redener', selectedOption)

  return (
    <Dropdown
      placement='bottom'
      classNames={{
        content: 'w-fit min-w-1'
      }}
    >
      <DropdownTrigger>
        <Chip
          size='sm'
          color={isActive ? 'primary' : 'default'}
          aria-label={label}
        >
          {label}
        </Chip>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode='single'
        selectedKeys={selectedOption}
        onSelectionChange={(keys) => {
          setSelectedOption(Array.from(keys).join('') as SortOptions)
        }}
        classNames={{
          base: 'w-fit'
        }}
        topContent={
          <Switch
            size='sm'
            classNames={{
              base: 'inline-flex flex-row-reverse gap-2'
            }}
            isSelected={reversed}
            onValueChange={setReversed}
          >
            Reverse Sort
          </Switch>
        }
      >
        <DropdownSection>
          {options.map((option) => (
            <DropdownItem key={option} value={option}>
              {option}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

