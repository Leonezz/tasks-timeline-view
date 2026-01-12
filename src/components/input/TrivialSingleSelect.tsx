import type { DropdownItemProps } from '@heroui/react'
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  Avatar,
  DropdownMenu
} from '@heroui/react'
import type { ComponentType } from 'react' // Removed ReactElement

export type DropdownStyleSingleSelectItem = {
  label: string
  icon: ComponentType<{ width?: number; height?: number }>
  color: string
}

export const TrivialSingleSelect = ({
  options,
  selectedKeys,
  setSelectedKey,
  icon: IconComponent,
  ariaLabel
}: {
  options: Array<DropdownStyleSingleSelectItem | string>
  selectedKeys: Set<string>
  setSelectedKey: (key: string) => void
  icon: ComponentType<{ width?: number; height?: number }>
  ariaLabel: string
}) => {
  const getOptionLabel = (option: (typeof options)[number]) =>
    typeof option === 'string' ? option : option.label
  const labels = options.map((option) => getOptionLabel(option))
  const getOptionIcon = (option: (typeof options)[number]) => {
    if (typeof option === 'string') {
      return <IconComponent />
    } else {
      const OptionIconComponent = option.icon
      return <OptionIconComponent />
    }
  }
  const getOptionColor = (option: (typeof options)[number]) =>
    typeof option === 'string' ? 'default' : option.color
  return (
    <Dropdown
      aria-label={ariaLabel}
      classNames={{
        base: 'p-0 w-fit',
        content: 'w-fit min-w-1'
      }}
    >
      <DropdownTrigger>
        <Avatar
          icon={<IconComponent />}
          size='sm'
          radius='sm'
          isBordered={false}
          alt={ariaLabel}
          classNames={{
            base: 'bg-transparent px-0'
          }}
        />
      </DropdownTrigger>
      <DropdownMenu
        selectionMode='single'
        disallowEmptySelection
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          if (keys === 'all') return
          const key = [...keys.keys()][0].valueOf().toString()
          return setSelectedKey(key)
        }}
        classNames={{
          base: 'w-fit'
        }}
        items={labels.entries()}
      >
        {options.map((option) => (
          <DropdownItem
            key={getOptionLabel(option)}
            startContent={getOptionIcon(option)}
            color={getOptionColor(option) as DropdownItemProps['color']}
          >
            {getOptionLabel(option)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
