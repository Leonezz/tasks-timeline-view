// import { useEffect, useSyncExternalStore } from 'react'
import { v4 as uuidv4 } from 'uuid'
// import { BUS } from './todoStoreEvents'
import { create } from 'zustand'
import { TaskItem, TaskPriority, TaskStatus } from '../@types/task-item'
import { Moment } from 'moment'
import { getTaskDateList } from '../util/task-item/info'
import { uniqueBy } from '../util/arrray/unique'
import { innerDateTimeFormat } from '../util/defs'

type StoreTaskItem = Omit<TaskItem, 'uuid'>

type HandlerType = (item: TaskItem) => void
type todoStore = {
  data: Map<string, TaskItem>
  onItemChange?: HandlerType
  onItemAdd?: HandlerType
  onItemRemove?: HandlerType
}

type todoStoreActions = {
  init: ({ items }: { items: StoreTaskItem[] }) => void
  add: ({ item }: { item: StoreTaskItem }) => void
  delete: ({ id }: { id: string }) => void
  edit: ({ id, value }: { id: string; value: Partial<StoreTaskItem> }) => void
  query: ({ id }: { id: string }) => TaskItem | undefined
  registerHandlers: ({
    onItemAdd,
    onItemChange,
    onItemRemove
  }: {
    onItemChange: HandlerType
    onItemAdd: HandlerType
    onItemRemove: HandlerType
  }) => void
  getAll: () => TaskItem[]
  getTagsSet: () => Set<string>
  getPrioritisSet: () => Set<TaskPriority>
  getStatusSet: () => Set<TaskStatus>
  getDatesSet: () => Set<Moment>
}

export const useTodoItemStore = create<todoStore & todoStoreActions>(
  (set, get) => ({
    data: new Map(),
    taskListOptions: new Set(),
    init: ({ items }) => {
      set((prev) => {
        prev.data = new Map()
        items.forEach((v) => {
          const id = uuidv4()
          prev.data.set(id, { ...v, uuid: id })
        })
        return {
          ...prev,
          data: prev.data
        }
      })
    },
    add: ({ item }) => {
      const id = uuidv4()
      set((prev) => ({
        ...prev,
        data: prev.data.set(id, { ...item, uuid: id })
      }))
      const onAddHandler = get().onItemAdd
      if (onAddHandler !== undefined) {
        onAddHandler({ ...item, uuid: id })
      }
    },
    delete: ({ id }) => {
      const item = get().query({ id: id })
      if (item === undefined) {
        return
      }
      set((prev) => {
        prev.data.delete(id)
        return {
          ...prev,
          data: prev.data
        }
      })
      const onDeleteHandler = get().onItemRemove
      if (onDeleteHandler !== undefined) {
        onDeleteHandler(item)
      }
    },
    edit: ({ id, value }) => {
      const currentValue = get().data.get(id)
      if (currentValue === undefined) {
        return
      }
      set((prev) => ({
        ...prev,
        data: prev.data.set(id, {
          ...currentValue,
          ...value
        })
      }))
      const onEditHandler = get().onItemChange
      if (onEditHandler !== undefined) {
        onEditHandler({ ...currentValue, ...value })
      }
    },
    query: ({ id }) => {
      return get().data.get(id)
    },
    registerHandlers({ onItemAdd, onItemChange, onItemRemove }) {
      set({
        onItemAdd: onItemAdd,
        onItemChange: onItemChange,
        onItemRemove: onItemRemove
      })
    },
    getAll: () => {
      return [...get().data.values()]
    },
    getTagsSet: () => {
      return new Set(
        get()
          .getAll()
          .flatMap((v) => [...v.tags])
      )
    },
    getPrioritisSet: () => {
      return new Set(
        get()
          .getAll()
          .map((v) => v.priority)
      )
    },
    getStatusSet: () => {
      return new Set(
        get()
          .getAll()
          .map((v) => v.status)
      )
    },
    getDatesSet: () => {
      return new Set(
        uniqueBy(
          get()
            .getAll()
            .flatMap((t) => {
              return getTaskDateList(t)
            }),
          (v) => v.format(innerDateTimeFormat)
        )
      )
    }
  })
)

// let _todos = [] as TaskItem[]
// let listeners = [] as (() => any)[]

// export const todoStore = {
//   initTodos(todos: TaskItem[]) {
//     _todos = todos.map((todo) => {
//       todo.uuid = uuidv4()
//       return todo
//     })
//     emitChange()
//   },
//   addTodo(todo: TaskItem) {
//     todo.uuid = uuidv4()
//     _todos = [..._todos, todo]
//     emitChange()
//   },
//   changeTodo(uuid: string, newItem: Partial<TaskItem>) {
//     _todos = _todos.map((v) => {
//       if (v.uuid !== uuid) return v
//       for (const k in newItem) {
//         if (typeof newItem[k as keyof TaskItem] === 'object') {
//           //@ts-ignore
//           if (!v[k as keyof TaskItem]) v[k as keyof TaskItem] = {}
//           //@ts-ignore
//           v[k as keyof TaskItem] = Object.assign(
//             v[k as keyof TaskItem] as Object,
//             newItem[k as keyof TaskItem] as Object
//           )
//         } else {
//           //@ts-ignore
//           v[k as keyof TaskItem] = newItem[k as keyof TaskItem]
//         }
//       }
//       return v
//     })
//     emitChange()
//   },
//   deleteTodo(id: string) {
//     _todos = _todos.filter((v) => v.uuid !== id)
//     emitChange()
//   },
//   getItemById(id: string) {
//     const items = _todos.filter((v) => v.uuid === id)
//     if (items.length !== 1) return null
//     return items[0]
//   },

//   subscribe(listener: () => any) {
//     listeners = [...listeners, listener]
//     return () => {
//       listeners = listeners.filter((l) => l !== listener)
//     }
//   },
//   getSnapshot() {
//     return _todos
//   }
// }

// const emitChange = () => {
//   for (let listener of listeners) {
//     listener()
//   }
// }

// export const useTodoStore = () => {
//   const todos = useSyncExternalStore(todoStore.subscribe, todoStore.getSnapshot)

//   const changeItem = (uuid: string, change: Partial<TaskItem>) =>
//     todoStore.changeTodo(uuid, change)
//   const addItem = (item: TaskItem) => todoStore.addTodo(item)

//   useEffect(() => {
//     BUS.on('ChangeTaskProperty', changeItem)
//     BUS.on('AddTaskItem', addItem)

//     return () => {
//       BUS.off('ChangeTaskProperty', changeItem)
//       BUS.off('AddTaskItem', addItem)
//     }
//   }, [])

//   return todos
// }
