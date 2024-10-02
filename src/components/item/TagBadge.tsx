/**
 * @deprecated
 */
import { TagIcon } from '../asserts/icons/tag'
import { TaskItemInfoBadge } from './TaskItemInfoBadge'

export const TagBadge = ({
  tag,
  tagPalette,
  onTagClick
}: {
  tag: string
  tagPalette: Map<string, string>
  onTagClick?: (t: string) => void
}) => {
  const tagText = tag.replace('#', '')
  const color = tagPalette.get(tag) || tagPalette.get(tagText)
  return (
    <TaskItemInfoBadge
      label={tagText}
      icon={<TagIcon width={12} height={12} />}
      onClick={(e) => {
        e.stopPropagation()
        onTagClick && onTagClick(tag)
      }}
      ariaLabel={tag}
      // className="shadow-sm bg-primary-200"
      color={color === undefined ? 'primary' : undefined}
      style={{
        color: color
      }}
    />
  )
}
