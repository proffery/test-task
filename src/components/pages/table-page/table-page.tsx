import { Page } from '@/components/ui/page/page'
import { useGetTableQuery } from '@/services/table/table-service'

export const TablePage = () => {
  const { data } = useGetTableQuery()

  return <Page>tablePage</Page>
}
