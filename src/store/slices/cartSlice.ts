// counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem  {
  product_id: number;
  size: string;
  color: string;
  quantity: number;
  address: string;
  phone: string;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartItem>) => {
      console.log("action: ", action);
      // Redux Toolkit cho phép mutate trực tiếp vì dùng Immer
      state.push(action.payload);
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
