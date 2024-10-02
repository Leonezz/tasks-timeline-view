/**
 * @deprecated
 */
import { TaskItemInfoBadge } from './TaskItemInfoBadge'
import { getFileTitle } from '../../util/string'
import { FileIcon } from '../asserts/icons/file'

export const FileBadge = ({
  filePath,
  subPath
}: {
  filePath: string
  subPath?: string
}) => {
  return (
    <TaskItemInfoBadge
      icon={<FileIcon />}
      label={
        getFileTitle(filePath) +
        (subPath && subPath !== '' ? ' > ' + subPath : '')
      }
      ariaLabel={filePath}
    ></TaskItemInfoBadge>
  )
}
