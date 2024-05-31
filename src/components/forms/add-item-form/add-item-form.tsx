import { ComponentPropsWithoutRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { isoStringToDateFormat } from '@/common/utils/iso-string-to-date-format'
import { ControlledInput } from '@/components/controlled/controlled-input'
import { addItemSchema } from '@/components/forms/add-item-form/add-item-schema'
import { DialogComponent } from '@/components/ui/dialog/dialog-component'
import { AddItemData } from '@/types/forms-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputLabel } from '@mui/material'

import s from './add-item-form.module.css'

type Props = {
  defaultData?: AddItemData
  onFormSubmit: (data: AddItemData) => void
} & Omit<ComponentPropsWithoutRef<typeof DialogComponent>, 'children'>
export const AddItemForm = ({ defaultData, onChange, onFormSubmit, open, ...rest }: Props) => {
  const { control, handleSubmit, reset } = useForm<AddItemData>({
    defaultValues: { ...defaultData },
    resolver: zodResolver(addItemSchema),
  })

  useEffect(() => {
    reset({
      companySigDate: isoStringToDateFormat(defaultData?.companySigDate ?? ''),
      companySignatureName: defaultData?.employeeSignatureName ?? '',
      documentName: defaultData?.documentName ?? '',
      documentStatus: defaultData?.documentStatus ?? '',
      documentType: defaultData?.documentType ?? '',
      employeeNumber: defaultData?.employeeNumber ?? '',
      employeeSigDate: isoStringToDateFormat(defaultData?.employeeSigDate ?? ''),
      employeeSignatureName: defaultData?.employeeSignatureName ?? '',
    })
  }, [open])

  const handleFormSubmit = (data: AddItemData) => {
    onFormSubmit(data)
    reset()
  }

  return (
    <DialogComponent onConfirm={handleSubmit(handleFormSubmit)} open={open} {...rest}>
      <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <InputLabel htmlFor={'companySigDate'} size={'small'}>
          Company
        </InputLabel>
        <ControlledInput
          control={control}
          label={'Company Signature Date'}
          name={'companySigDate'}
          size={'small'}
          type={'date'}
          variant={'filled'}
        />
        <ControlledInput
          control={control}
          label={'Company Signature Name'}
          name={'companySignatureName'}
          size={'small'}
          variant={'filled'}
        />
        <ControlledInput
          control={control}
          label={'Document Name'}
          name={'documentName'}
          size={'small'}
          variant={'filled'}
        />
        <ControlledInput
          control={control}
          label={'Document Status'}
          name={'documentStatus'}
          size={'small'}
          variant={'filled'}
        />
        <ControlledInput
          control={control}
          label={'Document Type'}
          name={'documentType'}
          size={'small'}
          variant={'filled'}
        />
        <InputLabel htmlFor={'employeeSigDate'} size={'small'}>
          Employee
        </InputLabel>
        <ControlledInput
          control={control}
          label={'Employee Number'}
          name={'employeeNumber'}
          size={'small'}
          variant={'filled'}
        />
        <ControlledInput
          control={control}
          label={'Employee Signature Date'}
          name={'employeeSigDate'}
          size={'small'}
          type={'date'}
          variant={'filled'}
        />
        <ControlledInput
          control={control}
          label={'Employee Signature Name'}
          name={'employeeSignatureName'}
          size={'small'}
          variant={'filled'}
        />
      </form>
    </DialogComponent>
  )
}
