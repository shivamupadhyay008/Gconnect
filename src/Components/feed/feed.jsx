import { fetchPosts, fetchExplorePosts } from "../post/posts.slice";
import { Post, CreatePost } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
export function Feed() {
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.user.userData);
  const postStatus = useSelector((state) => state.posts.status);
  const dispatch = useDispatch();
  useEffect(() => {
    if (postStatus === "idle" && user.isUserLoggedIn) {
      dispatch(fetchPosts(user._id));
      dispatch(fetchExplorePosts());
    }
  }, []);
  return (
    <section>
      <Box
        padding="0.5rem"
        border=" 1px solid #e9e9e9"
        display="flex"
        width="100%"
        pl="1rem"
      >
        <span className="con-title">Home</span>
      </Box>
      <CreatePost userImg={user.image} />
      {posts?.length === 0 ? (
        <Box
          w="100%"
          textAlign="center"
          p="1rem"
          fontWeight="bold"
          color="Blue"
        >
          <NavLink to="connection">no posts start following people</NavLink>
        </Box>
      ) : (
        ""
      )}
      {postStatus === "fullfilled" ? (
        posts?.map((item) => {
          return (
            <Post
              key={item._id}
              from="feed"
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
        <Box p="1rem" textAlign="center">
          <Spinner color="blue.400" size="lg" />
        </Box>
      )}
    </section>
  );
}
