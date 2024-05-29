export type LoginResponseData = {
  token: string
}

export type TableResponseData = {
  companySigDate: string
  companySignatureName: string
  documentName: string
  documentStatus: string
  documentType: string
  employeeNumber: string
  employeeSigDate: string
  employeeSignatureName: string
  id: string
}

export type BaseResponse<T> = {
  data: T
  error_code: number
  error_message?: string
  error_text?: string
  profiling: string
  timings: null | number
}
