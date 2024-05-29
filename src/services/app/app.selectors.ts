import { RootState } from '@/services/store'

export const selectAppIsAuthenticated = (state: RootState) => state.app.isAuthenticated
export const selectAppIsLoading = (state: RootState) => state.app.isLoading
export const selectAppError = (state: RootState) => state.app.errorMessage
export const selectAppSuccess = (state: RootState) => state.app.successMessage
