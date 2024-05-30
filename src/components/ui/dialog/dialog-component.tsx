import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { DialogTitle } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

import s from './dialog-component.module.css'

type Props = {
  children?: ReactNode
  closeText?: string
  confirmText?: string
  onClose?: () => void
  onConfirm?: () => void
  open: boolean
  title?: string
} & ComponentPropsWithoutRef<typeof Dialog>

export const DialogComponent = ({
  children,
  closeText = 'Cancel',
  confirmText = 'Confirm',
  onClose,
  onConfirm,
  open,
  title,
}: Props) => {
  const handleClose = () => {
    onClose?.()
  }

  const handleConfirm = () => {
    onConfirm?.()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      {title && (
        <DialogTitle sx={{ textAlign: 'center' }} variant={'h4'}>
          {title}
        </DialogTitle>
      )}
      {children}
      <div className={s.buttonContainer}>
        <Button color={'error'} onClick={handleClose} variant={'outlined'}>
          {closeText}
        </Button>
        <Button color={'info'} onClick={handleConfirm} type={'submit'} variant={'outlined'}>
          {confirmText}
        </Button>
      </div>
    </Dialog>
  )
}
