import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { addItemSchema } from '@/components/forms/add-item-form/add-item-schema'
import { DialogComponent } from '@/components/ui/dialog/dialog-component'
import { AddItemData } from '@/types/forms-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, InputLabel, TextField, Typography } from '@mui/material'

import s from './add-item-form.module.css'

type Props = {
  onFormSubmit: (data: AddItemData) => void
} & Omit<ComponentPropsWithoutRef<typeof DialogComponent>, 'children'>
export const AddItemForm = ({ onFormSubmit, open, ...rest }: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AddItemData>({ resolver: zodResolver(addItemSchema) })

  const handleFormSubmit = handleSubmit(data => {
    onFormSubmit(data)
  })

  return (
    <DialogComponent onConfirm={handleFormSubmit} open={open} {...rest}>
      <div className={s.formContainer}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <form className={s.form} onSubmit={handleFormSubmit}>
              <Typography
                color={'text.secondary'}
                gutterBottom
                sx={{ fontSize: 36 }}
                textAlign={'center'}
                variant={'h1'}
              >
                Add Item
              </Typography>
              <InputLabel htmlFor={'companySigDate'} size={'small'}>
                Company Signature Date
              </InputLabel>
              <TextField
                error={!!errors.companySigDate}
                helperText={errors.companySigDate?.message}
                id={'companySigDate'}
                margin={'none'}
                size={'small'}
                type={'date'}
                variant={'outlined'}
                {...register('companySigDate')}
              />
              <TextField
                error={!!errors.companySignatureName}
                helperText={errors.companySignatureName?.message}
                label={'Company Signature Name'}
                margin={'none'}
                size={'small'}
                variant={'filled'}
                {...register('companySignatureName')}
              />
              <TextField
                error={!!errors.documentName}
                helperText={errors.documentName?.message}
                label={'Document Name'}
                margin={'none'}
                size={'small'}
                variant={'filled'}
                {...register('documentName')}
              />
              <TextField
                error={!!errors.documentStatus}
                helperText={errors.documentStatus?.message}
                label={'Document Status'}
                margin={'none'}
                size={'small'}
                variant={'filled'}
                {...register('documentStatus')}
              />
              <TextField
                error={!!errors.documentType}
                helperText={errors.documentType?.message}
                label={'Document Type'}
                margin={'none'}
                size={'small'}
                variant={'filled'}
                {...register('documentType')}
              />
              <TextField
                error={!!errors.employeeNumber}
                helperText={errors.employeeNumber?.message}
                label={'Employee Number'}
                margin={'none'}
                size={'small'}
                variant={'filled'}
                {...register('employeeNumber')}
              />
              <InputLabel htmlFor={'employeeSigDate'} size={'small'}>
                Employee Signature Date
              </InputLabel>
              <TextField
                error={!!errors.employeeSigDate}
                helperText={errors.employeeSigDate?.message}
                id={'employeeSigDate'}
                margin={'none'}
                size={'small'}
                type={'date'}
                variant={'filled'}
                {...register('employeeSigDate')}
              />
              <TextField
                error={!!errors.employeeSignatureName}
                helperText={errors.employeeSignatureName?.message}
                label={'Employee Signature Name'}
                margin={'none'}
                size={'small'}
                variant={'filled'}
                {...register('employeeSignatureName')}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </DialogComponent>
  )
}
