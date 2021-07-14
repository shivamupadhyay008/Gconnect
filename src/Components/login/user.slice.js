import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: {
    isUserLoggedIn: false,
  },
  status: "idle",
  error: null,
};

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://gConnect-backend.shivam008.repl.co/auth/login",
        credentials,
        {
          headers: {
            authentication: credentials.token,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://gConnect-backend.shivam008.repl.co/auth/signup",
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
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
      console.log(action)
      state.userData = { ...state.userData, ...action.payload.user };
      const token = localStorage.getItem("G_CONNECT_TOKEN");
      console.log(token);
      if (!token) {
        localStorage.setItem("G_CONNECT_TOKEN", action.payload.token);
      }
    },
    [userLogin.rejected]: (state, action) => {
      state.status = "error";
      localStorage.removeItem("G_CONNECT_TOKEN");
      state.error = action.error.message;
    },
    [userSignup.pending]: (state, action) => {
      state.status = "loading";
    },
    [userSignup.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.userData = action.payload.users
    },
    [userSignup.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
