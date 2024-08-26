import React from 'react'
import type { ReactNode } from 'react'
import style from './SideBar.module.css'
import clsx from 'clsx'

type SideBarProps = {
  children: ReactNode
  center?: boolean
  wide?:boolean
}

export default function SideBar({
  children,
  center,wide
}: SideBarProps): JSX.Element {
  return <div style={center ? { alignItems: 'center'} : {}} className={clsx(wide ?style.sidebarWide : style.sidebar)}>{children}</div>
}
