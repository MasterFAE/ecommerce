import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Router from "next/router";

const initialState = {
  id: "",
  name: "",
  email: "",

  image: "",
  loggedIn: false,
  loading: false,
};

//REDO: You need to remove param name from the function,
// all users should be able to see only their information
export const getCurrentUser = createAsyncThunk(
  "user/currentUser",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`/api/user`, { method: "GET" });
      if (response.status == 400) {
        Router.replace("/login");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      const { id, name, civId, image, department, reservation } =
        action.payload;
      state.id = id;
      state.name = name;

      state.loggedIn = true;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state = initialState;
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
