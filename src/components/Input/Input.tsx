import React from 'react'
import type { ChangeEvent, ForwardedRef } from 'react'
import style from './Input.module.css'

type InputProps = {
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  name: string
  value?: string
  required?: boolean
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  color?: string
  // ref?: ForwardedRef<HTMLInputElement>
}

export default function Input({
  placeholder = 'введите текст',
  onChange,
  type = 'text',
  name,
  value = '',
  required,
  onKeyDown,
  color,
}: InputProps): JSX.Element {
  return (
    <input
      autoComplete='off'
      onKeyDown={onKeyDown}
      className={style.input}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      name={name}
      value={value}
      required={required}
      style={{backgroundColor: color}}
    />
  )
}
