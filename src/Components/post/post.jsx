import "./post.css";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { BiMessageSquare } from "react-icons/bi";
import { Image, Icon, Box, Flex } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useState } from "react";
export function Post({
  image,
  uploadTime,
  avtarimage,
  userId,
  postbody,
  postimg,
  userName,
  commentCount,
  likeCount,
}) {
  const [liked, setLiked] = useState(false);

  return (
    <section className="post-sec">
      <div className="post-pic">
        <img class="post-avatar" src={avtarimage} alt="not found" />
      </div>
      <Box pr="0.5rem">
        <div className="post-body">
          <div className="title-head">
            <div>
              <span>{userName}</span>
              <span className="uid-tm">{userId}</span>
              <span className="uid-tm">
                <BsDot />
                {uploadTime} ago
              </span>
            </div>
            <div className="elips-cls">
              <IoEllipsisHorizontalOutline />
            </div>
          </div>
          <div className="post-content">{postbody}</div>
        </div>
        <div>
          <Image
            borderRadius="1rem"
            mt="1rem"
            h="300px"
            w="100%"
            src={postimg}
          />
        </div>
        <Box display="flex" mt="0.5rem">
          <Flex display="inline-flex" justifyContent="center" mr="0.5rem">
            <Icon boxSize="2rem" _hover={{ cursor: "pointer" }}>
              <BiMessageSquare color="#000000ab" />
            </Icon>
            <Box mt="0.1rem"> {commentCount} comments</Box>
          </Flex>{" "}
          <Flex display="inline-flex" justifyContent="center">
            <Icon boxSize="2rem" _hover={{ cursor: "pointer" }}>
              {liked ? <FcLike /> : <AiOutlineHeart color="#000000ab" />}
            </Icon>
            <Box mt="0.1rem">{likeCount} likes</Box>
          </Flex>
        </Box>
      </Box>
    </section>
  );
}
