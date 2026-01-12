# tasks-timeline-view

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/tasks-timeline-view.svg)](https://www.npmjs.com/package/tasks-timeline-view) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save tasks-timeline-view
```

## Usage

See `example/`.

Data preparation:

```ts
import moment from 'moment'
import {
  BasicTaskItemPriority,
  BasicTaskItemStatus,
  TaskItem
} from 'tasks-timeline-view'

export const TodoList: TaskItem[] = [
  {
    status: BasicTaskItemStatus.Done,
    priority: BasicTaskItemPriority.High,
    text: '- [x] Unchecked ✅ 2023-11-14',
    visual: 'Unchecked',
    tags: new Set(['tag1']),
    dateTime: {
      completion: moment('2023-11-14', 'YYYY-MM-DD'),
      misc: new Map()
    },
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {}
  },
  {
    status: BasicTaskItemStatus.Done,
    priority: BasicTaskItemPriority.Medium,
    text: '- [x] Checked',
    visual: 'Checked',
    tags: new Set(['tag2']),
    dateTime: {
      created: moment('2023-12-14', 'YYYY-MM-DD'),
      misc: new Map()
    },
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {}
  },
  {
    status: BasicTaskItemStatus.Overdue,
    priority: BasicTaskItemPriority.Low,
    text: '- [>] Rescheduled',
    visual: 'Rescheduled',
    dateTime: {
      due: moment(),
      misc: new Map()
    },
    tags: new Set(['tag3']),
    position: {
      visual: 'test theme-defined markers.md'
    },
    meta: {}
  }
]
```

render the view with data:

```tsx
import React from 'react'

import { TimelineView } from 'tasks-timeline-view'
import 'tasks-timeline-view/dist/index.css'
import { TodoList } from './taskList'

const App = () => {
  return <TimelineView taskList={TodoList} />
}

export default App
```

And the result:

![](imgs/1.png)

Status change popup:

![](imgs/2.png)

Task item edit:

![](imgs/3.png)

Recurrence mode edit:

![](imgs/4.png)

## License

MIT © [Leonezz](https://github.com/Leonezz)
