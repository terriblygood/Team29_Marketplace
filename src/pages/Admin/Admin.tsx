import React, { useState } from "react";
import axios from "axios";
import { UserDataType } from "../../types";
import UserCard from "../../components/UserCard/UserCard";
import UserPanel from "../../components/UserPanel/UserPanel";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import AddThingForm from "../../components/AddThingForm/AddThingForm";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";

export default function Admin() {
  const [modalActive, setModalActive] = useState<boolean>(true);

  return (
    <>
      <h1>Пользователи</h1>
      <Accordion>
        <AccordionItem header="Список пользователей">
          <UserPanel />
        </AccordionItem>
      </Accordion>
      <h1>Товары</h1>
      <Button color="blue" onClick={() => setModalActive((prev) => !prev)}>
        Добавить товар
      </Button>
      <Modal active={modalActive} setActive={setModalActive}>
        <AddThingForm setActive={setModalActive} />
      </Modal>
      <h1>Заказы</h1>
    </>
  );
}
