import React from 'react'
import {
    Avatar,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectItem,
    Selection,
    Switch
} from '@nextui-org/react'
import { settingsIcon } from '../asserts/icons'
import useGlobalOption from './GlobalOption'
import { DateIconStyles } from './OptionDef'

function OptionsPanel() {
    const {
        forwardUnfinishedTasks,
        setForwardUnfinishedTasks,
        dateIconStyle,
        setDateIconStyle
    } = useGlobalOption()
    console.log(dateIconStyle)
    const dateIconStyles = ['monthday', 'weekday', 'weekdayicon']
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar icon={settingsIcon}></Avatar>
            </PopoverTrigger>
            <PopoverContent>
                <Switch
                    defaultSelected={forwardUnfinishedTasks}
                    onValueChange={() =>
                        setForwardUnfinishedTasks(!forwardUnfinishedTasks)
                    }
                >
                    Forward
                </Switch>
                <Select
                    onSelectionChange={(keys: Selection) =>
                        setDateIconStyle(Array.from(keys)[0] as DateIconStyles)
                    }
                    defaultSelectedKeys={new Set(dateIconStyle)}
                >
                    {dateIconStyles.map((s) => (
                        <SelectItem key={s} value={s}>
                            {s}
                        </SelectItem>
                    ))}
                </Select>
            </PopoverContent>
        </Popover>
    )
}

export default OptionsPanel
