import { Outlet } from 'react-router-dom'

import { Alerts } from '@/components/ui/alerts/alerts'
import { Header } from '@/components/ui/header/header'
import { Loader } from '@/components/ui/loader/loader'

export const Layout = () => {
  return (
    <>
      <Loader />
      <Alerts />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>Coded by Dmitry Shamko All Rights Reserved 2024</footer>
    </>
  )
}
