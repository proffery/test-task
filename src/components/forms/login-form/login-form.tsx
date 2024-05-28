import { useForm } from 'react-hook-form'

import { loginSchema } from '@/components/forms/login-form/login-schema'
import { LoginData } from '@/types/forms-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'

import s from './login-form.module.css'

type Props = {
  onLogin: (data: LoginData) => void
  serverError?: string
}
export const LoginForm = ({ onLogin }: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) })

  const handleFormSubmit = (data: LoginData) => {
    onLogin(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent className={s.form}>
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
            error={!!errors.userName}
            helperText={errors.userName?.message}
            label={'Username'}
            variant={'filled'}
            {...register('userName')}
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
        </CardContent>
      </Card>
    </form>
  )
}
