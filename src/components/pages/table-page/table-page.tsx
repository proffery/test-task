import { Page } from '@/components/ui/page/page'
import { TableComponent } from '@/components/ui/table/table'
import { useGetTableQuery } from '@/services/table/table-service'

export const TablePage = () => {
  const { data } = useGetTableQuery()

  return (
    <Page>
      <TableComponent tableData={data?.data} />
    </Page>
  )
}
