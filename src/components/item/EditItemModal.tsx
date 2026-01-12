import { Fragment, useCallback, useState } from 'react' // Removed useRef
import type { UseDisclosureProps } from '@heroui/react'
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs
} from '@heroui/react'

// import { BUS } from '../../datastore/todoStoreEvents'
import { useTodoItemStore } from '../../datastore/useTodoStore'
import { RRule } from 'rrule'
import type { TaskItem } from '../../@types/task-item'
import { TaskItemBasicInfoEdit } from './TaskItemBasicInfoEdit'
import { TaskItemDatesEdit } from './TaskItemDatesEdit'
import { TaskItemRepeatEdit } from './TaskItemRepeatEdit'

export const selectRenderRowWithIconAndColor = ({
  label,
  icon,
  color
}: {
  label: string
  icon: JSX.Element
  color: string
}) => {
  return (
    <div key={label} className={`flex flex-row gap-2 text-${color}`}>
      <div className='self-center'>{icon}</div>
      <span>{label}</span>
    </div>
  )
}

export const TaskItemEditModal = ({
  item,
  disclosure
}: {
  item: TaskItem
  disclosure: UseDisclosureProps
}) => {
  const { edit } = useTodoItemStore()

  // Initialize localItem with item. When item.uuid changes, Modal will remount and state will be re-initialized.
  const [localItem, setLocalItem] = useState(item)

  const summitEdit = useCallback(() => {
    edit({
      id: localItem.uuid,
      value: {
        ...item,
        ...localItem,
        content: {
          ...item.content,
          ...localItem.content
        },
        dateTime: {
          ...item.dateTime,
          ...localItem.dateTime
        },
        tags: localItem.tags,
        priority: localItem.priority,
        status: localItem.status
      }
    })
  }, [localItem, edit, item])

  return (
    <Fragment>
      <Modal
        key={item.uuid} // Add key here to force remount on item change
        backdrop='blur'
        placement='auto'
        isOpen={disclosure.isOpen}
        onOpenChange={() => disclosure.onChange()}
        onClose={() => disclosure.onClose()}
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
                  <Tab title='Basic' className='flex flex-col gap-2'>
                    <TaskItemBasicInfoEdit
                      value={{
                        contentVisual: localItem.content.title,
                        priority: localItem.priority,
                        tags: localItem.tags,
                        list: localItem.list
                      }}
                      onValueChange={({
                        contentVisual,
                        priority,
                        tags,
                        list
                      }) =>
                        setLocalItem((prev) => ({
                          ...prev,
                          content: {
                            ...prev.content,
                            visual: contentVisual || prev.content.title
                          },
                          priority: priority || prev.priority,
                          tags: tags || prev.tags,
                          list: list || prev.list
                        }))
                      }
                    />
                  </Tab>
                  <Tab title='Dates and Status' className='flex flex-col gap-2'>
                    <TaskItemDatesEdit
                      value={{
                        status: localItem.status,
                        ...localItem.dateTime
                      }}
                      onValueChange={(value) =>
                        setLocalItem((prev) => ({
                          ...prev,
                          status: value.status || prev.status,
                          dateTime: {
                            ...prev.dateTime,
                            start: value.start || prev.dateTime.start,
                            due: value.due || prev.dateTime.due,
                            completion:
                              value.completion || prev.dateTime.completion
                          }
                        }))
                      }
                    />
                  </Tab>
                  <Tab title='Repeat' className='flex flex-col gap-2'>
                    <TaskItemRepeatEdit
                      value={{
                        recurrence: localItem.recurrence || new RRule()
                      }}
                      onValueChange={(v) =>
                        setLocalItem((prev) => ({
                          ...prev,
                          recurrence: v
                        }))
                      }
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
    </Fragment>
  )
}
