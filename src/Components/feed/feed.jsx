import { addPosts, fetchPosts } from "../post/posts.slice";
import { Post, CreatePost } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Spinner ,Box} from "@chakra-ui/react";
export function Feed() {
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);
  const postStatus = useSelector((state) => state.posts.status);
  const dispatch = useDispatch();
  console.log(posts);
  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPosts());
  }, []);
  return (
    <section>
      <CreatePost userImg={"https://via.placeholder.com/100"} />
      {console.log(
        "ssssss",
        postStatus === "fullfilled" ? posts : "nhi chalegi"
      )}
      {postStatus === "fullfilled" ? (
        posts?.map((item) => {
          console.log(item);
          return (
            <Post
              key={item._id}
              id={item._id}
              userimage={item.postedBy.image}
              userId={item.postedBy.username}
              postbody={item.body}
              postimg={item.image}
              userName={item.postedBy.name}
              likes={item.likes}
              comments={item.comments}
            />
          );
        })
      ) : (
        <Box p='1rem' textAlign="center">
          <Spinner color="blue.400" size="lg" />
        </Box>
      )}
    </section>
  );
}
