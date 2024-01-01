import React from 'react'

import { TimelineView } from 'tasks-timeline-view'
import 'tasks-timeline-view/dist/index.css'
import { TodoList } from './taskList'

const App = () => {
    return <TimelineView taskList={TodoList} />
}

export default App
