import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
  clearCart,
} from "../../store/slices/cartSlice";
import styles from "./Cart.module.scss";
import Modal from "../../components/Modal/Modal";
import axios, { AxiosError } from "axios";

// Маппинг рус ту eng
const categoryMap: { [key: string]: string } = {
  "МЕРЧ": "MERCH",
  "КАНЦЕЛЯРИЯ": "CHANCELLERY",
  // новые надо согласовать
};

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [modalActive, setModalActive] = useState<boolean>(true);
  const [step, setStep] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "ON_DELIVERY" | "">("");
  const [address, setAddress] = useState<string>("");
  const [finalTotalPrice, setFinalTotalPrice] = useState<number>(0); // Состояние для сохранения итоговой суммы
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    if (cartItems.length > 0) {
      dispatch(clearCart());
    }
  };

  const handleNextStep = () => {
    setFinalTotalPrice(totalPrice);
    setStep((prevStep) => prevStep + 1);
  };

  const handleOrderSubmit = async () => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

    console.log("Проверка userId:", userId);
    if (!userId || typeof userId !== 'string' || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(userId)) {
      console.error("Некорректный userId:", userId);
      return;
    }

    try {
      const promises = cartItems.map((item) => {
        console.log("Проверка productId:", item.id);
        if (!item.id || typeof item.id !== 'string' || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(item.id)) {
          console.error("Некорректный productId:", item.id);
          throw new Error(`Некорректный productId: ${item.id}`);
        }

        const productType = categoryMap[item.category.toUpperCase()] || item.category;

        const payload = {
          consumerId: userId,
          productType: productType,
          productId: item.id,
          count: item.quantity,
        };

        console.log("Отправляемый запрос:", payload);

        return axios.post("https://29-t1api.gortem.ru/carts/", payload);
      });

      await Promise.all(promises);

      const deletePromises = cartItems.map((item) =>
        axios.delete(`https://29-t1api.gortem.ru/carts/${item.cartItemId}`)
      );
      await Promise.all(deletePromises);

      dispatch(clearCart());

      console.log("Заказ успешно оформлен");

      setStep(3);
    } catch (err) {
      const error = err as AxiosError;

      if (error.response) {
        console.error("Ошибка ответа сервера:", error.response.data);
      } else if (error.request) {
        console.error("Запрос не был выполнен:", error.request);
      } else {
        console.error("Произошла ошибка:", error.message);
      }
    }
  };

  return (
    <div className={styles.cart}>
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <ul className={styles.cartItems}>
          {cartItems.map((item, index) => (
            <li key={item.id} className={styles.cartItem}>
              <div>
                <span>
                  {index + 1}. {item.name}
                </span>
                <span> - {item.price}$</span>
              </div>
              <div className={styles.quantityControls}>
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQuantity(item.id))}>
                  +
                </button>
                <button
                  onClick={() => dispatch(removeItemFromCart(item.id))}
                  className={styles.removeButton}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.total}>
        <span>Итоговая сумма: {totalPrice}$</span>
        <button
          className={styles.checkoutButton}
          disabled={cartItems.length === 0}
          onClick={() => setModalActive(false)}
        >
          ОФОРМИТЬ
        </button>
      </div>
      <button
        className={
          cartItems.length === 0
            ? styles.clearCartButtonDisabled
            : styles.clearCartButton
        }
        onClick={handleClearCart}
        disabled={cartItems.length === 0}
      >
        Очистить корзину
      </button>

      <Modal active={modalActive} setActive={setModalActive}>
        <>
          {step === 1 && (
            <div>
              <h3>Подтверждение заказа</h3>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={item.id}>
                    {index + 1}. {item.name} - {item.quantity} шт. -{" "}
                    {item.price * item.quantity}$
                  </li>
                ))}
              </ul>
              <div>Общая сумма: {totalPrice}$ </div>
              
              <button onClick={handleNextStep}>Далее</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3>Способ оплаты</h3>
              <div>
                <button
                  onClick={() => setPaymentMethod("ONLINE")}
                  className={paymentMethod === "ONLINE" ? styles.selected : ""}
                >
                  Онлайн
                </button>
                <button
                  onClick={() => setPaymentMethod("ON_DELIVERY")}
                  className={
                    paymentMethod === "ON_DELIVERY" ? styles.selected : ""
                  }
                >
                  При получении
                </button>
              </div>
              <div>
                <label>Адрес доставки</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button
                onClick={handleOrderSubmit}
                disabled={!paymentMethod || !address}
              >
                Оплатить
              </button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3>Заказ оформлен!</h3>
              <p>С вашего счета списано {finalTotalPrice}$</p> {}
            </div>
          )}
        </>
      </Modal>
    </div>
  );
};

export default Cart;