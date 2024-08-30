import React from 'react'
import type { ReactNode } from 'react'
import style from './WholePage.module.scss'

type WholePageProps = {
  children: ReactNode
}

export default function WholePage({ children }: WholePageProps): JSX.Element {
  return <div className={style.wrapper}>{children}</div>
}
