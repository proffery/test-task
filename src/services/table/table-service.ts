import { ErrorsCodes } from '@/common/enums/errors-codes'
import { tableService } from '@/common/utils/server-response-handlers'
import { appActions } from '@/services/app/app-service'
import { AddItemData } from '@/types/forms-types'
import { BaseResponse, TableResponseData } from '@/types/services-types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ulid } from 'ulid'

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
    addItem: builder.mutation<BaseResponse<TableResponseData>, AddItemData>({
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tableApi.util.updateQueryData('getTable', undefined, draft => {
            const optimisticData = {
              ...data,
              companySigDate: new Date(data.companySigDate).toISOString(),
              employeeSigDate: new Date(data.employeeSigDate).toISOString(),
              id: ulid(),
            }

            draft.data.unshift(optimisticData)
          })
        )

        try {
          const res = await queryFulfilled

          tableService.accessDenyHandler(res, dispatch)
          if (res.data.error_code === ErrorsCodes.Success) {
            dispatch(appActions.setSuccessMessage(res.data.error_message ?? null))
            dispatch(
              tableApi.util.updateQueryData('getTable', undefined, draft => {
                draft.data[0].id = res.data.data.id
              })
            )
          } else {
            dispatch(appActions.setErrorMessage(res.data.error_text ?? null))
            patchResult?.undo()
          }
        } catch (error) {
          dispatch(appActions.setErrorMessage(JSON.stringify(error)))
          patchResult?.undo()
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: '/ru/data/v3/testmethods/docs/userdocs/create',
      }),
    }),
    getTable: builder.query<BaseResponse<TableResponseData[]>, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled

          tableService.accessDenyHandler(res, dispatch)
        } catch (error) {
          dispatch(appActions.setErrorMessage(JSON.stringify(error)))
        }
      },
      query: () => `/ru/data/v3/testmethods/docs/userdocs/get`,
    }),
    removeItem: builder.mutation<BaseResponse<TableResponseData>, { itemId: string }>({
      async onQueryStarted({ itemId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tableApi.util.updateQueryData('getTable', undefined, draft => {
            const index = draft.data.findIndex(item => item.id === itemId)

            if (index !== -1) {
              draft.data.splice(index, 1)
            }
          })
        )

        try {
          const res = await queryFulfilled

          tableService.accessDenyHandler(res, dispatch)
          if (res.data.error_code === ErrorsCodes.Success) {
            dispatch(appActions.setSuccessMessage(res.data.error_message ?? null))
          } else {
            dispatch(appActions.setErrorMessage(res.data.error_message ?? null))
            patchResult?.undo()
          }
        } catch (error) {
          dispatch(appActions.setErrorMessage(JSON.stringify(error)))
          patchResult?.undo()
        }
      },
      query: ({ itemId }) => ({
        method: 'POST',
        url: `/ru/data/v3/testmethods/docs/userdocs/delete/${itemId}`,
      }),
    }),
    updateItem: builder.mutation<BaseResponse<TableResponseData>, TableResponseData>({
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tableApi.util.updateQueryData('getTable', undefined, draft => {
            const optimisticData = {
              ...data,
              companySigDate: new Date(data.companySigDate).toISOString(),
              employeeSigDate: new Date(data.employeeSigDate).toISOString(),
            }
            const itemIndex = draft?.data?.findIndex(item => item?.id === id)

            if (itemIndex !== -1) {
              draft.data[itemIndex] = { ...draft?.data[itemIndex], ...optimisticData }
            }
          })
        )

        try {
          const res = await queryFulfilled

          tableService.accessDenyHandler(res, dispatch)
          if (res.data.error_code === ErrorsCodes.Success) {
            dispatch(appActions.setSuccessMessage(res.data.error_message ?? null))
          } else {
            dispatch(appActions.setErrorMessage(res.data.error_text ?? null))
            patchResult?.undo()
          }
        } catch (error) {
          dispatch(appActions.setErrorMessage(JSON.stringify(error)))
          patchResult?.undo()
        }
      },
      query: ({ id, ...body }) => ({
        body,
        method: 'POST',
        url: `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
      }),
    }),
  }),
  reducerPath: 'tableApi',
  tagTypes: ['Table'],
})

export const {
  useAddItemMutation,
  useGetTableQuery,
  useRemoveItemMutation,
  useUpdateItemMutation,
} = tableApi
