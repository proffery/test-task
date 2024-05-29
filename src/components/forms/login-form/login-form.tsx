import { ComponentPropsWithoutRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { loginSchema } from '@/components/forms/login-form/login-schema'
import { LoginData } from '@/types/forms-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'

import s from './login-form.module.css'

type Props = {
  onLogin: (data: LoginData) => void
  serverError?: null | string
} & ComponentPropsWithoutRef<'div'>
export const LoginForm = ({ onLogin, serverError, ...rest }: Props) => {
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) })

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
            <TextField
              error={!!errors.username}
              helperText={errors.username?.message}
              label={'Username'}
              variant={'filled'}
              {...register('username')}
            />
            <TextField
              error={!!errors.password}
              helperText={errors.password?.message}
              label={'Password'}
              type={'password'}
              variant={'filled'}
              {...register('password')}
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
