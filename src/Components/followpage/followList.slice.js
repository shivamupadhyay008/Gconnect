import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = { usersList: [], status: "idle", error: null };
const gcUrl = "https://gConnect-backend.shivam008.repl.co";

export const fetchUsers = createAsyncThunk(
  "userlist/fetchUsers",
  async (action, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://gConnect-backend.shivam008.repl.co/user/users",
        { userid: action }
      );

      return response.data;
    } catch (err) {
      console.log("this is error", err);
      return rejectWithValue(err.message);
    }
  }
);

export const usersList = createSlice({
  name: "userlist",
  initialState,

  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.usersList = action.payload.users;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const likePostApi = async (data) => {
  try {
    const response = await axios.post(`${gcUrl}/post/like`, data);
    return response;
  } catch (error) {
    return error.message;
  }
};

// export const { addPosts, likePostReducer, addNewPost, addCommentReducer } =
//   usersList.actions;
export default usersList.reducer;
