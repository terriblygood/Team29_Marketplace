import React, { ChangeEvent, useEffect, useState } from "react";
import { OrderType, UserDataType } from "../../types";
import axios from "axios";
import style from "./OrderCard.module.scss";
import Button from "../Button/Button";
import { notifySuccess, notifyWarning } from "../../toasters";

export default function OrderCard({ orderId }: { orderId: string }) {
  const initialOrder = {
    id: "",
    consumerId: "",
    productType: "",
    productId: "",
    status: "",
    orderDate: "",
    count: 0,
    price: 0,
    title: "",
  };

  const initialUser = {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    coins: 0,
  };

  const [user, setUser] = useState<UserDataType>(initialUser);
  const [order, setOrder] = useState<OrderType>(initialOrder);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://29-t1api.gortem.ru/orders/${orderId}`
        );
        setOrder(response.data);
        await fetchUser(response.data.consumerId);
      } catch (error) {
        console.error("Ошибка получения информации о заказе", error);
      }
    };

    const fetchUser = async (consumerId: string) => {
      try {
        const response = await axios.get(
          `https://29-t1api.gortem.ru/consumers/${consumerId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Ошибка получения информации о пользователе", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setOrder((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };

  const deleteOrder = async () => {
    try {
      const response = await axios.delete(
        `https://29-t1api.gortem.ru/orders/${orderId}`
      );
      notifySuccess("Заказ успешно удален.");
    } catch (error) {
      console.error("Ошибка удаления заказа", error);
      notifyWarning("Произошла ошибка при удалении заказа.");
    }
  };

  const updateOrder = async () => {
    try {
      const response = await axios.post(
        `https://29-t1api.gortem.ru/orders/${orderId}`,
        { status: order.status }
      );
      notifySuccess("Статус заказа обновлен.");
    } catch (error) {
      console.error("Ошибка обновления заказа", error);
      notifyWarning("Произошла ошибка при обновлении заказа.");
    }
  };

  return (
    <div className={style.card}>
      <span>Номер заказа: {order.id}</span>
      <span>Имя пользователя: {user.name}</span>
      <span>Почта пользователя: {user.email}</span>
      <label htmlFor="status" className={style.specialLabel}>
        Статус заказа
        <select name="status" onChange={changeHandler} value={order.status}>
          <option value="CREATED">Создан</option>
          <option value="ACCEPTED">Принят</option>
          <option value="CANCELED">Отменен</option>
        </select>
      </label>
      <span>Стоимость заказа: {order.price} к.</span>
      <Button color="blue" onClick={updateOrder}>
        Обновить статус
      </Button>
      <Button color="danger" onClick={deleteOrder}>
        Удалить заказ
      </Button>
    </div>
  );
}
