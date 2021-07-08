import { Navbar, CreatePost, Post, Followpage, Feed,ProfilePage } from "../index";
import { Routes,Route } from "react-router-dom";
export default function MainCluster() {
  return (
    <div>
      <Navbar />
      <Feed/>

      {/* <ProfilePage
        userId="shivam@1223"
        followers={[10, 10]}
        following={[1, 1, 1, 1]}
        posts={[1, 1, 1, 1]}
        about={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt perferendis sapiente laudantium!"
        }
        userName="shivam upadhyay"
      /> */}

    </div>
  );
}
