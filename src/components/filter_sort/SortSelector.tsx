import React, { useEffect, useState } from "react";
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Chip, Switch, DropdownSection } from "@nextui-org/react";
import { Selection } from "@nextui-org/react";

function SortOptionSelector({
    options,
    label,
    selectedOption,
    setSelectedOption,
    reversed,
    setReversed,
}: {
    options: string[],
    label: string,
    selectedOption: string,
    setSelectedOption: (s: string) => void,
    reversed: boolean,
    setReversed: (r: boolean) => void,
}) {

    const [sortCmp, setSortCmp] = useState(new Set([selectedOption]));

    useEffect(
        () => {
            if (sortCmp.size > 0) {
                setSelectedOption(Array.from(sortCmp)[0]);
            }
        },
        [sortCmp]
    );

    console.log("sort selector re-redener");

    return (
        <Dropdown
            placement="bottom"
            classNames={{
                content: "w-fit min-w-1"
            }}
        >
            <DropdownTrigger>
                <Chip
                    size="sm"
                    color={selectedOption.length > 0 ? "primary" : "default"}
                    aria-label={label}
                >
                    {label}
                </Chip>
            </DropdownTrigger>
            <DropdownMenu
                selectionMode="single"
                selectedKeys={sortCmp}
                onSelectionChange={setSortCmp as React.Dispatch<React.SetStateAction<Selection>>}
                classNames={{
                    base: "w-fit"
                }}
                topContent={
                    <Switch
                        size="sm"
                        classNames={{
                            base: "inline-flex flex-row-reverse gap-2"
                        }}
                        isSelected={reversed}
                        onValueChange={setReversed}
                    >
                        Reverse Sort
                    </Switch>
                }
            >
                <DropdownSection>
                    {options.map(
                        (option) => <DropdownItem key={option}
                            value={option}
                        >
                            {option}
                        </DropdownItem>
                    )}
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}

export default SortOptionSelector;