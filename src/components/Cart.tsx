import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { increaseQuantity, decreaseQuantity, removeItemFromCart, clearCart } from '../store/slices/cartSlice';
import styles from '../styles/Cart.module.css';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleClearCart = () => {
    if (cartItems.length > 0) {
      dispatch(clearCart());
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
                <span>{index + 1}. {item.name}</span>
                <span> - {item.price}$</span>
              </div>
              <div className={styles.quantityControls}>
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                <button onClick={() => dispatch(removeItemFromCart(item.id))} className={styles.removeButton}>Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.total}>
        <span>Итоговая сумма: {totalPrice}$</span>
        <button className={styles.checkoutButton} disabled={cartItems.length === 0}>
          ОФОРМИТЬ
        </button>
      </div>
      <button
        className={cartItems.length === 0 ? styles.clearCartButtonDisabled : styles.clearCartButton}
        onClick={handleClearCart}
        disabled={cartItems.length === 0}
      >
        Очистить корзину
      </button>
    </div>
  );
};

export default Cart;