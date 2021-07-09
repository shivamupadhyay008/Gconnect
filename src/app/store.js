import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postSlice from '../Components/post/posts.slice';
import userSlice from '../Components/login/user.slice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts:postSlice,
    user:userSlice
  },
});
