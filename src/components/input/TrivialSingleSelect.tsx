import { Dropdown, DropdownItem, DropdownTrigger, Avatar, DropdownMenu } from "@nextui-org/react";
import { Selection } from "@nextui-org/react";
import React from "react";

function TrivialSingleSelect({
    options,
    selectedKeys,
    setSelectedKeys,
    icon,
    ariaLabel,
}: {
    options: string[],
    selectedKeys: Set<string>,
    setSelectedKeys: React.Dispatch<React.SetStateAction<Selection>>,
    icon: JSX.Element,
    ariaLabel: string,
}) {
    return (
        <Dropdown
            aria-label={ariaLabel}
            classNames={{
                base: "p-0 w-fit",
                content: "w-fit min-w-1"
            }}>
            <DropdownTrigger>
                <Avatar
                    icon={icon}
                    size="sm"
                    radius="sm"
                    isBordered={false}
                    alt={ariaLabel}
                    classNames={{
                        base: "bg-transparent px-0"
                    }}
                />
            </DropdownTrigger>
            <DropdownMenu
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                classNames={{
                    base: "w-fit"
                }}
                items={options}
            >
                {options.map(
                    (option) => <DropdownItem key={option}
                    >
                        {option}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown >
    )
}

export default TrivialSingleSelect;