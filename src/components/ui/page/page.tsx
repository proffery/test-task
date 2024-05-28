import { ReactNode } from 'react'

import s from './page.module.css'

type Props = {
  children?: ReactNode
}
export const Page = ({ children }: Props) => {
  return <div className={s.pageContainer}>{children}</div>
}
