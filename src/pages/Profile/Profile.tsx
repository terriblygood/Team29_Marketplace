import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Profile.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { UserDataType, UserType } from "../../types";
import { fetchAuth } from "../../store/userThunkActions";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import ForgetPassForm from "../../components/ForgetPassForm/ForgetPassForm";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyWarning } from "../../toasters";
import Input from "../../components/Input/Input";
import eyeIcon from "../../assets/eye-outline.svg";
import closeEyeIcon from "../../assets/eye-off-outline.svg";

export default function Auth(): JSX.Element {
  const initialState = {
    id: "",
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    coins: 0,
  };
  const [inputs, setInputs] = useState<UserType>(initialState);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const authHandler = (): void => {
    setIsLogin((prev) => !prev);
    setInputs(initialState);
  };

  const addUserHandler = async (): Promise<void> => {
    //! Нужно починить после того, как заработает эндпоинт для проверки почты

    // const checkMail = await axios.get(
    //   `https://29-t1api.gortem.ru/consumers/email/?e=${inputs.email}`
    // );

    // console.log(checkMail.data, 'Я результат checkmail');
    // const checkPass = await axios.post(
    //   ``,
    //   {
    //     email: inputs.email,
    //     password: inputs.password,
    //   },
    //   {
    //     withCredentials: true,
    //   }
    // );

    try {
      if (!inputs.name && !isLogin) {
        notifyWarning("Пожалуйста, введите Ваше имя.");
      } else if (!isLogin && !/^[a-zA-Zа-яА-Я0-9]{3,}$/.test(inputs.name)) {
        notifyWarning(
          "Ваше имя должно быть не короче 3 символов и не должно содержать специальных символов."
        );
      } else if (!inputs.email) {
        notifyWarning("Пожалуйста, введите Вашу почту.");
      } else if (
        inputs.email &&
        !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
          inputs.email
        )
      ) {
        notifyWarning("Неверный формат почты.");
      } else if (!inputs.password && !isLogin) {
        notifyWarning("Пожалуйста, придумайте пароль.");
      } else if (
        !isLogin &&
        inputs.password &&
        !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          inputs.password
        )
      ) {
        notifyWarning(
          "Пароль должен быть не менее 8 символов длинной, содержать в себе строчные и заглавные буквы, минимум одну цифру и какой-либо из следующих символов: #?!@$%^&*-"
        );
      } else if (!inputs.password && isLogin) {
        notifyWarning("Пожалуйста, введите пароль.");
        // } else if (!isLogin && checkMail.data) {
        notifyWarning("Пользователь с такой почтой уже существует.");
        // } else if (isLogin && !checkMail.data) {
        notifyWarning("Пользователя с такой почтой не существует.");
        // } else if (isLogin && checkMail.data && !checkPass.data) {
        notifyWarning("Неверный пароль.");
      } else {
        if (!isLogin) {
          //! тут происходит регистрация
          await dispatch(fetchAuth({ data: inputs }));
        } else {
          //! тут нужно будет дописать логин
          // await dispatch(
          //   fetchAuth({ data: inputs })
          // );
        }
        navigate("/");
        if (isLogin) {
          notifySuccess("C возвращением!");
        } else if (!isLogin) {
          notifySuccess("Благодарим за регистрацию!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.inputs}>
          {!isLogin && (
            <Input
              onChange={changeHandler}
              name="name"
              type="text"
              required
              value={inputs.name}
              placeholder="Имя"
            />
          )}
          <Input
            onChange={changeHandler}
            name="email"
            type="text"
            required
            value={inputs.email}
            placeholder="Почтовый адрес"
          />
          <div className={styles.pass}>
            <Input
              onChange={changeHandler}
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={inputs.password}
              placeholder="Пароль"
            />
            <Button link onClick={() => void setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <img className={styles.icon} src={eyeIcon} alt="svg" />
              ) : (
                <img className={styles.icon} src={closeEyeIcon} alt="svg" />
              )}
            </Button>
          </div>
          {isLogin && (
            <Button link onClick={() => setModalActive((prev) => !prev)}>
              Забыли пароль?
            </Button>
          )}
        </div>
        <div className={styles.btns}>
          <Button color="blue" onClick={() => void addUserHandler()}>
            {isLogin ? "Авторизоваться" : "Зарегистрироваться"}
          </Button>
          <Button link onClick={() => void authHandler()}>
            {isLogin ? "Зарегистрироваться" : "Уже зарегистрированы?"}
          </Button>
        </div>
        <Modal active={modalActive} setActive={setModalActive}>
          <ForgetPassForm
            setActive={setModalActive}
            inputs={inputs}
            modalActive={modalActive}
          />
        </Modal>
      </form>
    </div>
  );
}
