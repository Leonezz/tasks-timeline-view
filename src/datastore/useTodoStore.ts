import { useEffect, useSyncExternalStore } from 'react'
import { TaskItem } from '../tasks/TaskItem'
import { v4 as uuidv4 } from 'uuid'
import { BUS } from './todoStoreEventBus'
import { ChangeTaskStautsParam, EVENTS } from './todoStoreEvents'

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
        BUS.on(EVENTS.ChangeTaskStauts, changeTodoItemStauts)
        BUS.on(EVENTS.AddTaskItem, addTodoItem)

        return () => {
            BUS.off(EVENTS.ChangeTaskStauts, changeTodoItemStauts)
            BUS.off(EVENTS.AddTaskItem, addTodoItem)
        }
    }, [])

    return todos
}

const changeTodoItemStauts = (param: ChangeTaskStautsParam) => {
    const { uuid, newStatus } = param
    const item = todoStore.getItemById(uuid)
    if (item === null) return
    item.status = newStatus
    todoStore.deleteTodo(uuid)
    todoStore.addTodo(item)
}

const addTodoItem = (param: TaskItem) => {
    todoStore.addTodo(param)
}
