import { ComponentPropsWithoutRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/components/controlled/controlled-input'
import { loginSchema } from '@/components/forms/login-form/login-schema'
import { LoginData } from '@/types/forms-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, Typography } from '@mui/material'
import Button from '@mui/material/Button'

import s from './login-form.module.css'

type Props = {
  onLogin: (data: LoginData) => void
  serverError?: null | string
} & ComponentPropsWithoutRef<'div'>
export const LoginForm = ({ onLogin, serverError, ...rest }: Props) => {
  const { clearErrors, control, handleSubmit, setError } = useForm<LoginData>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (serverError) {
      setError('username', { message: serverError, type: 'server' })
      setError('password', { message: serverError, type: 'server' })
    } else {
      clearErrors(['username', 'password'])
    }
  }, [serverError])

  const handleFormSubmit = (data: LoginData) => {
    onLogin(data)
  }

  return (
    <div className={s.formContainer} {...rest}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <Typography
              color={'text.secondary'}
              gutterBottom
              sx={{ fontSize: 36 }}
              textAlign={'center'}
              variant={'h1'}
            >
              Log In
            </Typography>
            <ControlledInput
              control={control}
              label={'User name'}
              name={'username'}
              variant={'filled'}
            />
            <ControlledInput
              control={control}
              label={'Password'}
              name={'password'}
              type={'password'}
              variant={'filled'}
            />
            <div className={s.buttonContainer}>
              <Button type={'submit'} variant={'contained'}>
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
