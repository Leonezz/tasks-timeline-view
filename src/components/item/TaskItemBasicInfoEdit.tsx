import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
  SelectSection,
  Textarea
} from '@nextui-org/react'
import { ReactElement, useState } from 'react'
import { FileIcon } from '../asserts/icons/file'
import { TaskItem, TaskPriority } from '../../@types/task-item'
import { useTaskPriorityConfig } from '../options/GlobalOption'
import { TaskPriorityDef } from '../options/OptionDef'
import { ThemeColor } from '../../@types/base'
import { TagBadge } from './TagBadge'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import { EnterIcon } from '../asserts/icons/enter'
import { TagIcon } from '../asserts/icons/tag'
import { uniqueBy } from '../../util/arrray/unique'
import { useVaultConfigStore } from '../../datastore/useValutConfigStore'

type TaskListSelectProps = {
  value: TaskItem['list']
  onValueChange: (value: TaskItem['list']) => void
}
const TaskListSelect = ({ value, onValueChange }: TaskListSelectProps) => {
  const taskItemLists = useTodoItemStore((state) =>
    uniqueBy(
      state.getAll().map((v) => v.list),
      (v) => v.rawText + v.visual
    )
  )
  const predefinedLists = useVaultConfigStore((state) => state.taskLists)
  const options = uniqueBy(
    [...taskItemLists, ...predefinedLists],
    (v) => v.rawText + v.visual
  )
  return (
    <Autocomplete
      items={options}
      label={<span className='text-medium font-semibold'>List</span>}
      multiple={true}
      startContent={<FileIcon />}
      labelPlacement='outside'
      inputMode='text'
      menuTrigger='input'
      inputValue={value.rawText}
      onInputChange={(v) => onValueChange({ ...value, rawText: v })}
      allowsCustomValue
      selectedKey={value.rawText}
      onSelectionChange={(k) => {
        if (typeof k === 'string') {
          const selectedItem = options.filter((v) => v.rawText === k)
          if (selectedItem.length === 1) {
            onValueChange(selectedItem[0])
          }
        }
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.rawText}>{item.rawText}</AutocompleteItem>
      )}
    </Autocomplete>
  )
}

const PrioritySelect = ({
  priority,
  setPriority
}: {
  priority: TaskPriority
  setPriority: (p: TaskPriority) => void
}) => {
  const { priorityConfigs, getPriorityIcon, getPriorityColor } =
    useTaskPriorityConfig()
  const renderPriorityRow = (priority: TaskPriorityDef) => {
    const Icon = getPriorityIcon(priority.priority)
    return (
      <div
        key={priority.priority}
        className={`flex flex-row gap-2 text-${getPriorityColor(priority.priority)}`}
      >
        <div className='self-center'>
          <Icon />
        </div>
        <span>{priority.priority}</span>
      </div>
    )
  }
  return (
    <Select
      selectedKeys={[priority]}
      onSelectionChange={(keys) => {
        setPriority(Array.from(keys).join('') as TaskPriority)
      }}
      items={priorityConfigs}
      renderValue={(items) =>
        items.map(
          (item) => item.data && renderPriorityRow(item.data as TaskPriorityDef)
        )
      }
      selectionMode='single'
      label={<span className='text-medium font-semibold'>Priority</span>}
      labelPlacement='outside'
    >
      {(priority: TaskPriorityDef) => {
        const Icon = getPriorityIcon(priority.priority)
        return (
          <SelectItem
            key={priority.priority}
            startContent={<Icon />}
            color={getPriorityColor(priority.priority) as ThemeColor}
          >
            {priority.priority}
          </SelectItem>
        )
      }}
    </Select>
  )
}

const TagsSelect = ({
  selectedTags,
  onSelectTags
}: {
  selectedTags: Set<string>
  onSelectTags: (value: Set<string>) => void
}) => {
  const renderTagsRow = (tag: string) => {
    return <TagBadge tag={tag} tagPalette={new Map()} />
  }

  const [newTagContent, setNewTagContent] = useState('')
  const { getTagsSet } = useTodoItemStore()
  const [tagOptions, setTagOptions] = useState(() => getTagsSet())
  const NewTagInputConfirmButton = () => {
    return (
      <Button
        isIconOnly={true}
        variant='light'
        size='sm'
        className='h-full p-0'
        onClick={() => {
          // this is not working... why?
          if (newTagContent.length > 0) {
            setTagOptions((prev) => new Set([...prev, newTagContent]))
            onSelectTags(new Set([...selectedTags, newTagContent]))
          }
        }}
      >
        <EnterIcon />
      </Button>
    )
  }

  return (
    <Select
      selectionMode='multiple'
      selectedKeys={selectedTags}
      onSelectionChange={(keys) => {
        if (keys === 'all') {
          return
        }
        onSelectTags(
          new Set([...keys.values()].map((k) => k.valueOf().toString()))
        )
      }}
      label={<span className='text-medium font-semibold'>Tags</span>}
      startContent={<TagIcon />}
      labelPlacement='outside'
      classNames={{
        value: 'flex flex-row gap-1'
      }}
      renderValue={(items) =>
        items.map((v) => renderTagsRow(v.textValue || '-'))
      }
    >
      <SelectSection
        key={1}
        items={tagOptions.entries()}
        classNames={{
          heading: 'flex w-full sticky z-20 top-1 '
        }}
        title={
          (
            <Input
              size='sm'
              value={newTagContent}
              onValueChange={(value) => {
                value = value.trim()
                if (value.length === 0) {
                  return
                }
                setNewTagContent(value)
              }}
              startContent={
                <span className='w-fit min-w-fit text-nowrap'>New Tag</span>
              }
              endContent={<NewTagInputConfirmButton />}
            />
          ) as ReactElement & string
        }
      >
        {(item) => (
          <SelectItem key={item[0]} value={item[0]} textValue={item[0]}>
            {renderTagsRow(item[0])}
          </SelectItem>
        )}
      </SelectSection>
    </Select>
  )
}

type TaskItemBasicInfoEditProps = {
  value: {
    contentVisual: string
    priority: TaskPriority
    tags: Set<string>
    list: TaskItem['list']
  }
  onValueChange: (value: Partial<TaskItemBasicInfoEditProps['value']>) => void
}
export const TaskItemBasicInfoEdit = ({
  value,
  onValueChange
}: TaskItemBasicInfoEditProps) => {
  const { contentVisual, priority, tags } = value
  return (
    <div className='flex flex-col gap-3'>
      <Textarea
        value={contentVisual}
        onValueChange={(v) => onValueChange({ contentVisual: v })}
        label={<span className='text-medium font-semibold'>Title</span>}
        labelPlacement='outside'
      />
      <TaskListSelect
        value={value.list}
        onValueChange={(value) => onValueChange({ list: value })}
      />
      <PrioritySelect
        priority={priority}
        setPriority={(p) => onValueChange({ priority: p })}
      />
      <TagsSelect
        selectedTags={tags}
        onSelectTags={(tags) => onValueChange({ tags: tags })}
      />
    </div>
  )
}
