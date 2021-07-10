import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getFeedPosts } from "../../apis/apis";

const initialState = { posts: [], status: "idle", error: null };

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const { data } = await getFeedPosts();
  return data.posts;
});

export const likePostApi = async (data) => {
  try {
    const response = await axios.post(
      "https://gConnect-backend.shivam008.repl.co/post/like",
      data
    );
    return response;
  } catch (error) {
    return error.message;
  }
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      console.log("state is", action.payload);
      return state;
    },
    likePostReducer: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.data._id) {
            return {
              ...post,
              likes: action.payload.data.likes,
            };
          } else {
            return post;
          }
        }),
      };
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { addPosts, likePostReducer } = postSlice.actions;
export default postSlice.reducer;
