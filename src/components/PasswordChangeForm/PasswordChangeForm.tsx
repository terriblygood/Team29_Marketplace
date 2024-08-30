import React, { useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import style from "./PasswordChangeForm.module.scss";
import type { UserDataType, UserType } from "../../types";
import { notifySuccess, notifyWarning } from "../../toasters";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function PasswordChangeForm({
  user,
  setActive,
}: {
  user: UserDataType;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  type PasswordChangeType = {
    oldPassword: string;
    newPassword: string;
    repitePassword: string;
  };

  const initialState = {
    oldPassword: "",
    newPassword: "",
    repitePassword: "",
  };

  const [input, setInput] = useState<PasswordChangeType>(initialState);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // const changePass = async (): Promise<void> => {
  // const checkPass = await axios.post(
  //   `${import.meta.env.VITE_API}/v1/auth/checkPass`,
  //   {
  //     email: user.email,
  //     password: input.oldPassword,
  //   },
  //   {
  //     withCredentials: true,
  //   }
  // );

  //   try {
  //     if (!input.oldPassword || !input.oldPassword || !input.oldPassword) {
  //       notifyWarning("Пожалуйста, заполните все поля.");
  //     // } else if (!checkPass.data) {
  //       notifyWarning("Введенный старый пароль неверен.");
  //     } else if (
  //       !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
  //         input.newPassword
  //       )
  //     ) {
  //       notifyWarning(
  //         "Новый пароль должен быть не менее 8 символов длинной, содержать в себе строчные и заглавные буквы, минимум одну цифру и какой-либо из следующих символов: #?!@$%^&*-"
  //       );
  //     } else if (input.newPassword !== input.repitePassword) {
  //       notifyWarning("Введенные пароли не совпадают.");
  //     } else if (input.newPassword === input.repitePassword) {
  //       axios
  //         .put<PasswordChangeType, AxiosResponse<UserType>>(
  //           `${import.meta.env.VITE_API}/v1/user/passUpd`,
  //           input,
  //           { withCredentials: true }
  //         )
  //         .then((res) => console.log(res))
  //         .then(() => setActive((prev) => !prev))
  //         .then(() => notifySuccess("Пароль был успешно изменен."))
  //         .catch((err) => console.log(err));
  //     } else {
  //       console.log("Пароли не совпадают");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className={style.wrapper}>
      <div className={`${style.form}`}>
        <h3>Изменение пароля</h3>
        <span>
          Старый пароль
          <Input
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            onChange={changeHandler}
            value={input.oldPassword}
          />
        </span>
        <span>
          Новый пароль пароль
          <Input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            onChange={changeHandler}
            value={input.newPassword}
          />
        </span>
        <span>
          Повторите пароль
          <Input
            type={showPassword ? "text" : "password"}
            name="repitePassword"
            onChange={changeHandler}
            value={input.repitePassword}
          />
        </span>
        <Button onClick={() => void setShowPassword((prev) => !prev)} color="blue">
          Показать пароли
        </Button>
        <Button
          color="blue"
        // onClick={() => void changePass()}
        >
          Сохранить новый пароль
        </Button>
      </div>
    </div>
  );
}
