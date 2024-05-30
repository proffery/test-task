import { TableResponseData } from '@/types/services-types'

export type TableHeadType = { header: string; key: keyof TableResponseData }

export const tableHeads: TableHeadType[] = [
  { header: 'Company Signature Date', key: 'companySigDate' },
  { header: 'Company Signature Name', key: 'companySignatureName' },
  { header: 'Document Name', key: 'documentName' },
  { header: 'Document Status', key: 'documentStatus' },
  { header: 'Document Type', key: 'documentType' },
  { header: 'Employee Number', key: 'employeeNumber' },
  { header: 'Employee Signature Date', key: 'employeeSigDate' },
  { header: 'Employee Signature Name', key: 'employeeSignatureName' },
]
