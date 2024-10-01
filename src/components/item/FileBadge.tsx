/**
 * @deprecated
 */
import TaskItemInfoBadge from './TaskItemInfoBadge'
import { iconMap } from '../asserts/icons'
import { getFileTitle } from '../../util/string'

function FileIcon() {
  const icon = iconMap.fileIcon
  icon.props['width'] = 14
  icon.props['height'] = 14
  return icon
}

function FileBadge({
  filePath,
  subPath
}: {
  filePath: string
  subPath?: string
}) {
  return (
    <TaskItemInfoBadge
      icon={<FileIcon></FileIcon>}
      label={
        getFileTitle(filePath) +
        (subPath && subPath !== '' ? ' > ' + subPath : '')
      }
      ariaLabel={filePath}
    ></TaskItemInfoBadge>
  )
}

export default FileBadge
