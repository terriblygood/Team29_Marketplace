import React from "react";
import clsx from "clsx";
import closeIcon from "../../assets/close-icon.svg";
import style from "./Modal.module.scss";

type ModalProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
};

export default function Modal({
  active,
  setActive,
  children,
}: ModalProps): JSX.Element {
  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(active ? style.modal : style.active)}
      onClick={() => setActive((prev) => !prev)}
      onKeyDown={(event) => event}
    >
      <div
        role="button"
        tabIndex={0}
        className={`${style.modalContent}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(event) => event}
      >
        <button
          className={clsx(style.close, style.link)}
          type="button"
          onClick={() => setActive((prev) => !prev)}
        >
          <img className={style.icon} src={closeIcon} alt="svg" />
        </button>
        {children}
      </div>
    </div>
  );
}
