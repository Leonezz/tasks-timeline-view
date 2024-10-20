import { useEffect, useState } from 'react'
import { PencilIcon } from '../asserts/icons/pencil'
import { Button, Textarea } from '@nextui-org/react'
import { CheckIcon } from '../item/TaskItemInfoBadge'

type EditableTextProps = {
  value: string
  onValueChange: (value: string) => void
  classNames: {
    text: string
  }
}
export const EditableText = ({
  value,
  onValueChange,
  classNames
}: EditableTextProps) => {
  const [editMode, setEditMode] = useState(false)
  const [onHover, setOnHover] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  useEffect(() => {
    if (!editMode) {
      onValueChange(localValue)
    }
  }, [editMode, localValue, onValueChange])

  return (
    <div
      className={`flex w-full max-w-full flex-row justify-between gap-1`}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      {/* <div
        className={` flex w-full max-w-full flex-row align-top  shadow-[0_1px_0px_0_rgba(0,0,0,0.05)] !duration-150 transition-background 
        after:-bottom-[1px] after:left-1/2 after:h-[2px]
        ${editMode ? 'after:w-full' : 'after:w-0'}
        after:origin-center after:-translate-x-1/2
        after:bg-primary after:content-[''] after:transition-width hover:border-default-300`}
      > */}
      {!editMode && (
        <span className={`max-w-[90%] text-wrap break-all ${classNames.text}`}>
          {localValue}
        </span>
      )}
      {editMode && (
        <Textarea
          id='text'
          variant='underlined'
          color='primary'
          value={localValue}
          onKeyDown={(e) => e.stopPropagation()}
          onInput={(event) => setLocalValue(event.currentTarget.value)}
          onClick={(event) => event.currentTarget.focus()}
          classNames={{
            input: 'text-medium',
            inputWrapper: 'pt-0 !px-0',
            innerWrapper: 'pb-0'
          }}
          endContent={
            <Button
              className={`h-fit min-h-fit w-fit min-w-fit px-1 py-1 shadow-none`}
              onClick={() => setEditMode((prev) => !prev)}
              isIconOnly
              variant='light'
              radius='sm'
              color='primary'
            >
              <CheckIcon size={15} />
            </Button>
          }
          readOnly={!editMode}
        />
      )}
      {onHover && !editMode && (
        <Button
          className={`h-fit min-h-fit w-fit min-w-fit px-1 py-1 shadow-none`}
          onClick={() => setEditMode((prev) => !prev)}
          isIconOnly
          variant='light'
          radius='sm'
          color='primary'
        >
          <PencilIcon />
        </Button>
      )}
      {/* </div> */}
    </div>
  )
}
