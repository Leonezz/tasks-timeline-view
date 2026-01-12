import type { Selection } from '@heroui/react'
import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Switch
} from '@heroui/react'
import { useGeneralOption } from './GlobalOption'
import type { DateIconStyles } from './OptionDef'
import { SettingsIcon } from '../asserts/icons/setting'

export const OptionsPanel = () => {
  const {
    forwardUnfinishedTasks,
    setForwardUnfinishedTasks,
    dateIconStyle,
    setDateIconStyle
  } = useGeneralOption()
  const dateIconStyles = ['monthday', 'weekday', 'weekdayicon']
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar icon={<SettingsIcon />} />
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