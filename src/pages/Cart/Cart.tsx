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
import axios from "axios";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "ON_DELIVERY" | "">("");
  const [address, setAddress] = useState<string>("");

  const handleClearCart = () => {
    if (cartItems.length > 0) {
      dispatch(clearCart());
    }
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleOrderSubmit = async () => {
    const consumerId = "6829157f-3d5e-426d-959a-c6075918c91f";

    try {
      const promises = cartItems.map((item) =>
        axios.post("/carts/", {
          consumerId,
          productType: item.category.toUpperCase(),
          productId: item.id,
          count: item.quantity,
        })
      );

      await Promise.all(promises);
      console.log("Заказ успешно оформлен");

      
      dispatch(clearCart());

      // (заказ оформлен)
      setStep(3);
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
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
          onClick={() => setModalActive(true)}
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
              <div>Общая сумма: {totalPrice}$</div>
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
              <p>С вашего счета списано {totalPrice}$</p>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
};

export default Cart;
