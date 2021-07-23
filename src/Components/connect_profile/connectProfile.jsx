import { Box, Flex, Avatar, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export function ConnectProfile({ userImage, name, username, about,id }) {
  const following= useSelector((state)=>state.user.userData.following)
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(()=>{
    if (following.some((item) => item === id)) {
      setIsFollowing(true);
    }
  },[])
  return (
    <Box className="br-cr">
      <Flex margin="0.5rem">
        <Box w="10%" ml="0.5rem" mr="0.5rem">
          <Avatar size="md" src={userImage} name={name} />
        </Box>
        <Flex w="100%" justifyContent="space-between" w='100%'>
          <Link to={`/user/${username}`}>
            <Box  ml="0.5rem" w="100%">
              <Box fontWeight="bold" m="0" w="auto">
                {name}
              </Box>
              <Box w="100%" fontSize="0.8rem" color="#666565" m="0" p="0">
                {username}
              </Box>
              {about ? (
                <Box
                  fontSize="0.9rem"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="pre-line"
                >
                  {about}
                </Box>
              ) : (
                ""
              )}
            </Box>
          </Link>
          <Box
            w="100px"
            d="flex"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
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
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
