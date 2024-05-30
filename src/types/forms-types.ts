import { TableResponseData } from '@/types/services-types'

export type LoginData = {
  password: string
  username: string
}

export type AddItemData = Omit<TableResponseData, 'id'>
