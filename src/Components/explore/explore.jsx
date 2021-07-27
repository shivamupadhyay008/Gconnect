import { HiArrowNarrowLeft } from "react-icons/hi";
import { fetchExplorePosts } from "../post/posts.slice";
import { Post } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spinner, Box } from "@chakra-ui/react";
export function Explore() {
  const posts = useSelector((state) => state.posts.explorePosts);
  const postStatus = useSelector((state) => state.posts.status);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchExplorePosts());
  }, []);
  return (
    <div>
      <Box
        padding="0.5rem"
        border=" 1px solid #e9e9e9"
        display="flex"
        width="100%"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="10%"
          mr="0.8rem"
          onClick={() => navigate(state?.from)}
        >
          <Box
            cursor="pointer"
            color="var(--BRAND_BLUE)"
            _hover={{ background: "var(--LIGHT_BLUE)", color: "white" }}
            p="0.2rem"
            borderRadius="50%"
          >
            <HiArrowNarrowLeft fontSize="1.4rem" />
          </Box>
        </Box>
        <span className="con-title">Explore</span>
      </Box>
      {postStatus === "fullfilled" ? (
        posts?.map((item) => {
          return (
            <Post
              from={"explore"}
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
        <Box p="1rem" textAlign="center">
          <Spinner color="blue.400" size="lg" />
        </Box>
      )}
    </div>
  );
}
