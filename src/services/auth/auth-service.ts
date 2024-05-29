import { ErrorsCodes } from '@/common/enums/errors-codes'
import { appActions } from '@/services/app/app-service'
import { LoginData } from '@/types/forms-types'
import { BaseResponse, LoginResponseData } from '@/types/services-types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://test.v5.pryaniky.com',
    credentials: 'omit',
  }),
  endpoints: builder => ({
    login: builder.mutation<BaseResponse<LoginResponseData>, LoginData>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled

          if (result && result.data.error_code === ErrorsCodes.Success) {
            localStorage.setItem('token', result.data.data.token)
            dispatch(appActions.setIsAuthenticated(true))
            dispatch(appActions.setSuccessMessage(result.data.error_message ?? null))
          } else {
            localStorage.removeItem('token')
            dispatch(appActions.setIsAuthenticated(false))
            dispatch(appActions.setErrorMessage(result.data.error_text ?? null))
          }
        } catch (error) {
          dispatch(appActions.setErrorMessage(JSON.stringify(error)))
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: '/ru/data/v3/testmethods/docs/login',
      }),
    }),
  }),
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
})

export const { useLoginMutation } = authApi
