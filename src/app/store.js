import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../Components/post/posts.slice';
import userSlice from '../Components/login/user.slice';
import usersTofollow from '../Components/followpage/followList.slice'
export const store = configureStore({
  reducer: {
    posts:postSlice,
    user:userSlice,
    usersArray:usersTofollow
  },
});
