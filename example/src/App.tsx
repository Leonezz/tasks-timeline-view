import React from 'react'

import { TimelineView, todoStore } from 'tasks-timeline-view'
import 'tasks-timeline-view/dist/index.css'
import { TodoList } from './taskList'

const App = () => {
    todoStore.initTodos(TodoList)
    return <TimelineView />
}

export default App
