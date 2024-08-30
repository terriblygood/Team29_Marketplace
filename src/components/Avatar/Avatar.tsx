import React from 'react'
import style from './Avatar.module.scss'

type AvatarProps = {
  size?: number
  letter?: string
  src?: string
  border?: number
}

export default function Avatar({
  size = 3,
  letter = '?',
  border = 2,
  src,
}: AvatarProps): JSX.Element {
  const isValidSrc = src && !src.endsWith('/null')  && !src.endsWith('/')

  return (
    <div
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        border: `${border}px solid var(--brown)`,
      }}
      className={style.avatar}
    >
      {isValidSrc ? (
        <img className={style.img} src={src} alt='avatar' />
      ) : (
        <div style={{ fontSize: `${size * 0.8}rem` }} className={style.letter}>
          {letter.toUpperCase()}
        </div>
      )}
    </div>
  )
}
