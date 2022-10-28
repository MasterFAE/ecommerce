import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";
import { ItemInCart, Product } from "@prisma/client";

type cartSlice = { total: number; items: Product[] };

const initialState: cartSlice = { total: 0, items: [] };

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
    addItem(state, action: PayloadAction<Product>) {
      console.log("triggered");
      console.log(action.payload);
      state.items = [...state.items, action.payload];
      state.total += action.payload.price;
    },
    updateItemQuantity(state, action: PayloadAction<Product>) {},
    clearCart(state) {
      state = initialState;
    },
    deleteItem(state, action: PayloadAction<{ id: number }>) {
      state.items = state.items.filter((e) => e.id !== action.payload.id);
      state.total = 0;
      state.items.forEach((element) => {
        state.total += element.price;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.total = 0;
      state.items.forEach((element) => {
        state.total += element.price;
      });
      // state.total = action.payload.total;
    });
  },
});

export const { clearCart, deleteItem, addItem, updateItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
