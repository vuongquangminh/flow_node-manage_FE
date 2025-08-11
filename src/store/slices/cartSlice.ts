// counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product_id: number;
  product_name: string;
  image: string;
  price: string;
  size: string;
  color: string;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemCart: (state, action: PayloadAction<CartItem>) => {
      // Redux Toolkit cho phép mutate trực tiếp vì dùng Immer
      state.push(action.payload);
    },
    clearCart: (state) => {
      return (state = []);
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { addItemCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
