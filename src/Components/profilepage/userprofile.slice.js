import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profileData: {},
  status: "idle",
  error: null,
};

export const getUserThunk = createAsyncThunk(
  "userprofile/getUserThunk",
  async (payload, { rejectWithValue }) => {
    try {
        alert(payload.username)
      const response = await axios.post(
        `https://gConnect-backend.shivam008.repl.co/user/searchuser/${payload.username}`,
        { userid: payload.userid }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileSlice = createSlice({
  name: "userprofile",
  initialState,
  extraReducers: {
    [getUserThunk.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserThunk.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.profileData = action.payload.userdata;
    },
    [getUserThunk.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default profileSlice.reducer;
