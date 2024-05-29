import { ComponentPropsWithoutRef, ReactNode } from 'react'

import s from './page.module.css'

type Props = {
  children?: ReactNode
} & ComponentPropsWithoutRef<'div'>
export const Page = ({ children, ...rest }: Props) => {
  return (
    <div {...rest} className={s.pageContainer}>
      {children}
    </div>
  )
}
