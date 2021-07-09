import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userData: {
    isUserLoggedIn: false,
  },
  status: "idle",
  error: null,
};

export const userLogin = createAsyncThunk("user/userLogin", async (name) => {
  console.log("\n\n\n*********name is ssss************\n\n\n\n \n", name);
  debugger;
  const response = await axios.post(
    "https://gConnect-backend.shivam008.repl.co/post/getallposts",
    { heelo: "ss" }
  );
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.status = "loading";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.userData.isUserLoggedIn = true;
    },
    [userLogin.error]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;