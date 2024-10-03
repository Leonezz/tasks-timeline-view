import { useEffect, useState } from 'react'
import { PencilIcon } from '../asserts/icons/pencil'
import { Button, Input } from '@nextui-org/react'
import { CheckIcon } from '../item/TaskItemInfoBadge'

type EditableTextProps = {
  value: string
  onValueChange: (value: string) => void
}
export const EditableText = ({ value, onValueChange }: EditableTextProps) => {
  const [editMode, setEditMode] = useState(false)
  const [onHover, setOnHover] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const showEdit = onHover || editMode
  useEffect(() => {
    if (!editMode) {
      onValueChange(localValue)
    }
  }, [editMode, localValue, onValueChange])
  return (
    <div
      className={`flex w-full max-w-full flex-row gap-1`}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div
        className={`w-[95%] shadow-[0_1px_0px_0_rgba(0,0,0,0.05)] !duration-150 transition-background after:absolute
        after:-bottom-[1px] after:left-1/2 after:h-[2px]
        after:${editMode ? 'w-full' : 'w-0'}
        after:origin-center after:-translate-x-1/2
        after:bg-primary after:content-[''] after:transition-width hover:border-default-300`}
      >
        <input
          type='text'
          id='text'
          value={localValue}
          onKeyDown={(e) => e.stopPropagation()}
          onInput={(event) => setLocalValue(event.currentTarget.value)}
          onClick={(event) => event.currentTarget.focus()}
          className='w-full truncate border-none text-start outline-none focus:outline-none'
          readOnly={!editMode}
        />
      </div>
      <Button
        className={`${showEdit ? '' : 'hidden'} h-fit min-h-fit w-fit min-w-fit px-1 py-1 shadow-none`}
        onClick={() => setEditMode((prev) => !prev)}
        isIconOnly
        variant='light'
        radius='sm'
        color='primary'
      >
        {editMode ? <CheckIcon size={15} /> : <PencilIcon />}
      </Button>
    </div>
  )
}
