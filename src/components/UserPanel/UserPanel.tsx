import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { UserDataType } from "../../types";
import UserCard from "../UserCard/UserCard";
import style from "./UserPanel.module.scss";

export default function UserPanel() {
  const [users, setUsers] = useState<UserDataType[]>([]);

  useLayoutEffect(() => {
    const getUsers = async (): Promise<void> => {
      try {
        axios
          .get(`https://29-t1api.gortem.ru/consumers/all`)
          .then((res) => setUsers(res.data))
          .catch((err) =>
            console.log("Ошибка получения информации о пользователях", err)
          );
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [users]);

  return (
    <div className={style.panel}>
      {users.map((el, index) => (
        <UserCard userId={el.id} key={index} />
      ))}
    </div>
  );
}
