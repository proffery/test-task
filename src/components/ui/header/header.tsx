import { useDispatch, useSelector } from 'react-redux'

import { selectAppIsAuthenticated } from '@/services/app/app.selectors'
import { appActions } from '@/services/app/app-service'
import { AppDispatch } from '@/services/store'
import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

export const Header = () => {
  const isAuthenticated = useSelector(selectAppIsAuthenticated)

  const dispatch = useDispatch<AppDispatch>()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(appActions.setIsAuthenticated(false))
  }

  return (
    <AppBar position={'static'}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant={'h4'}>TEST-TASK</Typography>
        {isAuthenticated && (
          <Button color={'info'} onClick={logoutHandler} variant={'contained'}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
