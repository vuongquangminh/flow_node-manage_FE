import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: number;
}

const initialState: AuthState = {
    token: 0,

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state) => {
      state.token += 1;
    },
    setAccountLogined: (state) => {
      state.token -= 1;
    },
    removeToken: (state, action: PayloadAction<number>) => {
      state.token += action.payload;
    },
  },
});

export const { setToken, setAccountLogined, removeToken } = authSlice.actions;

export default authSlice.reducer;
