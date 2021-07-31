import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const gcUrl = "https://gConnect-backend.shivam008.repl.co";

const initialState = {
  explorePosts: [],
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (action, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${gcUrl}/post/feed/${action}`);
      return response.data.posts;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const fetchExplorePosts = createAsyncThunk(
  "post/fetchExplorePosts",
  async (action, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${gcUrl}/post/getallposts`);
      return response.data.posts;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      console.log("state is", action.payload);
      return state;
    },
    likePostReducer: (state, action) => {
      console.log(action);
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
    addCommentReducer: (state, action) => {
      state.posts.forEach((item) => {
        if (item._id === action.payload.data._id) {
          item.comments = action.payload.data.comments;
        }
      });
    },
    addNewPost: (state, action) => {
      state.posts.unshift(action.payload.newUserPost);
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
    [fetchExplorePosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchExplorePosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.explorePosts = state.explorePosts.concat(action.payload);
    },
    [fetchExplorePosts.rejected]: (state, action) => {
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

export const unlikePostApi = async (data) => {
  try {
    const response = await axios.post(`${gcUrl}/post/unlike`, data);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const commentApi = async (data) => {
  try {
    const response = await axios.post(`${gcUrl}/post/comment`, data);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const deleteCommentApi = async (data) => {
  try {
    const response = await axios.post(`${gcUrl}/post/removecomment`, data);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const createPostApi = async (data) => {
  try {
    const response = await axios.post(`${gcUrl}/post/createpost`, data);
    return response;
  } catch (error) {
    return error.message;
  }
};
export const { addPosts, likePostReducer, addNewPost, addCommentReducer } =
  postSlice.actions;
export default postSlice.reducer;
