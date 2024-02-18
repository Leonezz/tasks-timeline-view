import {
    Dropdown,
    DropdownItem,
    DropdownTrigger,
    Avatar,
    DropdownMenu
} from '@nextui-org/react'
import React from 'react'

function TrivialSingleSelect({
    options,
    selectedKeys,
    setSelectedKey,
    icon,
    ariaLabel
}: {
    options: string[]
    selectedKeys: Set<string>
    setSelectedKey: (key: string) => any
    icon: JSX.Element
    ariaLabel: string
}) {
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
                items={options}
            >
                {options.map((option) => (
                    <DropdownItem key={option}>{option}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default TrivialSingleSelect
