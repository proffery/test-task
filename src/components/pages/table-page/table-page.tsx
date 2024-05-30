import { useState } from 'react'

import { AddItemForm } from '@/components/forms/add-item-form/add-item-form'
import { DialogComponent } from '@/components/ui/dialog/dialog-component'
import { Page } from '@/components/ui/page/page'
import { TableComponent } from '@/components/ui/table/table'
import {
  useAddItemMutation,
  useGetTableQuery,
  useRemoveItemMutation,
} from '@/services/table/table-service'
import { AddItemData } from '@/types/forms-types'
import Button from '@mui/material/Button'
import { ulid } from 'ulid'

export const TablePage = () => {
  const { data: tableData } = useGetTableQuery(null)
  const [addItem] = useAddItemMutation()
  const [deleteItem] = useRemoveItemMutation()

  const [itemId, setItemId] = useState('')
  const [openAddItem, setOpenAddItem] = useState(false)
  const [openDeleteItem, setOpenDeleteItem] = useState(false)

  const onAddItem = (data: AddItemData) => {
    addItem({ data, tempId: ulid() })
    setOpenAddItem(false)
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
        onClose={() => setOpenAddItem(false)}
        onFormSubmit={onAddItem}
        open={openAddItem}
      />
      <DialogComponent
        onClose={() => setOpenDeleteItem(false)}
        onConfirm={onDeleteConfirm}
        open={openDeleteItem}
        title={`Remove item?`}
      />
      <div>
        <Button onClick={() => setOpenAddItem(true)}>Add Item</Button>
      </div>
      <TableComponent deleteData={onDeleteOpen} editData={() => {}} tableData={tableData?.data} />
    </Page>
  )
}
