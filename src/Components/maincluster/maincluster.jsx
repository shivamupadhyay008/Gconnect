import {
  Navbar,
  CreatePost,
  Post,
  Followpage,
  Feed,
  ProfilePage,
  Notification
} from "../index";
import { Routes, Route } from "react-router-dom";
export default function MainCluster() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/connection" element={<Followpage />} />
        <Route path="/user/:id" element={<ProfilePage />} />
        <Route path="/notification" element={<Notification/>}/>
      </Routes>
    </div>
  );
}
