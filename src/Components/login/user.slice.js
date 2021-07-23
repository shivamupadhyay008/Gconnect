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
      console.log("its errro", error);
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFollowing: (state, action) => {
      state.userData.following = action.payload;
    },
    updateUsers: (state, action) => {
      state.userData.image = action.payload.image;
      state.userData.about = action.payload.about;
    },
    userLogout: (state, action) => {
      state.userData.isUserLoggedIn=false
      localStorage.removeItem("G_CONNECT_TOKEN");
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.status = "loading";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.userData.isUserLoggedIn = true;

      state.userData = { ...state.userData, ...action.payload.user };
      const token = localStorage.getItem("G_CONNECT_TOKEN");

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
    },
    [userSignup.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});
export const { addFollowing, updateUsers, userLogout } = userSlice.actions;
export default userSlice.reducer;
