import React, { Fragment, ReactElement, useState } from 'react'
import {
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
    Tab,
    Tabs,
    Textarea,
    UseDisclosureProps,
    useDisclosure
} from '@nextui-org/react'
import { todoStore } from '../../datastore/useTodoStore'
import { fileIcon, tagIcon } from '../asserts/icons'
import { useTaskStatusOption } from '../options/GlobalOption'
import { TaskStatusDef } from '../options/OptionDef'
import TaskRecurrenceModal from './TaskRecurrence'
import { RRule } from 'rrule'

const TaskItemEditModal = ({
    id,
    disclosure
}: {
    id: string
    disclosure: UseDisclosureProps
}) => {
    const taskItem = todoStore.getItemById(id)

    const [isStartDateEnabled, setStartDateEnabled] = useState(true)
    const [isDueDateEnabled, setDueDateEnabled] = useState(true)
    const [isDoneDateEnabled, setDoneDateEnabled] = useState(true)

    const { statusConfigs, getIconFromStatus } = useTaskStatusOption()

    const renderStatusRow = (statusOption: TaskStatusDef) => {
        return (
            <div className={`flex flex-row gap-2 text-${statusOption.color}`}>
                <div className='self-center'>
                    {getIconFromStatus(statusOption.label)}
                </div>
                <span>{statusOption.label}</span>
            </div>
        )
    }

    const editTaskRecurrenceDisclosure = useDisclosure()

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
                                            value={taskItem?.content.visual}
                                            label='Content'
                                            labelPlacement='outside'
                                        />
                                        <Select
                                            label='Category'
                                            startContent={fileIcon}
                                            labelPlacement='outside'
                                        >
                                            <SelectItem key={'test'}>
                                                test
                                            </SelectItem>
                                        </Select>
                                        <Select
                                            multiple
                                            label='Tags'
                                            startContent={tagIcon}
                                            labelPlacement='outside'
                                        >
                                            <SelectSection
                                                key={1}
                                                classNames={{
                                                    heading:
                                                        'flex w-full sticky z-20 top-1 '
                                                }}
                                                title={
                                                    (
                                                        <Input
                                                            size='sm'
                                                            startContent={
                                                                tagIcon
                                                            }
                                                        />
                                                    ) as ReactElement & string
                                                }
                                            >
                                                <SelectItem key={2}>
                                                    1
                                                </SelectItem>
                                                <SelectItem key={3}>
                                                    2
                                                </SelectItem>
                                                <SelectItem key={4}>
                                                    1
                                                </SelectItem>
                                                <SelectItem key={5}>
                                                    2
                                                </SelectItem>
                                                <SelectItem key={6}>
                                                    1
                                                </SelectItem>
                                                <SelectItem key={7}>
                                                    2
                                                </SelectItem>
                                            </SelectSection>
                                        </Select>
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
                                                label='Due At'
                                                type='datetime-local'
                                                labelPlacement='inside'
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
                                <Button color='primary'>Save</Button>
                            </ModalFooter>
                        </Fragment>
                    )}
                </ModalContent>
            </Modal>
            <TaskRecurrenceModal
                disclosure={editTaskRecurrenceDisclosure}
                options={new RRule().origOptions}
            />
        </Fragment>
    )
}

export default TaskItemEditModal
