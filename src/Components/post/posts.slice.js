import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFeedPosts } from "../../apis/apis";

const initialState = { posts: [], status: "idle", error: null };

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const {data} = await getFeedPosts();
  console.log(data);
  return data.posts;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      console.log("state is", action.payload);
      return state;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.posts=state.posts.concat(action.payload)
    },
    [fetchPosts.error]: (state, action) => {
      state.status = "error";
      state.error=action.error.message;
    },
  },
});

export const { addPosts } = postSlice.actions;
export default postSlice.reducer;
