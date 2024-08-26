import React, { useEffect, useState } from "react";
import type { UserType } from "../../types";
import Avatar from "../../components/Avatar/Avatar";
import SideBar from "../../components/SideBar/SideBar";
import Button from "../../components/Button/Button";
import { notifySuccess, notifyWarning } from "../../toasters";
import axios from "axios";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Modal from "../../components/Modal/Modal";
import PasswordChangeForm from "../../components/PasswordChangeForm/PasswordChangeForm";
import AvatarChangeForm from "../../components/AvatarChangeForm/AvatarChangeForm";
import MailChahgeForm from "../../components/MailChahgeForm/MailChahgeForm";
import PhoneChahgeForm from "../../components/PhoneChangeForm/PhoneChangeForm";
import InitialsChangeForm from "../../components/InitialsChangeForm/InitialsChangeForm";
import {
  fetchLogout,
  fetchUpd,
} from "../../store/userThunkActions";
import closeIcon from "../../assets/close-circle-outline.svg";
import closeIconFill from "../../assets/close-circle-outline-fill.svg";

export default function Account({
  isOpen,
  setlk,
}: {
  isOpen: boolean;
  setlk: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [modalActive1, setModalActive1] = useState<boolean>(true);
  const [modalActive2, setModalActive2] = useState<boolean>(true);
  const [modalActive3, setModalActive3] = useState<boolean>(true);
  const [modalActive4, setModalActive4] = useState<boolean>(true);
  const [modalActive5, setModalActive5] = useState<boolean>(true);
  const [modalActive6, setModalActive6] = useState<boolean>(true);
  const [modalActive7, setModalActive7] = useState<boolean>(true);

  const user = useAppSelector((store) => store.user);


  //! Загрушка для тестирования

  // const user = {
  //   id: 1,
  //   firstName: "Ivan",
  //   middleName: "",
  //   lastName: "Ivanov",
  //   email: "email",
  //   phone: "phone",
  //   avatarUrl:
  //     "https://baldezh.top/uploads/posts/2021-07/1627505272_53-funart-pro-p-korgi-vzroslii-zhivotnie-krasivo-foto-61.jpg",
  // };

  const deleteAvatar = async (): Promise<void> => {
    //   try {
    //     const response = await axios.get<UserType>(
    //       `${import.meta.env.VITE_API}/v1/user/deleteAvatar`,
    //       { withCredentials: true }
    //     );
    //     console.log(response);
    //     await dispatch(fetchUpd(response.data));
    //     notifySuccess("Аватар успешно удален.");
    //   } catch (error) {
    //     console.log(error);
    //     notifyWarning("Не удалось удалить аватар.");
    //   }
  };

  const logOutHandler = async (): Promise<void> => {
    await dispatch(fetchLogout());
    navigate("/");
    setlk((prev) => !prev);
  };

  return (
    <>
      <div className={clsx(styles.menu, isOpen && styles.open)}>
        <button
          className={clsx(styles.close, styles.link)}
          type="button"
          onClick={() => setlk((prev) => !prev)}
        >
          <img className={styles.icon} src={closeIcon} alt="svg" />
        </button>
        <SideBar>
          <div className={styles.center}>
            <Button link onClick={() => setModalActive1((prev) => !prev)}>
              <Avatar
                size={14}
                // src={`${import.meta.env.VITE_AVATARS}/${user.avatarUrl}`}
                letter={user.name[0]}
              />
            </Button>
            {/* {user.avatarUrl && (
              <>
                <div className={styles.delAvatar}>
                  <Button link onClick={() => void deleteAvatar()}>
                    <img
                      className={styles.icon}
                      src={closeIconFill}
                      alt="svg"
                    />
                  </Button>
                </div>
              </>
            )} */}
          </div>
          <Modal active={modalActive1} setActive={setModalActive1}>
            <AvatarChangeForm setActive={setModalActive1} />
          </Modal>
          {user.name ? (
            <>
              {/* <span> */}
              {/* </span> */}
              <Button link onClick={() => setModalActive2((prev) => !prev)}>
                {user?.name}
                {/* Изменить ФИО */}
              </Button>
            </>
          ) : (
            <>
              {/* <span>
                ФИО: {user?.lastName} {user?.middleName} {user?.firstName}
              </span> */}
              <Button link onClick={() => setModalActive2((prev) => !prev)}>
                {user?.name}
                {/* Дополнить */}
              </Button>
            </>
          )}{" "}
          <Modal active={modalActive2} setActive={setModalActive2}>
            <InitialsChangeForm user={user} setActive={setModalActive2} />
          </Modal>
          {/* <span>
            Почта: {user?.email}
          </span> */}
          <Button link onClick={() => setModalActive3((prev) => !prev)}>
            {user?.email}
            {/* Изменить почту */}
          </Button>
          <Modal active={modalActive3} setActive={setModalActive3}>
            <MailChahgeForm user={user} setActive={setModalActive3} />
          </Modal>
          {user.phoneNumber ? (
            <>
              {/* <span>Телефон: {user?.phone}</span> */}
              <Button link onClick={() => setModalActive4((prev) => !prev)}>
                {user?.phoneNumber}
              </Button>
            </>
          ) : (
            <>
              <Button link onClick={() => setModalActive4((prev) => !prev)}>
                Добавить телефон
              </Button>
            </>
          )}
          <Modal active={modalActive4} setActive={setModalActive4}>
            <PhoneChahgeForm user={user} setActive={setModalActive4} />
          </Modal>
          <Button onClick={() => setModalActive6((prev) => !prev)}>
            Изменить пароль
          </Button>
          <Button onClick={() => void logOutHandler()}>Выйти</Button>
          <Modal active={modalActive6} setActive={setModalActive6}>
            <PasswordChangeForm user={user} setActive={setModalActive6} />
          </Modal>
        </SideBar>
      </div>
      {isOpen && (
        <div
          onClick={() => setlk((prev) => !prev)}
          className={styles.menuBackdrop}
        />
      )}
    </>
  );
}
