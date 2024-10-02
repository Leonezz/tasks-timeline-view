// import { useEffect, useSyncExternalStore } from 'react'
import { v4 as uuidv4 } from 'uuid'
// import { BUS } from './todoStoreEvents'
import { create } from 'zustand'
import { TaskItem, TaskPriority, TaskStatus } from '../@types/task-item'
import { Moment } from 'moment'
import { getTaskDateList } from '../util/task-item/info'

type StoreTaskItem = Omit<TaskItem, 'uuid'>

type todoStore = {
  data: Map<string, TaskItem>
}

type todoStoreActions = {
  init: ({ items }: { items: StoreTaskItem[] }) => void
  add: ({ item }: { item: StoreTaskItem }) => void
  delete: ({ id }: { id: string }) => void
  edit: ({ id, value }: { id: string; value: Partial<StoreTaskItem> }) => void
  query: ({ id }: { id: string }) => TaskItem | undefined
  getAll: () => TaskItem[]
  getTagsList: () => string[]
  getPrioritisList: () => TaskPriority[]
  getStatusList: () => TaskStatus[]
  getDatesList: () => Moment[]
}

export const useTodoItemStore = create<todoStore & todoStoreActions>(
  (set, get) => ({
    data: new Map(),
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
    },
    delete: ({ id }) => {
      set((prev) => {
        prev.data.delete(id)
        return {
          ...prev,
          data: prev.data
        }
      })
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
    },
    query: ({ id }) => {
      return get().data.get(id)
    },
    getAll: () => {
      return [...get().data.values()]
    },
    getTagsList: () => {
      return get()
        .getAll()
        .flatMap((v) => [...v.tags])
        .unique()
    },
    getPrioritisList: () => {
      return get()
        .getAll()
        .map((v) => v.priority)
        .unique()
    },
    getStatusList: () => {
      return get()
        .getAll()
        .map((v) => v.status)
        .unique()
    },
    getDatesList: () => {
      return get()
        .getAll()
        .flatMap((t) => {
          return getTaskDateList(t)
        })
        .unique()
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
