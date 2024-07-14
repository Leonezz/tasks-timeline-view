import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItemProps
} from '@nextui-org/react'
import React from 'react'

export type DropdownStyleSingleSelectItem = {
  label: string
  icon: JSX.Element
  color: string
}

function TrivialSingleSelect({
  options,
  selectedKeys,
  setSelectedKey,
  icon,
  ariaLabel
}: {
  options: (DropdownStyleSingleSelectItem | string)[]
  selectedKeys: Set<string>
  setSelectedKey: (key: string) => any
  icon: JSX.Element
  ariaLabel: string
}) {
  const getOptionLabel = (option: (typeof options)[number]) =>
    typeof option === 'string' ? option : option.label
  const labels = options.map((option) => getOptionLabel(option))
  const getOptionIcon = (option: (typeof options)[number]) =>
    typeof option === 'string' ? icon : option.icon
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
          icon={icon}
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

export default TrivialSingleSelect
