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
import { Fragment } from 'react/jsx-runtime'
import { FileIcon } from '../asserts/icons/file'
import { TaskPriority } from '../../@types/task-item'
import { useTaskPriorityConfig } from '../options/GlobalOption'
import { TaskPriorityDef } from '../options/OptionDef'
import { ThemeColor } from '../../@types/base'
import { TagBadge } from './TagBadge'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import { EnterIcon } from '../asserts/icons/enter'
import { TagIcon } from '../asserts/icons/tag'

const CategoryListSelect = ({
  initialCategory
}: {
  initialCategory: string
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const options = new Set(['test1', 'test2'])
  return (
    <Autocomplete
      items={options.entries()}
      label='Category'
      multiple={true}
      startContent={<FileIcon />}
      labelPlacement='outside'
      inputMode='text'
      menuTrigger='input'
      inputValue={selectedCategory}
      onInputChange={(v) => setSelectedCategory(v)}
      allowsCustomValue
      selectedKey={selectedCategory}
      onSelectionChange={(k) => {
        if (typeof k === 'string') {
          setSelectedCategory(k)
        }
      }}
    >
      {[...options].map((option) => (
        <AutocompleteItem key={option.toString()}>{option}</AutocompleteItem>
      ))}
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
      label='Priority'
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
  const { getTagsList } = useTodoItemStore()
  const [tagOptions, setTagOptions] = useState(() => getTagsList())
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
            setTagOptions((prev) => [...prev, newTagContent].unique())
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
      items={tagOptions.entries()}
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
      label='Tags'
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
        {Array.from(tagOptions).map((t) => (
          <SelectItem key={t}>{t}</SelectItem>
        ))}
      </SelectSection>
    </Select>
  )
}

type TaskItemBasicInfoEditProps = {
  value: { contentVisual: string; priority: TaskPriority; tags: Set<string> }
  onValueChange: (value: Partial<TaskItemBasicInfoEditProps['value']>) => void
}
export const TaskItemBasicInfoEdit = ({
  value,
  onValueChange
}: TaskItemBasicInfoEditProps) => {
  const { contentVisual, priority, tags } = value
  return (
    <Fragment>
      <Textarea
        value={contentVisual}
        onValueChange={(v) => onValueChange({ contentVisual: v })}
        label='Content'
        labelPlacement='outside'
      />
      <CategoryListSelect initialCategory='' />
      <PrioritySelect
        priority={priority}
        setPriority={(p) => onValueChange({ priority: p })}
      />
      <TagsSelect
        selectedTags={tags}
        onSelectTags={(tags) => onValueChange({ tags: tags })}
      />
    </Fragment>
  )
}
