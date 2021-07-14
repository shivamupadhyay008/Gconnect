import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../Components/post/posts.slice';
import userSlice from '../Components/login/user.slice';
import usersTofollow from '../Components/followpage/followList.slice'
import  profileSlice  from '../Components/profilepage/userprofile.slice';
export const store = configureStore({
  reducer: {
    posts:postSlice,
    user:userSlice,
    profile:profileSlice,
    usersArray:usersTofollow
  },
});
