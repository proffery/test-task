import { z } from 'zod'

export const addItemSchema = z.object({
  companySigDate: z.string().pipe(z.coerce.date()),
  companySignatureName: z.string().min(1, { message: 'Company Signature Name is required' }),
  documentName: z.string().min(1, { message: 'Document Name is required' }),
  documentStatus: z.string().min(1, { message: 'Document Status is required' }),
  documentType: z.string().min(1, { message: 'Document Type is required' }),
  employeeNumber: z.string().min(1, { message: 'Employee Number is required' }),
  employeeSigDate: z.string().pipe(z.coerce.date()),
  employeeSignatureName: z.string().min(1, { message: 'Employee Signature Name is required' }),
})
