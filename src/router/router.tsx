import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/consts/routes'
import { LoginPage } from '@/components/pages/login-page/login-page'
import { Layout } from '@/components/ui/layout/layot'

const publicRoutes: RouteObject[] = [
  {
    element: <LoginPage />,
    path: ROUTES.login,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={ROUTES.table} />,
    path: ROUTES.base,
  },
  {
    element: <div>hello</div>,
    path: ROUTES.table,
  },
  {
    element: <h1>404! Page not found!</h1>,
    path: ROUTES.rest,
  },
]

function PrivateRoutes() {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: '/',
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
