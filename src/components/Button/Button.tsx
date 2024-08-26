import type { ReactNode, MouseEvent } from "react";
import React from "react";
import clsx from "clsx";
import style from "./Button.module.css";
import type { ColorTypes } from "../../types";

type ButtonProps = {
  children: ReactNode;
  onClick?:
    | (() => void)
    | (() => Promise<void>)
    | ((e: MouseEvent) => void)
    | ((e: MouseEvent) => Promise<void>);
  link?: boolean; // кнопка-ссылка или обычная кнопка
  disabled?: boolean; // заблочить
  color?: ColorTypes;
  fontSize?: number;
  fitContent?: boolean;
  fullWidth?: boolean;
};

export default function Button({
  children,
  onClick,
  link = false,
  color,
  disabled = false,
  fontSize = 1,
  fitContent = false,
  fullWidth,
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={
        { fontSize: `${fontSize}rem` } &&
        (fitContent ? { width: "fit-content" } : {})
      }
      className={clsx(
        link ? style.link : style.btn,
        color ? style[color] : style.neutral,
        fullWidth && style.fullWidth
      )}
    >
      {children}
    </button>
  );
}
