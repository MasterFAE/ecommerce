import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";
import { Product } from "@prisma/client";

type cartSlice = { total: number; dine: Product[] };

const initialState: cartSlice = { total: 0, dine: [] };

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`/api/cart`, { method: "GET" });

      let result = await response.json();
      if (response.ok && !result) {
        result = initialState;
      }
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state = initialState;
    },
    deleteItem(state, action: PayloadAction<{ id: number }>) {
      state.dine = state.dine.filter((e) => e.id !== action.payload.id);
      state.total = 0;
      state.dine.forEach((element) => {
        state.total += element.cost;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.dine = action.payload.dine;
      state.total = 0;
      state.dine.forEach((element) => {
        state.total += element.cost;
      });
      // state.total = action.payload.total;
    });
  },
});

export const { clearCart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
