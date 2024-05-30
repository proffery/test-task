import { ErrorsCodes } from '@/common/enums/errors-codes'
import { appActions } from '@/services/app/app-service'
import { AppDispatch } from '@/services/store'
import { BaseResponse, LoginResponseData } from '@/types/services-types'
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'

type Response<T> = {
  data: T
  meta: FetchBaseQueryMeta | undefined
}

export const authService = {
  accessSuccessHandler: (res: Response<BaseResponse<LoginResponseData>>, dispatch: AppDispatch) => {
    if (res.data.error_code === ErrorsCodes.Success) {
      localStorage.setItem('token', res.data.data.token)
      dispatch(appActions.setIsAuthenticated(true))
      dispatch(appActions.setSuccessMessage(res.data.error_message ?? null))
    } else {
      localStorage.removeItem('token')
      dispatch(appActions.setIsAuthenticated(false))
      dispatch(appActions.setErrorMessage(res.data.error_text ?? null))
    }
  },
}

export const tableService = {
  accessDenyHandler: (res: Response<BaseResponse>, dispatch: AppDispatch) => {
    if (res.data.error_code === ErrorsCodes.AccessDeny) {
      localStorage.removeItem('token')
      dispatch(appActions.setIsAuthenticated(false))
      dispatch(appActions.setErrorMessage(res.data.error_text ?? null))
    }
  },
}
