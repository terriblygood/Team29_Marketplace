import React, { useState } from "react";
import UserPanel from "../../components/UserPanel/UserPanel";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import AddThingForm from "../../components/AddThingForm/AddThingForm";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import OrderPanel from "../../components/OrderPanel/OrderPanel";
import style from "./Admin.module.scss";
import { useAppDispatch } from "../../store/hooks";
import { UserType } from "../../types";
import { notifySuccess, notifyWarning } from "../../toasters";
import Input from "../../components/Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [modalActive, setModalActive] = useState<boolean>(true);
  const [modalActive2, setModalActive2] = useState<boolean>(true);
  const navigate = useNavigate();

  const initialState = {
    id: "",
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    coins: 0,
  };
  const [inputs, setInputs] = useState<UserType>(initialState);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const authHandler = (): void => {
    // setIsLogin((prev) => !prev);
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
          // await dispatch(fetchAuth({ data: inputs }));
          const response = await axios.post<UserType>(
            `https://29-t1api.gortem.ru/consumers/`,
            inputs
          );
        } else {
          //! тут нужно будет дописать логин
          // await dispatch(
          //   fetchAuth({ data: inputs })
          // );
        }
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

  const adminOn = async (): Promise<void> => {
    try {
      localStorage.setItem("isAdmin", "true");
      notifySuccess("Режим администратора активирован.");
      navigate("/");
    } catch (error) {
      console.log(error);
      notifyWarning("Произошла ошибка. Попробуйте ещё раз.");
    }
  };

    const adminOff = async (): Promise<void> => {
      try {
        localStorage.setItem("isAdmin", "false");
        notifySuccess("Режим администратора активирован.");
        navigate("/");
      } catch (error) {
        console.log(error);
        notifyWarning("Произошла ошибка. Попробуйте ещё раз.");
      }
    };

  return (
    <div className={style.adminPage}>
      <div className={style.container}>
        <h1>Пользователи</h1>
        <Accordion>
          <AccordionItem header="Список пользователей">
            <UserPanel />
          </AccordionItem>
        </Accordion>
        <div className={style.line}></div>
        <Button color="blue" onClick={() => setModalActive2((prev) => !prev)}>
          Добавить пользователя
        </Button>
        <Modal active={modalActive2} setActive={setModalActive2}>
          <div className={style.container}>
            <form className={style.form}>
              <div className={style.inputs}>
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
                <div className={style.pass}>
                  <Input
                    onChange={changeHandler}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={inputs.password}
                    placeholder="Пароль"
                  />
                  {/* <Button
                  link
                  onClick={() => void setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <img className={styles.icon} src={eyeIcon} alt="svg" />
                  ) : (
                    <img className={styles.icon} src={closeEyeIcon} alt="svg" />
                  )}
                </Button> */}
                </div>
                {isLogin && (
                  <Button link onClick={() => setModalActive((prev) => !prev)}>
                    Забыли пароль?
                  </Button>
                )}
              </div>
              <div className={style.btns}>
                <Button color="blue" onClick={() => void addUserHandler()}>
                  {isLogin ? "Авторизоваться" : "Добавить пользователя"}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
        <h1>Товары</h1>
        <Button color="blue" onClick={() => setModalActive((prev) => !prev)}>
          Добавить товар
        </Button>
        <Modal active={modalActive} setActive={setModalActive}>
          <AddThingForm setActive={setModalActive} />
        </Modal>
        <h1>Заказы</h1>
        <Accordion>
          <AccordionItem header="Заказы">
            <OrderPanel />
          </AccordionItem>
        </Accordion>
        <div className={style.line}></div>
        <Button onClick={() => void adminOn()} color="blue">
          Режим админа
        </Button>
        <div className={style.line}></div>
        <Button onClick={() => void adminOff()} color="blue">
          Режим пользователя
        </Button>
      </div>
    </div>
  );
}
