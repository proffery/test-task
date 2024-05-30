import { ErrorsCodes } from '@/common/enums/errors-codes'
import { appActions } from '@/services/app/app-service'
import { AddItemData } from '@/types/forms-types'
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
  endpoints: builder => ({
    addItem: builder.mutation<
      BaseResponse<TableResponseData>,
      { data: AddItemData; tempId: string }
    >({
      async onQueryStarted({ data, tempId }, { dispatch, queryFulfilled }) {
        dispatch(appActions.setAppIsLoading(true))
        const patchResult = dispatch(
          tableApi.util.updateQueryData('getTable', null, draft => {
            const optimisticData = {
              ...data,
              companySigDate: new Date(data.companySigDate).toISOString(),
              employeeSigDate: new Date(data.employeeSigDate).toISOString(),
              id: tempId,
            }

            draft.data.unshift(optimisticData)
          })
        )

        try {
          const result = await queryFulfilled

          if (result && result.data.error_code === ErrorsCodes.Success) {
            dispatch(appActions.setSuccessMessage(result.data.error_message ?? null))
            dispatch(
              tableApi.util.updateQueryData('getTable', null, draft => {
                const newId = result.data.data.id

                draft.data[0].id = newId
              })
            )
          } else {
            dispatch(appActions.setErrorMessage(result.data.error_text ?? null))
            patchResult?.undo()
          }
        } catch (error) {
          dispatch(appActions.setErrorMessage(JSON.stringify(error)))
          patchResult?.undo()
        } finally {
          dispatch(appActions.setAppIsLoading(false))
        }
      },
      query: ({ data }) => ({
        body: data,
        method: 'POST',
        url: '/ru/data/v3/testmethods/docs/userdocs/create',
      }),
    }),
    getTable: builder.query<BaseResponse<TableResponseData[]>, null>({
      providesTags: ['Table'],
      query: () => `/ru/data/v3/testmethods/docs/userdocs/get`,
    }),
    removeItem: builder.mutation<BaseResponse<TableResponseData>, { itemId: string }>({
      async onQueryStarted({ itemId }, { dispatch, queryFulfilled }) {
        dispatch(appActions.setAppIsLoading(true))
        const patchResult = dispatch(
          tableApi.util.updateQueryData('getTable', null, draft => {
            const index = draft.data.findIndex(item => item.id === itemId)

            if (index !== -1) {
              draft.data.splice(index, 1)
            }
          })
        )

        try {
          const result = await queryFulfilled

          if (result && result.data.error_code === ErrorsCodes.Success) {
            dispatch(appActions.setSuccessMessage(result.data.error_message ?? null))
          } else {
            dispatch(appActions.setErrorMessage(result.data.error_message ?? null))
            patchResult?.undo()
          }
        } catch (error) {
          dispatch(appActions.setErrorMessage(JSON.stringify(error)))
          patchResult?.undo()
        } finally {
          dispatch(appActions.setAppIsLoading(false))
        }
      },
      query: ({ itemId }) => ({
        method: 'POST',
        url: `/ru/data/v3/testmethods/docs/userdocs/delete/${itemId}`,
      }),
    }),
  }),
  reducerPath: 'tableApi',
  tagTypes: ['Table'],
})

export const { useAddItemMutation, useGetTableQuery, useRemoveItemMutation } = tableApi
