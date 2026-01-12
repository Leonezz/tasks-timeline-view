import { useEffect, useState } from 'react'
import { PencilIcon } from '../asserts/icons/pencil'
import { Button, Input } from '@heroui/react' // Remove Textarea
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
      className={
        'flex h-full w-full max-w-full flex-row justify-between gap-1 align-baseline'
      }
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      {editMode ? (
        <Input
          id='text'
          variant='underlined'
          color='primary'
          value={localValue}
          onKeyDown={(e) => e.stopPropagation()}
          onInput={(event) => setLocalValue(event.currentTarget.value)}
          onClick={(event) => {
            event.stopPropagation()
          }}
          classNames={{
            input: 'text-medium',
            inputWrapper: 'pt-0 px-0!',
            innerWrapper: 'pb-0'
          }}
          size='sm'
          endContent={
            <Button
              className={
                'h-fit min-h-fit w-fit min-w-fit px-1 py-1 shadow-none'
              }
              onClick={() => setEditMode((prev) => !prev)}
              isIconOnly
              variant='light'
              radius='sm'
              color='primary'
            >
              <CheckIcon size={15} />
            </Button>
          }
        />
      ) : (
        <div className='inline-flex items-center'>
          <span
            className={`h-fit align-top ${classNames.text} text-wrap break-all`}
          >
            {localValue}
          </span>
          {onHover && !editMode && (
            <Button
              className={
                'h-fit min-h-fit w-fit min-w-fit px-1 py-1 shadow-none'
              }
              onClick={() => setEditMode((prev) => !prev)}
              isIconOnly
              variant='light'
              radius='sm'
              color='primary'
            >
              <PencilIcon />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
