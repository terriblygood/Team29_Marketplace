import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { UserDataType } from "../../types";
import style from "./UserCard.module.scss";
import Button from "../Button/Button";
import { apiUrl } from "../../App";

export default function UserCard({ userId }: { userId: string }) {
  useLayoutEffect(() => {}, []);

  const initialUser = {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    coins: 0,
  };

  const [user, setUser] = useState<UserDataType>(initialUser);

  useLayoutEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        axios
          .get(`${apiUrl}/consumers/${userId}`)
          .then((res) => setUser(res.data))
          .catch((err) =>
            console.log("Ошибка получения информации о пользователе", err)
          );
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const deleteUser = async (): Promise<void> => {
    try {
      axios
        .delete(`${apiUrl}/consumers/${userId}`)
        // .then((res) => setUser(res.data))
        .catch((err) => console.log("Ошибка удаления пользователя", err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.card}>
      {user.name ? <span>Имя:{user.name}</span> : <span>Имя не указано</span>}
      {user.email ? (
        <span>Почта:{user.email}</span>
      ) : (
        <span>Почта не указана</span>
      )}
      {user.phoneNumber ? (
        <span>Номер телефона:{user.name}</span>
      ) : (
        <span>Номер телефона не указан</span>
      )}
      <span>Баланс: {user.coins} коинов</span>
      <Button onClick={deleteUser} color="danger">
        Удалить пользователя
      </Button>
    </div>
  );
}
