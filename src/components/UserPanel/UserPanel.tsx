import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { UserDataType } from "../../types";
import UserCard from "../UserCard/UserCard";
import style from "./UserPanel.module.scss";
import { apiUrl } from "../../App";

export default function UserPanel() {
  const [users, setUsers] = useState<UserDataType[]>([]);

  useLayoutEffect(() => {
    const getUsers = async (): Promise<void> => {
      try {
        axios
          .get(`${apiUrl}/consumers/all`)
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
      <h1>Всего пользователей: {users.length}</h1>
      {users.map((el, index) => (
        <UserCard userId={el.id} key={index} />
      ))}
    </div>
  );
}
