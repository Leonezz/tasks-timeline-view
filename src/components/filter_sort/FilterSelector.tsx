import React, { useEffect, useMemo } from "react";
import { CheckboxGroup, Popover, PopoverContent, PopoverTrigger, Chip, Button } from "@nextui-org/react";
import { ChipStyleCheckbox } from "./ChipStyleCheckbox";
// import { iconMap } from "../asserts/icons";

function FilterSelector({
    options,
    label,
    selectedOptions,
    setSelectedOptions,
}: {
    options: string[],
    label: string,
    selectedOptions: string[],
    setSelectedOptions: (s: string[]) => void
}) {

    const selectedOptionsCnt = useMemo(
        () => selectedOptions.length,
        [selectedOptions]
    );

    // clear all selected when all selected
    useEffect(
        () => {
            if (selectedOptionsCnt == options.length) {
                setSelectedOptions([]);
            }
        },
        [selectedOptionsCnt]
    );

    return (
        <Popover
            placement="bottom"
        >
            <PopoverTrigger>
                <Chip
                    size="sm"
                    color={selectedOptionsCnt > 0 ? "primary" : "default"}
                    aria-label={"Filter with: " + label}
                >
                    {label}
                </Chip>
            </PopoverTrigger>
            <PopoverContent>
                <CheckboxGroup
                    className="gap-1"
                    label={
                        <div className="flex items-center justify-between">
                            <p>{`${selectedOptionsCnt} ${label} selected.`}</p>
                            <Button
                                onClick={() => setSelectedOptions([])}
                                size="sm"
                                isDisabled={selectedOptionsCnt === 0}
                            >
                                Clear All
                            </Button>
                        </div>
                    }
                    orientation="vertical"
                    value={selectedOptions}
                    onValueChange={setSelectedOptions}
                >
                    {options.map(
                        (option, i) => <ChipStyleCheckbox key={i}
                            value={option}
                        >
                            {option}
                        </ChipStyleCheckbox>
                    )}
                </CheckboxGroup>
            </PopoverContent>
        </Popover>
    );
}

export default FilterSelector;