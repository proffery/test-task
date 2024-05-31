import { ComponentPropsWithoutRef } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextField } from '@mui/material'

type TextFieldProps = ComponentPropsWithoutRef<typeof TextField>

export type ControlledInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<TextFieldProps, 'id' | 'onChange' | 'value'>

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextField error={!!error} helperText={error?.message} id={name} {...rest} {...field} />
}
