import { BaseResponse, TableResponseData } from '@/types/services-types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tableApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://test.v5.pryaniky.com',
    credentials: 'omit',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token') ?? ''

      headers.append('x-auth', token)
    },
  }),
  endpoints: builder => {
    return {
      getTable: builder.query<BaseResponse<TableResponseData[]>, void>({
        query: () => `/ru/data/v3/testmethods/docs/userdocs/get`,
      }),
    }
  },
  reducerPath: 'tableApi',
})

export const { useGetTableQuery } = tableApi
