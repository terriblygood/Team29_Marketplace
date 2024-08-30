import React, { useEffect, useState } from "react";
import { OrderType } from "../../types";
import axios from "axios";
import OrderCard from "../OrderCard/OrderCard";
import style from "./OrderPanel.module.scss";

export default function OrderPanel() {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const getOrders = async (): Promise<void> => {
      try {
        axios
          .get(`https://29-t1api.gortem.ru/orders/all`)
          .then((res) => setOrders(res.data))
          .catch((err) =>
            console.log("Ошибка получения информации о заказах", err)
          );
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [orders]);
  return (
    <div className={style.panel}>
      {orders.map((el, index) => (
        <OrderCard orderId={el.id} />
      ))}
    </div>
  );
}
