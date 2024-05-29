import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { selectAppIsAuthenticated, selectAppIsLoading } from '@/services/app/app.selectors'
import { appActions } from '@/services/app/app-service'
import { AppDispatch } from '@/services/store'
import { Box, LinearProgress, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

export const Layout = () => {
  const isAuthenticated = useSelector(selectAppIsAuthenticated)
  const isLoading = useSelector(selectAppIsLoading)
  const dispatch = useDispatch<AppDispatch>()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(appActions.setIsAuthenticated(false))
  }

  return (
    <>
      {isLoading && (
        <Box sx={{ position: 'absolute', width: '100%' }}>
          <LinearProgress color={'secondary'} />
        </Box>
      )}
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
      <main>
        <Outlet />
      </main>
      <footer>Coded by Dmitry Shamko All Rights Reserved 2024</footer>
    </>
  )
}
