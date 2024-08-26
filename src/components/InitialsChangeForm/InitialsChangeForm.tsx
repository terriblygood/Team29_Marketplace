import type { ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import type { UserDataType, UserType } from "../../types";
import style from "./InitialsChangeForm.module.css";
import { useAppDispatch } from "../../store/hooks";
import { fetchUpd } from "../../store/userThunkActions";
import { notifySuccess, notifyWarning } from "../../toasters";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function InitialsChangeForm({
  user,
  setActive,
}: {
  user: UserDataType;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const dispatch = useAppDispatch();

  const initialState = {
    firstName: user.name,
  };

    useEffect(() => {
      setInput({
        firstName: user.name,
      });
    }, [user]);

  type ShortUserType = {
    firstName: string;
  };

  const [input, setInput] = useState<ShortUserType>(initialState);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const changeInitials = async (): Promise<void> => {
    const updUser = {
      ...user,
      name: input.firstName,
    };
    try {
      if (!input.firstName) {
        notifyWarning("Вы не можете удалить свое имя");
      } else if (
        input.firstName &&
        !/^[a-zA-Zа-яА-Я0-9]{3,}$/.test(input.firstName)
      ) {
        notifyWarning(
          "Ваше имя должно быть не короче 3 символов и не должно содержать специальных символов."
        );
      } else {
        // await dispatch(fetchUpd(updUser));
        setActive((prev) => !prev);
        notifySuccess("Данные были успешно обновлены.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.wrapper}>
      <h3>ФИО</h3>
      <div className={`${style.form}`}>
        <span>
          Имя
          <Input
            type="text"
            name="firstName"
            onChange={changeHandler}
            value={input.firstName}
          />
        </span>
        <Button onClick={() => void changeInitials()}>
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
}
