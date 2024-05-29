import { useId } from 'react'

import { TableHeadType, tableHeads } from '@/common/consts/tableFields'
import { toLocalDate } from '@/common/utils/dateToLocalFormat'
import { TableResponseData } from '@/types/services-types'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Button from '@mui/material/Button'

type Props = {
  deleteData: (id: string) => void
  editData: (id: string) => void
  tableData?: TableResponseData[]
}

export const TableComponent = ({ deleteData, editData, tableData }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label={'simple table'} sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {tableHeads.map(head => (
              <TableCell key={head.key}>
                <Typography variant={'body1'}>{head.header}</Typography>
              </TableCell>
            ))}
            <TableCell>
              <Typography variant={'body1'}>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((item: TableResponseData) => (
            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {tableHeads.map((cell: TableHeadType) => (
                <TableCell component={'th'} key={useId()} scope={'row'}>
                  {toLocalDate(item[cell.key])}
                </TableCell>
              ))}
              <TableCell>
                <Button onClick={() => editData(item.id)}>Edit</Button>
                <Button color={'error'} onClick={() => deleteData(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
