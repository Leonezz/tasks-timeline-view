import { useEffect, useSyncExternalStore } from 'react'
import { TaskItem } from '../tasks/TaskItem'
import { v4 as uuidv4 } from 'uuid'
import { BUS } from './todoStoreEventBus'
import { ChangeTaskPropertyParam, EVENTS } from './todoStoreEvents'

let _todos = [] as TaskItem[]
let listeners = [] as (() => any)[]

export const todoStore = {
    initTodos(todos: TaskItem[]) {
        _todos = todos.map((todo) => {
            todo.uuid = uuidv4()
            return todo
        })
        emitChange()
    },
    addTodo(todo: TaskItem) {
        todo.uuid = uuidv4()
        _todos = [..._todos, todo]
        emitChange()
    },
    changeTodo(uuid: string, newItem: Partial<TaskItem>) {
        _todos = _todos.map((v) => {
            if (v.uuid !== uuid) return v
            for (const k in newItem) {
                if (typeof newItem[k as keyof TaskItem] === 'object') {
                    //@ts-ignore
                    if (!v[k as keyof TaskItem]) v[k as keyof TaskItem] = {}
                    //@ts-ignore
                    v[k as keyof TaskItem] = Object.assign(
                        v[k as keyof TaskItem] as Object,
                        newItem[k as keyof TaskItem] as Object
                    )
                } else {
                    //@ts-ignore
                    v[k as keyof TaskItem] = newItem[k as keyof TaskItem]
                }
            }
            return v
        })
        emitChange()
    },
    deleteTodo(id: string) {
        _todos = _todos.filter((v) => v.uuid !== id)
        emitChange()
    },
    getItemById(id: string) {
        const items = _todos.filter((v) => v.uuid === id)
        if (items.length !== 1) return null
        return items[0]
    },

    subscribe(listener: () => any) {
        listeners = [...listeners, listener]
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    },
    getSnapshot() {
        return _todos
    }
}

const emitChange = () => {
    for (let listener of listeners) {
        listener()
    }
}

export const useTodoStore = () => {
    const todos = useSyncExternalStore(
        todoStore.subscribe,
        todoStore.getSnapshot
    )

    useEffect(() => {
        BUS.on(EVENTS.ChangeTaskProperty, changeTodoItemProperty)
        BUS.on(EVENTS.AddTaskItem, addTodoItem)

        return () => {
            BUS.off(EVENTS.ChangeTaskProperty, changeTodoItemProperty)
            BUS.off(EVENTS.AddTaskItem, addTodoItem)
        }
    }, [])

    return todos
}

const changeTodoItemProperty = (param: ChangeTaskPropertyParam) => {
    const { uuid, change } = param
    todoStore.changeTodo(uuid, change)
}

const addTodoItem = (param: TaskItem) => {
    todoStore.addTodo(param)
}
