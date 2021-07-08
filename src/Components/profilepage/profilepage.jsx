import "./profile.css";
import { userData } from "../../data";
import { Post } from "../index";
import { Box, Flex, Avatar, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation,useParams } from "react-router-dom";
export function ProfilePage() {
  let {state} = useLocation();
  let {id}=useParams();
  const [showbtn,setbtn]=useState(false);
  const [isFollowing,setIsFollowing]=useState(false);
  console.log(id)

  return (
    <>
      <Box className="br-cr">
        <Box
          mt="1rem"
          width="100%"
          display="flex"
          alignSelf="center"
          justifyContent="center"
        >
          <Avatar size="2xl" src={userData.image} />
        </Box>
        <Box p="0 0.5rem">
          <Flex justifyContent="space-between" ml="1rem" mb="1rem">
            <Box
              fontWeight="bold"
              display="flex"
              flexDir="column"
              fontSize="1.1rem"
            >
              {userData.name}
              <span className="pf-usr">{userData.username}</span>
            </Box>
            <Box mr="1rem">
              {id==="shivam" ? (
                <Button
                  borderRadius="2rem"
                  variant="outline"
                  colorScheme="blue"
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  borderRadius="2rem"
                  bg={isFollowing ? "" : "var(--BRAND_BLUE)"}
                  className="pst-btn"
                  colorScheme="blue"
                  variant={isFollowing ? "outline" : "solid"}
                  onClick={() => setIsFollowing((follow) => !follow)}
                >
                  {isFollowing ? "following" : "follow"}
                </Button>
              )}
            </Box>
          </Flex>
          <Box ml="1rem">{userData.about}</Box>
          <Flex justifyContent="space-between" p=" 1rem">
            <Box className="flw-bx">
              <span className="bld">{userData?.posts?.length ?? 0}</span> Posts
            </Box>
            <Box className="flw-bx">
              {" "}
              <span className="bld">
                {userData?.following?.length ?? 0}
              </span>{" "}
              Following
            </Box>
            <Box className="flw-bx">
              <span className="bld">{userData?.followers?.length ?? 0}</span>{" "}
              Followers
            </Box>
          </Flex>
        </Box>
      </Box>
      <>
        {userData && userData.posts
          ? userData.posts.map((item) => (
              <Post
                postbody={item.body}
                id={item._id}
                likes={item.likes}
                postimg={item.image}
                userName={item.postedBy.name}
                comments={item.comments}
                userimage={item.image}
              />
            ))
          : ""}
      </>
    </>
  );
}
