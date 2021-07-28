import "./post.css";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { BiMessageSquare } from "react-icons/bi";
import {
  Image,
  Icon,
  Box,
  Flex,
  Input,
  StackDivider,
  Button,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  likePostApi,
  unlikePostApi,
  commentApi,
  addCommentReducer,
  likePostReducer,
} from "./posts.slice";
export function CommentSection({ comments, postid }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [text, setText] = useState("");
  return (
    <Box>
      <Box d="flex">
        <Input
          value={text}
          placeholder="Add a comment"
          mr="1rem"
          onChange={(e) => setText(e.target.value)}
        />{" "}
        <Button
          colorScheme="blue"
          isDisabled={text.length === 0 ? true : false}
          onClick={async () => {
            console.log(postid, userData.userData._id);
            const res = await commentApi({
              postid,
              text,
              userid: userData.userData._id,
            });
            console.log(res.data);
            dispatch(addCommentReducer(res.data));
            setText("");
          }}
        >
          Comment
        </Button>
      </Box>
      <Box minH="max-content" maxH=" 90px" overflowY="scroll" mt="0.4rem">
        {comments.length > 0
          ? comments.map((item) => (
              <Box key={item._id} d="flex" mt="0.1rem" p="0 0.5rem">
                <Box mr="0.3rem">
                  <Avatar
                    size="sm"
                    src={item?.postedBy?.image}
                    name={item?.postedBy?.username}
                  />
                </Box>
                <Box w="100%">
                  <Box fontSize="0.8rem" fontWeight="bold">
                    {item?.postedBy?.username}
                  </Box>
                  <Box fontSize="0.8rem"> {item?.text}</Box>
                </Box>
              </Box>
            ))
          : ""}
      </Box>
    </Box>
  );
}

export function Post({
  id,
  userimage,
  from,
  userId,
  postbody,
  postimg,
  userName,
  comments,
  likes,
}) {
  const [liked, setLiked] = useState(false);
  const [option, openOption] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    if (likes.some((item) => item === userData.userData._id)) {
      setLiked(true);
    }
  }, []);
  return (
    <section className="post-sec">
      <div className="post-pic">
        <Avatar
          className="post-avatar"
          name={userName}
          src={userimage}
          alt="not found"
        />
      </div>
      <Box pr="0.5rem">
        <div className="post-body">
          <div className="title-head">
            <Link state={{ from: pathname }} to={`/user/${userId}`}>
              <Flex alignItems="center">
                <Box fontWeight="bold">{userName}</Box>
                <Box fontSize="0.9rem" className="uid-tm">
                  {userId}
                </Box>
              </Flex>
            </Link>
          </div>
        </div>
        <div onClick={() => openOption(false)}>
          <div className="post-content">{postbody}</div>
          {postimg ? (
            <Box w="100%" d="flex" justifyContent="center">
              <Image
                borderRadius="1rem"
                mt="1rem"
                h="250px"
                w="90%"
                src={postimg}
              />
            </Box>
          ) : (
            ""
          )}
        </div>
        {from !== "explore" ? (
          <Box>
            <Box display="flex" mt="0.5rem">
              <Flex
                display="inline-flex"
                justifyContent="center"
                mr="0.5rem"
                onClick={() => setShowComments((state) => !state)}
              >
                <Icon boxSize="2rem" _hover={{ cursor: "pointer" }}>
                  <BiMessageSquare color="#000000ab" />
                </Icon>
                <Box mt="0.1rem"> {comments.length} comments</Box>
              </Flex>
              <Flex display="inline-flex" justifyContent="center">
                <Box
                  onClick={async () => {
                    let res = null;
                    if (liked) {
                      res = await unlikePostApi({
                        postid: id,
                        userid: userData.userData._id,
                      });
                    } else {
                      res = await likePostApi({
                        postid: id,
                        userid: userData.userData._id,
                      });
                    }
                    if (res.status === 200) {
                      console.log("working");
                      dispatch(likePostReducer(res.data));
                    }
                    setLiked((like) => !like);
                  }}
                >
                  <Icon boxSize="2rem" _hover={{ cursor: "pointer" }}>
                    {liked ? (
                      <AiTwotoneHeart color="red" />
                    ) : (
                      <AiOutlineHeart color="#000000ab" />
                    )}
                  </Icon>
                </Box>
                <Box mt="0.1rem">{likes.length} likes</Box>
              </Flex>
            </Box>
            {showComments ? (
              <CommentSection comments={comments} postid={id} />
            ) : (
              ""
            )}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </section>
  );
}
