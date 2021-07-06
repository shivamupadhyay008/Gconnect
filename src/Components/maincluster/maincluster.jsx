import { Navbar, Post } from "../index";
export default function MainCluster() {
  return (
    <div>
      <Navbar />
      <Post
        avtarimage={"https://via.placeholder.com/150"}
        userId={"shivam@002"}
        postbody={
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit quia quae ut illo magni tempora, tempore culpa assumenda alias dicta."
        }
        postimg={"https://via.placeholder.com/500"}
        userName={"shivam"}
        uploadTime={"4"}
        commentCount={44}
        likeCount={22}

      />
    </div>
  );
}
