import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import type { UserDataType, UserType } from "../../types";
import style from "./MailChahgeForm.module.css";
import { useAppDispatch } from "../../store/hooks";
import { fetchUpd } from "../../store/userThunkActions";
import { notifySuccess, notifyWarning } from "../../toasters";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function MailChahgeForm({
  user,
  setActive,
}: {
  user: UserDataType;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const dispatch = useAppDispatch();

  type DataType = {
    email: string;
  };

  useEffect(() => {
    setInput({
      email: user.email,
    });
  }, [user]);

  const initialState = {
    email: user.email,
  };

  const [input, setInput] = useState<DataType>(initialState);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const changeEmail = async (): Promise<void> => {
    // const checkMail = await axios.post(
    //   `${import.meta.env.VITE_API}/v1/auth/checkmail`,
    //   { email: input.email },
    //   {
    //     withCredentials: true,
    //   }
    // );

    const updUser = {
      ...user,
      email: input.email,
    };
    try {
      if (!input.email) {
        notifyWarning("Вы не можете удалить свою почту.");
      } else if (
        input.email &&
        !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
          input.email
        )
      ) {
        notifyWarning("Неверный формат почты.");
        // } else if (checkMail.data && user.email !== input.email) {
        notifyWarning("Данная почта уже используется.");
      } else {
        // await dispatch(fetchUpd(updUser));
        setActive((prev) => !prev);
        notifySuccess("Почтовый адрес был успешно изменен.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={`${style.form}`}>
        <h3>Почта</h3>
        <Input
          type="text"
          name="email"
          onChange={changeHandler}
          value={input.email}
        />
        <Button onClick={() => void changeEmail()}>Сохранить почту</Button>
      </div>
    </div>
  );
}
