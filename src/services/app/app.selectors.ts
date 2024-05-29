import { RootState } from '@/services/store'

export const selectAppIsAuthenticated = (state: RootState) => state.app.isAuthenticated
export const selectAppIsLoading = (state: RootState) => state.app.isLoading
