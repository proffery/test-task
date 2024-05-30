import { useState } from 'react'
import { useSelector } from 'react-redux'

import { AddItemForm } from '@/components/forms/add-item-form/add-item-form'
import { DialogComponent } from '@/components/ui/dialog/dialog-component'
import { Page } from '@/components/ui/page/page'
import { TableComponent } from '@/components/ui/table/table'
import { selectAppIsLoading } from '@/services/app/app.selectors'
import {
  useAddItemMutation,
  useGetTableQuery,
  useRemoveItemMutation,
} from '@/services/table/table-service'
import { AddItemData } from '@/types/forms-types'
import { TableResponseData } from '@/types/services-types'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'

export const TablePage = () => {
  const { data: tableData } = useGetTableQuery(null)
  const [addItem] = useAddItemMutation()
  const [deleteItem] = useRemoveItemMutation()

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

  const onEditConfirm = () => {
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
        onClose={() => setOpenDeleteItem(false)}
        onConfirm={onDeleteConfirm}
        open={openDeleteItem}
        title={`Remove item?`}
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
