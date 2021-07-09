import "./post.css";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
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
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useState } from "react";
export function CommentSection({ comments }) {
  return (
    <Box>
      <Box d="flex">
        <Input placeholder="Add a comment" mr="1rem" />{" "}
        <Button colorScheme="blue">Comment</Button>
      </Box>
      <Box height="90px" overflowY="scroll" mt="0.4rem">
        {comments.length > 0
          ? comments.map((item) => (
              <Box d="flex" mt="0.1rem" p="0 0.5rem">
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

export function PostOptions() {
  return (
    <Box
      borderRadius="0.4rem"
      cursor="pointer"
      pos="absolute"
      bg="#d3d3d3"
      top="0.5rem"
      right="1rem"
      p="0.5rem"
      border="1px solid #8e8e8e"
    >
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <span>Delete</span>
      </VStack>
    </Box>
  );
}
export function Post({
  id,
  userimage,
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
  return (
    <section className="post-sec">
      <div className="post-pic" >
        <Avatar class="post-avatar" src={userimage} alt="not found" />
      </div>
      <Box pr="0.5rem">
        <div className="post-body">
          <div className="title-head">
            <Flex alignItems="center">
              <Box fontWeight="bold">{userName}</Box>
              <Box fontSize="0.9rem" className="uid-tm">{userId}</Box>
            </Flex>
            <div className="elips-cls" onClick={() => openOption(true)}>
              <IoEllipsisHorizontalOutline />
            </div>
          </div>
        </div>
        <div onClick={() => openOption(false)}>
          <div className="post-content">{postbody}</div>
          <Box w="100%" d="flex" justifyContent="center">
            <Image
              borderRadius="1rem"
              mt="1rem"
              h="250px"
              w="90%"
              src={postimg}
            />
          </Box>
        </div>
        <Box display="flex" mt="0.5rem">
          {option ? <PostOptions /> : ""}
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
            <Box onClick={() => setLiked((like) => !like)}>
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
        {showComments ? <CommentSection comments={comments} /> : ""}
      </Box>
    </section>
  );
}
