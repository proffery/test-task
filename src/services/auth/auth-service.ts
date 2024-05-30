import { authService } from '@/common/utils/server-response-handlers'
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
          const res = await queryFulfilled

          authService.accessSuccessHandler(res, dispatch)
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
