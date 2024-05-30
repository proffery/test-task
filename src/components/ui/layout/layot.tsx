import { Outlet } from 'react-router-dom'

import { Alerts } from '@/components/ui/alerts/alerts'
import { Footer } from '@/components/ui/footer/footer'
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
      <Footer />
    </>
  )
}
