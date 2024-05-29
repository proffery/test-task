import { appReducer } from '@/services/app/app-service'
import { authApi } from '@/services/auth/auth-service'
import { tableApi } from '@/services/table/table-service'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, tableApi.middleware),
  reducer: {
    [appReducer.name]: appReducer.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [tableApi.reducerPath]: tableApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
