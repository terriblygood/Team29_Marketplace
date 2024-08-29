import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the CartItem interface to include cartItemId for server interactions
interface CartItem {
  id: number;         // Product ID
  name: string;
  price: number;
  quantity: number;
  category: string;
  cartItemId?: string; // Optional field for server-side ID
}

interface CartState {
  items: CartItem[];
}

// Retrieve initial cart items from localStorage
const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart, setting initial quantity to 1
    addItemToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1, cartItemId: action.payload.cartItemId });
      }
      // Persist cart items in localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    // Remove item from cart
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Persist cart items in localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    // Increase quantity of an item in the cart
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
      // Persist cart items in localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    // Decrease quantity of an item in the cart
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item) {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
      // Persist cart items in localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    // Clear all items from the cart
    clearCart(state) {
      state.items = [];
      // Clear cart items from localStorage
      localStorage.removeItem('cartItems');
    },
    // Update cart item quantity from server response
    updateCartItem(state, action: PayloadAction<CartItem>) {
      const updatedItem = action.payload;
      const index = state.items.findIndex(item => item.cartItemId === updatedItem.cartItemId);
      if (index !== -1) {
        state.items[index] = updatedItem;
      }
      // Persist cart items in localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
  },
});

// Export actions
export const { addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart, updateCartItem } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;