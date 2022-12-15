import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ItemInCart, Product } from "@prisma/client";

export type CartItemResponse = ItemInCart & { item: Product };

type cartSlice = {
  total: number;
  items: CartItemResponse[];
  deal: number;
  isLoading: boolean;
};

const initialState: cartSlice = {
  total: 0,
  items: [],
  deal: 0,
  isLoading: true,
};

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

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (data: { itemId: number; quantity: number }, thunkAPI) => {
    try {
      const response = await fetch(`/api/cart/${data.itemId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ quantity: data.quantity }),
      });

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async (id: number, thunkAPI) => {
    try {
      const response = await fetch(`/api/cart/${id}`, { method: "DELETE" });
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    localGetItems(state) {
      state.items = JSON.parse(localStorage.getItem("cart")) || [];
      state.total = calculateTotal(state.items).total;
    },
    addItem(state, action: PayloadAction<CartItemResponse>) {
      state.items = [...state.items, action.payload];
      state.total = calculateTotal(state.items).total;
    },
    localAddItem(state, action: PayloadAction<CartItemResponse>) {
      state.items = [...state.items, action.payload];
      state.total = calculateTotal(state.items).total;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    localUpdateItem(state, action) {
      state.items = state.items.map((e) => {
        if (e.id === action.payload.id) {
          e.quantity += action.payload.quantity;
        }
        return e;
      });
      state.total = calculateTotal(state.items).total;
    },
    localDeleteItem(state, action) {
      state.items = state.items.filter((e) => e.itemId !== action.payload.id);
      state.total = calculateTotal(state.items).total;
    },
    clearCart(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.items = state.items.map((e) => {
        if (e.itemId !== action.payload.itemId) return e;
        e.quantity = action.payload.quantity;
        state.total += e.quantity * e.item.price;
        return e;
      });
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.items = action.payload.items;
      let { total, deal } = calculateTotal(state.items);
      state.total = total;
      // state.total = deal;
      state.isLoading = false;
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.items = state.items.filter((e) => e.itemId !== action.payload.id);
      let { total, deal } = calculateTotal(state.items);
      state.total = total;
      // state.total = deal;
    });
  },
});

const calculateTotal = (items) => {
  console.log(items);
  let total = 0;
  let deal = 0;
  items.forEach((element) => {
    if (element.item) {
      total += element.item.price * element.quantity;
      deal += (element.item.price * element.quantity * element.item.deal) / 100;
    } else {
      total += element.price * element.quantity;
      deal += (element.price * element.quantity * element.deal) / 100;
    }
  });
  return { total, deal };
};

export const {
  clearCart,
  addItem,
  localAddItem,
  localDeleteItem,
  localUpdateItem,
  localGetItems,
} = cartSlice.actions;
export default cartSlice.reducer;
