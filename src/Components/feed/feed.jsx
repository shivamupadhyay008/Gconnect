import { Post, CreatePost } from "../index";
const posts = [
  {
    _id: 1,
    image: "https://via.placeholder.com/150",
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi dolores facere, alias animi odio amet?",
    postedBy: {
      name: "shivam",
      image: "https://via.placeholder.com/150",
      userId: "user@user",
      _id: "121",
    },
    likes: [{}, {}],
    comments: [
      {
        userimage: "https://via.placeholder.com/150",
        userid: "shivam02",
        commentText:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint provident harum sunt praesentium magnam dolor fuga earum quaerat cumque! ",
      },
      {
        userimage: "https://via.placeholder.com/150",
        userid: "shivam02",
        commentText:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint provident harum sunt praesentium magnam dolor fuga earum quaerat cumque! ",
      },
    ],
  },
  {
    _id: 2,
    image: "https://via.placeholder.com/150",
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi dolores facere, alias animi odio amet?",
    postedBy: {
      name: "shivam",
      image: "https://via.placeholder.com/150",
      userId: "user@user",
      _id: "121",
    },
    likes: [{}, {}],
    comments: [
      {
        userimage: "https://via.placeholder.com/150",
        userid: "shivam02",
        commentText:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint provident harum sunt praesentium magnam dolor fuga earum quaerat cumque! ",
      },
      {
        userimage: "https://via.placeholder.com/150",
        userid: "shivam02",
        commentText:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint provident harum sunt praesentium magnam dolor fuga earum quaerat cumque! ",
      },
    ],
  },
  {
    _id: 3,
    image: "https://via.placeholder.com/150",
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi dolores facere, alias animi odio amet?",
    postedBy: {
      name: "shivam",
      image: "https://via.placeholder.com/150",
      userId: "user@user",
      _id: "121",
    },
    likes: [{}, {}],
    comments: [
      {
        userimage: "https://via.placeholder.com/150",
        userid: "shivam02",
        commentText:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint provident harum sunt praesentium magnam dolor fuga earum quaerat cumque! ",
      },
      {
        userimage: "https://via.placeholder.com/150",
        userid: "shivam02",
        commentText:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint provident harum sunt praesentium magnam dolor fuga earum quaerat cumque! ",
      },
    ],
  },
];

export function Feed() {
  return (
    <section>
      <CreatePost userImg={"https://via.placeholder.com/100"} />
      {posts.map((item) => (
        <Post
          id={item._id}
          userimage={item.postedBy.image}
          userId={item.postedBy.userId}
          postbody={item.body}
          postimg={item.image}
          userName={item.postedBy.name}
          likes={item.likes}
          comments={item.comments}
        />
      ))}
    </section>
  );
}
