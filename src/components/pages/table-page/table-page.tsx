import { Page } from '@/components/ui/page/page'
import { useGetTableQuery } from '@/services/table/table-service'

export const TablePage = () => {
  const {} = useGetTableQuery()

  return <Page>tablePage</Page>
}
