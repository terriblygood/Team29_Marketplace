import { Middleware } from '@reduxjs/toolkit';

const saveCartToLocalStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const cartItems = store.getState().cart.items;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return result;
};

export default saveCartToLocalStorage;
