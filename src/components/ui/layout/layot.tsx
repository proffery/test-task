import { Outlet } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

export const Layout = () => {
  return (
    <>
      <AppBar position={'static'}>
        <Toolbar>
          <Button color={'inherit'}>Logout</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
      <footer>Coded by Dmitry Shamko All Rights Reserved 2024</footer>
    </>
  )
}
