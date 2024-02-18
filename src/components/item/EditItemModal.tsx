import React, {
    Fragment,
    Key,
    ReactElement,
    useCallback,
    useState
} from 'react'
import {
    Chip,
    Button,
    Checkbox,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    SelectSection,
    Selection,
    Tab,
    Tabs,
    Textarea,
    UseDisclosureProps,
    useDisclosure,
    Autocomplete,
    AutocompleteItem
} from '@nextui-org/react'
import { todoStore } from '../../datastore/useTodoStore'
import { enterIcon, fileIcon, tagIcon } from '../asserts/icons'
import { useTaskStatusConfig } from '../options/GlobalOption'
import { TaskStatusDef } from '../options/OptionDef'
import TaskRecurrenceModal from './TaskRecurrence'
import { innerDateTimeFormat } from '../../util/defs'
import moment from 'moment'
import {
    ChangeTaskPropertyParam,
    EVENTS
} from '../../datastore/todoStoreEvents'
import { BUS } from '../../datastore/todoStoreEventBus'
import { TaskItem } from '../../tasks/TaskItem'

const TagsSelect = ({
    selectedTags,
    onSelectTags
}: {
    selectedTags: Set<string>
    onSelectTags: (value: React.SetStateAction<Set<string>>) => void
}) => {
    const renderTagsRow = (tag: string) => {
        return (
            <Chip size='sm' variant='flat' key={tag}>
                {tag}
            </Chip>
        )
    }
    const NewTagInputConfirmButton = () => {
        return (
            <Button
                isIconOnly={true}
                variant='light'
                onClick={() => {
                    // this is not working... why?
                    onSelectTags((prev) => new Set([newTagContent, ...prev]))
                    setTagOptions((prev) => new Set([newTagContent, ...prev]))
                    setNewTagContent('')
                }}
            >
                {enterIcon}
            </Button>
        )
    }
    const [newTagContent, setNewTagContent] = useState('')
    const [tagOptions, setTagOptions] = useState(
        new Set([...selectedTags, 'test1', 'test2'])
    )
    return (
        <Select
            items={tagOptions}
            selectionMode='multiple'
            selectedKeys={selectedTags}
            onSelectionChange={(keys: Selection) => {
                if (keys === 'all') {
                    return
                }
                onSelectTags(
                    new Set(
                        [...keys.values()].map((k) => k.valueOf().toString())
                    )
                )
            }}
            label='Tags'
            startContent={tagIcon}
            labelPlacement='outside'
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
                            onValueChange={setNewTagContent}
                            startContent={'New Tag'}
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

const CategoryListSelect = ({
    initialCategory
}: {
    initialCategory: string
}) => {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const options = new Set(['test1', 'test2'])
    return (
        <Autocomplete
            items={options}
            label='Category'
            multiple={true}
            startContent={fileIcon}
            labelPlacement='outside'
            inputMode='text'
            menuTrigger='input'
            inputValue={selectedCategory}
            onInputChange={(v) => setSelectedCategory(v)}
            allowsCustomValue
            selectedKey={selectedCategory}
            onSelectionChange={(k: Key) => {
                if (typeof k === 'string') {
                    setSelectedCategory(k)
                }
            }}
        >
            {[...options].map((option) => (
                <AutocompleteItem key={option.toString()}>
                    {option}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

const PrioritySelect = ({
    priority,
    setPriority
}: {
    priority: string
    setPriority: (p: string) => any
}) => {
    const priorityLabels = ['High', 'Medium', 'Low', 'No']
    return (
        <Select
            items={priorityLabels}
            selectedKeys={[priority]}
            onSelectionChange={(keys) => {
                if (keys === 'all') return
                const selection = [...keys.keys()][0].valueOf().toString()
                setPriority(selection)
            }}
            selectionMode='single'
            label='Priority'
            labelPlacement='outside'
        >
            {priorityLabels.map((l) => (
                <SelectItem key={l}>{l}</SelectItem>
            ))}
        </Select>
    )
}

const TaskItemEditModal = ({
    id,
    disclosure
}: {
    id: string
    disclosure: UseDisclosureProps
}) => {
    const taskItem = todoStore.getItemById(id) || ({} as TaskItem)

    const [taskItemContentVisual, setTaskItemContentVisual] = useState(
        taskItem.content.visual
    )

    const [isStartDateEnabled, setStartDateEnabled] = useState(true)
    const [startDate, setStartDate] = useState(
        taskItem.dateTime.start?.format(innerDateTimeFormat) ||
            moment().format(innerDateTimeFormat)
    )
    const [isDueDateEnabled, setDueDateEnabled] = useState(true)
    const [dueDate, setDueDate] = useState(
        taskItem.dateTime.due?.format(innerDateTimeFormat) ||
            moment().format(innerDateTimeFormat)
    )
    const [isDoneDateEnabled, setDoneDateEnabled] = useState(false)
    const [doneDate, setDoneDate] = useState(
        taskItem.dateTime.completion?.format(innerDateTimeFormat) ||
            moment().format(innerDateTimeFormat)
    )

    const [selectedTags, setSelectedTags] = useState(
        taskItem.tags || new Set<string>()
    )

    const [priority, setPriority] = useState(taskItem.priority)

    const { statusConfigs, getIconFromStatus } = useTaskStatusConfig()
    const [taskStatus, setTaskStatus] = useState(taskItem.status)

    const renderStatusRow = (statusOption: TaskStatusDef) => {
        return (
            <div
                key={statusOption.label}
                className={`flex flex-row gap-2 text-${statusOption.color}`}
            >
                <div className='self-center'>
                    {getIconFromStatus(statusOption.label)}
                </div>
                <span>{statusOption.label}</span>
            </div>
        )
    }

    const editTaskRecurrenceDisclosure = useDisclosure()

    const summitEdit = useCallback(() => {
        BUS.emit(EVENTS.ChangeTaskProperty, {
            uuid: id,
            change: {
                content: {
                    ...taskItem.content,
                    visual: taskItemContentVisual
                },
                dateTime: {
                    ...taskItem.dateTime,
                    start: isStartDateEnabled
                        ? moment(startDate, innerDateTimeFormat)
                        : null,
                    due: isDueDateEnabled
                        ? moment(dueDate, innerDateTimeFormat)
                        : null,
                    completion: isDoneDateEnabled
                        ? moment(doneDate, innerDateTimeFormat)
                        : null
                },
                tags: selectedTags,
                priority: priority,
                status: taskStatus
            }
        } as ChangeTaskPropertyParam)
    }, [
        taskItem,
        taskItemContentVisual,
        isStartDateEnabled,
        startDate,
        isDueDateEnabled,
        dueDate,
        isDoneDateEnabled,
        doneDate,
        selectedTags,
        priority,
        taskStatus
    ])

    return (
        <Fragment>
            <Modal
                backdrop='blur'
                placement='auto'
                isOpen={disclosure.isOpen}
                onOpenChange={disclosure.onChange}
                onClose={disclosure.onClose}
                isDismissable={false}
            >
                <ModalContent>
                    {(onClose) => (
                        <Fragment>
                            <ModalHeader className=''>Edit Item</ModalHeader>

                            <Divider />

                            <ModalBody>
                                <Tabs
                                    classNames={{
                                        tabList: 'w-full'
                                    }}
                                >
                                    <Tab
                                        title='Basic'
                                        className='flex flex-col gap-2'
                                    >
                                        <Textarea
                                            value={taskItemContentVisual}
                                            onValueChange={
                                                setTaskItemContentVisual
                                            }
                                            label='Content'
                                            labelPlacement='outside'
                                        />
                                        <CategoryListSelect initialCategory='' />
                                        <PrioritySelect
                                            priority={priority}
                                            setPriority={setPriority}
                                        />
                                        <TagsSelect
                                            selectedTags={selectedTags}
                                            onSelectTags={setSelectedTags}
                                        />
                                    </Tab>
                                    <Tab
                                        title='Dates and Status'
                                        className='flex flex-col gap-2'
                                    >
                                        <div className='flex flex-row gap-2'>
                                            <Input
                                                isReadOnly={!isStartDateEnabled}
                                                label='Start At'
                                                type='datetime-local'
                                                labelPlacement='inside'
                                                value={startDate}
                                                onValueChange={setStartDate}
                                            />
                                            <Checkbox
                                                isSelected={isStartDateEnabled}
                                                onValueChange={
                                                    setStartDateEnabled
                                                }
                                            />
                                        </div>
                                        <div className='flex flex-row gap-2'>
                                            <Input
                                                isReadOnly={!isDueDateEnabled}
                                                label='Due At'
                                                type='datetime-local'
                                                labelPlacement='inside'
                                                value={dueDate}
                                                onValueChange={setDueDate}
                                            />
                                            <Checkbox
                                                isSelected={isDueDateEnabled}
                                                onValueChange={
                                                    setDueDateEnabled
                                                }
                                            />
                                        </div>
                                        <Select
                                            items={statusConfigs}
                                            selectionMode='single'
                                            selectedKeys={new Set([taskStatus])}
                                            onSelectionChange={(s) => {
                                                if (s === 'all') {
                                                    return
                                                }
                                                const keys = Array.from(
                                                    s.keys()
                                                )
                                                setTaskStatus(
                                                    keys[0].valueOf().toString()
                                                )
                                            }}
                                            label='Status'
                                            labelPlacement='outside'
                                            renderValue={(items) => {
                                                return items.map(
                                                    (item) =>
                                                        item.data &&
                                                        renderStatusRow(
                                                            item.data as TaskStatusDef
                                                        )
                                                )
                                            }}
                                        >
                                            {(option: TaskStatusDef) => (
                                                <SelectItem
                                                    startContent={getIconFromStatus(
                                                        option.label
                                                    )}
                                                    key={option.label}
                                                    color={option.color}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            )}
                                        </Select>

                                        <div className='flex flex-row gap-2'>
                                            <Input
                                                isReadOnly={!isDoneDateEnabled}
                                                label='Done At'
                                                type='datetime-local'
                                                labelPlacement='inside'
                                                value={doneDate}
                                                onValueChange={setDoneDate}
                                            />
                                            <Checkbox
                                                isSelected={isDoneDateEnabled}
                                                onValueChange={
                                                    setDoneDateEnabled
                                                }
                                            />
                                        </div>
                                    </Tab>
                                    <Tab
                                        title='Repeat'
                                        className='flex flex-col gap-2'
                                    >
                                        <Select
                                            label='Repeat Mode'
                                            labelPlacement='outside'
                                            selectionMode='single'
                                        >
                                            <SelectItem key='none'>
                                                No Repeat
                                            </SelectItem>
                                            <SelectItem key='day'>
                                                Every Day
                                            </SelectItem>
                                            <SelectItem key='week'>
                                                Every Week
                                            </SelectItem>
                                            <SelectItem key='weekday'>
                                                Every Weekday
                                            </SelectItem>
                                            <SelectItem key='weekend'>
                                                Every Weekend
                                            </SelectItem>
                                            <SelectItem key='month'>
                                                Every Month
                                            </SelectItem>
                                            <SelectItem
                                                onEmptied={undefined}
                                                key='customize'
                                                onClick={
                                                    editTaskRecurrenceDisclosure.onOpen
                                                }
                                            >
                                                Customize
                                            </SelectItem>
                                        </Select>
                                        <Input
                                            type='date'
                                            label='Until'
                                            labelPlacement='inside'
                                        />
                                    </Tab>
                                </Tabs>
                            </ModalBody>

                            <Divider />

                            <ModalFooter>
                                <Button color='danger' onClick={onClose}>
                                    Discard
                                </Button>
                                <Button
                                    color='primary'
                                    onClick={() => {
                                        summitEdit()
                                        onClose()
                                    }}
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </Fragment>
                    )}
                </ModalContent>
            </Modal>
            <TaskRecurrenceModal
                disclosure={editTaskRecurrenceDisclosure}
                id={id}
            />
        </Fragment>
    )
}

export default TaskItemEditModal
