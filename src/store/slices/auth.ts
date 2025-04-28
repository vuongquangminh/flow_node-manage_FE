import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
    token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{token: string}>) => {
      state.token = action.payload.token;
    },
    removeToken: (state, action: PayloadAction<number>) => {
      state.token += action.payload;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
