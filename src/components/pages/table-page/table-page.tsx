import { useState } from 'react'
import { useSelector } from 'react-redux'

import { AddItemForm } from '@/components/forms/add-item-form/add-item-form'
import { TableComponent } from '@/components/table/table'
import { DialogComponent } from '@/components/ui/dialog/dialog-component'
import { Page } from '@/components/ui/page/page'
import { selectAppIsLoading } from '@/services/app/app.selectors'
import {
  useAddItemMutation,
  useGetTableQuery,
  useRemoveItemMutation,
  useUpdateItemMutation,
} from '@/services/table/table-service'
import { AddItemData } from '@/types/forms-types'
import { TableResponseData } from '@/types/services-types'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'

export const TablePage = () => {
  const { data: tableData } = useGetTableQuery(null)
  const [addItem] = useAddItemMutation()
  const [deleteItem] = useRemoveItemMutation()
  const [updateItem] = useUpdateItemMutation()

  const isAppLoading = useSelector(selectAppIsLoading)

  const [itemId, setItemId] = useState('')
  const [itemData, setItemData] = useState<AddItemData>()
  const [openAddItem, setOpenAddItem] = useState(false)
  const [openDeleteItem, setOpenDeleteItem] = useState(false)
  const [openEditItem, setOpenEditItem] = useState(false)

  const onAddItem = (data: AddItemData) => {
    addItem(data)
    setOpenAddItem(false)
  }

  const onEditOpen = (data: TableResponseData) => {
    const { id, ...rest } = data

    setItemId(id)
    setItemData(rest)
    setOpenEditItem(true)
  }

  const onEditConfirm = (data: AddItemData) => {
    updateItem({ id: itemId, ...data })
    setOpenEditItem(false)
  }

  const onDeleteOpen = (id: string) => {
    setItemId(id)
    setOpenDeleteItem(true)
  }

  const onDeleteConfirm = () => {
    deleteItem({ itemId })
    setOpenDeleteItem(false)
  }

  return (
    <Page>
      <AddItemForm
        key={'add-item'}
        onClose={() => setOpenAddItem(false)}
        onFormSubmit={onAddItem}
        open={openAddItem}
        title={'Add item'}
      />
      <AddItemForm
        defaultData={itemData}
        key={'edit-item'}
        onClose={() => setOpenEditItem(false)}
        onFormSubmit={onEditConfirm}
        open={openEditItem}
        title={'Edit item'}
      />
      <DialogComponent
        key={'delete-item'}
        onClose={() => setOpenDeleteItem(false)}
        onConfirm={onDeleteConfirm}
        open={openDeleteItem}
        title={`Delete item?`}
      >
        <Typography textAlign={'center'} variant={'caption'}>
          ID:{itemId}
        </Typography>
      </DialogComponent>
      <div style={{ alignSelf: 'center' }}>
        <Button disabled={isAppLoading} onClick={() => setOpenAddItem(true)} variant={'outlined'}>
          Add Item
        </Button>
      </div>
      <TableComponent
        disabled={isAppLoading}
        onDeleteData={onDeleteOpen}
        onEditData={onEditOpen}
        tableData={tableData?.data}
      />
    </Page>
  )
}
