import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserDataType } from "../../types";
import UserCard from "../../components/UserCard/UserCard";
import UserPanel from "../../components/UserPanel/UserPanel";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

export default function Admin() {
  const [modalActive, setModalActive] = useState<boolean>(true);

  return (
    <>
      <h1>Пользователи</h1>
      <UserPanel />
      <h1>Товары</h1>
      <Button color="blue" onClick={() => setModalActive((prev) => !prev)}>
        Добавить товар
      </Button>
      <Modal active={modalActive} setActive={setModalActive}>
        <p>Доабвление товара</p>
      </Modal>
      <h1>Заказы</h1>
    </>
  );
}
