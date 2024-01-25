import React, { useEffect, useState } from 'react'
import {
    Dropdown,
    DropdownMenu,
    DropdownTrigger,
    DropdownItem,
    Chip,
    Switch,
    DropdownSection
} from '@nextui-org/react'
import { Selection } from '@nextui-org/react'

function SortOptionSelector({
    options,
    label,
    selectedOption,
    setSelectedOption,
    reversed,
    setReversed
}: {
    options: string[]
    label: string
    selectedOption: string
    setSelectedOption: (s: string) => void
    reversed: boolean
    setReversed: (r: boolean) => void
}) {
    const [sortCmp, setSortCmp] = useState<Selection>(new Set([selectedOption]))

    useEffect(() => {
        if (sortCmp === 'all' || sortCmp.size === 0) {
            setSelectedOption('')
        } else {
            const selectedValue = Array.from(sortCmp)[0]
            setSelectedOption(selectedValue.valueOf().toString())
        }
    }, [sortCmp])

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
                selectedKeys={sortCmp}
                onSelectionChange={setSortCmp}
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

export default SortOptionSelector
