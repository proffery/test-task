import { TableHeadType, tableHeads } from '@/common/consts/table-fields'
import { toLocalDate } from '@/common/utils/date-to-local-format'
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
  disabled?: boolean
  onDeleteData: (id: string) => void
  onEditData: (data: TableResponseData) => void
  tableData?: TableResponseData[]
}

export const TableComponent = ({
  disabled = false,
  onDeleteData,
  onEditData,
  tableData,
}: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label={'simple table'} sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {tableHeads.map(head => (
              <TableCell key={head.key}>
                <Typography sx={{ textDecoration: 'underline' }} variant={'subtitle1'}>
                  {head.header}
                </Typography>
              </TableCell>
            ))}
            <TableCell>
              <Typography sx={{ textDecoration: 'underline' }} variant={'subtitle1'}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((item: TableResponseData) => (
            <TableRow
              hover
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {tableHeads.map((cell: TableHeadType) => (
                <TableCell component={'th'} key={item.id + cell.key} scope={'row'}>
                  {toLocalDate(item[cell.key])}
                </TableCell>
              ))}
              <TableCell>
                <Button disabled={disabled} onClick={() => onEditData(item)}>
                  Edit
                </Button>
                <Button color={'error'} disabled={disabled} onClick={() => onDeleteData(item.id)}>
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
