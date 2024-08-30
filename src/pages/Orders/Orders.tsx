import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Orders.module.scss";
import { apiUrl } from "../../App";

interface OrderItem {
  id: string;
  consumerId: string;
  productType: string;
  productId: string;
  status: string;
  orderDate: string;
  count: number;
  price: number;
  title: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/orders/products/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className={styles.ordersPage}>
      <h1>Мои заказы</h1>
      {orders.length === 0 ? (
        <p>У вас нет заказов.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <h2>Заказ №{order.id}</h2>
              <p>Дата: {order.orderDate}</p>
              <ul>
                <li>
                  <p>Продукт: {order.title}</p>
                  <p>Количество: {order.count}</p>
                  <p>Цена: {order.price}</p>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;