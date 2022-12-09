import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Router from "next/router";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
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
      const { id, firstName, lastName, image, email, phoneNumber } =
        action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phoneNumber = phoneNumber;

      state.loggedIn = true;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state = initialState;
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
