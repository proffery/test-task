import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { ROUTES } from '@/common/consts/routes'
import { LoginForm } from '@/components/forms/login-form/login-form'
import { Page } from '@/components/ui/page/page'
import { selectAppIsAuthenticated } from '@/services/app/app.selectors'
import { useLoginMutation } from '@/services/auth/auth-service'

export const LoginPage = () => {
  const [login, { data }] = useLoginMutation()

  const isAuthenticated = useSelector(selectAppIsAuthenticated)
  const severError = data?.error_text

  if (isAuthenticated) {
    return <Navigate to={ROUTES.table} />
  }

  return (
    <Page>
      <LoginForm onLogin={data => login(data)} serverError={severError} />
    </Page>
  )
}
