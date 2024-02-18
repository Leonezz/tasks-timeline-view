import React from 'react'
import { Button, Textarea } from '@nextui-org/react'
import { useState } from 'react'
import moment from 'moment'
import DatePickerListPopover from './DatePickerListPopover'
import { TaskItemDateTime } from '../../tasks/TaskItem'
import { useTaskPriorityConfig, useVaultConfig } from '../options/GlobalOption'
import TrivialSingleSelect, {
    DropdownStyleSingleSelectItem
} from './TrivialSingleSelect'
import { fileIcon } from '../asserts/icons'
import { TaskPriorityDef } from '../options/OptionDef'

const CategorySelect = ({
    initialCategory,
    setCategory
}: {
    initialCategory: string
    setCategory: (c: string) => any
}) => {
    const { getAllCategories } = useVaultConfig()
    const categoryOptions = getAllCategories()
    return (
        <TrivialSingleSelect
            options={categoryOptions}
            selectedKeys={new Set([initialCategory])}
            setSelectedKey={setCategory}
            icon={fileIcon}
            ariaLabel='Category'
        />
    )
}

const PrioritySelect = ({
    initialPriority,
    setPriority
}: {
    initialPriority: string
    setPriority: (p: string) => any
}) => {
    const { priorityConfigs, getPriorityIcon } = useTaskPriorityConfig()
    const prioritySelectOptions = priorityConfigs
        .sort((l: TaskPriorityDef, r: TaskPriorityDef) => r.sortBy - l.sortBy)
        .map(
            (v: TaskPriorityDef) =>
                ({
                    label: v.label,
                    icon: v.icon,
                    color: v.color
                }) as DropdownStyleSingleSelectItem
        )
    return (
        <TrivialSingleSelect
            options={prioritySelectOptions}
            selectedKeys={new Set([initialPriority])}
            setSelectedKey={setPriority}
            icon={getPriorityIcon(initialPriority)}
            ariaLabel='Priority'
        />
    )
}

const NewTaskQuickInput = ({
    onCancel,
    onAdd,
    initialDate
}: {
    onCancel: () => any
    onAdd: () => any
    initialDate?: moment.Moment
}) => {
    const [text, setText] = useState('')
    const handleSubmitNewTask = () => {
        if (text.trim().length === 0) return
    }

    initialDate = initialDate || moment()

    const [dates, setDates] = useState({
        start: initialDate,
        due: initialDate
    } as TaskItemDateTime)

    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState('')

    return (
        <div>
            <Textarea
                value={text}
                onValueChange={setText}
                autoFocus
                placeholder='Add a new task here'
                className='w-full text-medium'
            />
            <div className='mt-1.5 flex justify-between'>
                <div className='flex items-center gap-0'>
                    <CategorySelect
                        initialCategory={category}
                        setCategory={setCategory}
                    />
                    <PrioritySelect
                        initialPriority={priority}
                        setPriority={setPriority}
                    />
                    <DatePickerListPopover
                        initialDates={dates}
                        summitDates={setDates}
                    />
                </div>
                <div className='flex items-center gap-1.5'>
                    <Button variant='light' color='danger' onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        color='primary'
                        onClick={() => {
                            handleSubmitNewTask()
                            onAdd()
                        }}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NewTaskQuickInput
