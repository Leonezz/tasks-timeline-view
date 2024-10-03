import moment from 'moment'

import { innerDateTimeFormat } from '../util/defs'
import { TaskItem } from '../@types/task-item'

export const TaskItemParser = {
  generateTaskItemRawText: (item: TaskItem): string => {
    const metaDateArr = []
    if (item.status.length > 0) {
      metaDateArr.push(`[[status::${item.status}]]`)
    }
    if (item.priority.length > 0) {
      metaDateArr.push(`[[priority::${item.priority}]]`)
    }
    if (item.recurrence) {
      metaDateArr.push(`[[recurrence::${item.recurrence}]]`)
    }
    for (const [k, v] of Object.entries(item.dateTime)) {
      const date: moment.Moment = v
      if (!date.isValid()) continue
      metaDateArr.push(`[[${k}::${date.format(innerDateTimeFormat)}]]`)
    }
    for (const t of item.tags) {
      metaDateArr.push(`#${t}`)
    }
    const metaDataStr = metaDateArr.join(' ') || ''
    return item.content.title + ' ' + metaDataStr
  }
}
