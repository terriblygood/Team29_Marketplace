import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  date: string;
  items: OrderItem[];
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
  },
});

export const { setOrders, addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;