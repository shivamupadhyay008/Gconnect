import "./profile.css";
import { Box, Flex, Avatar ,Button} from "@chakra-ui/react";
export function ProfilePage({ userId,about, userName, followers, following, posts }) {
  return (
    <Box className="br-cr">
      <Box
        mt="1rem"
        width="100%"
        display="flex"
        alignSelf="center"
        justifyContent="center"
      >
        <Avatar size="2xl" />
      </Box>
      <Box p="0 0.5rem">
        <Flex justifyContent="space-between" ml="1rem"  mb="1rem">
          <Box
            fontWeight="bold"
            display="flex"
            flexDir="column"
            fontSize="1.1rem"
          >
            {userName}
            <span className="pf-usr">{userId}</span>
          </Box>
          <Button borderRadius="2rem" variant="outline" colorScheme="blue">Edit Profile</Button>
        </Flex>
        <Box ml="1rem">{about}</Box>
        <Flex justifyContent="space-between" p=" 1rem">
          <Box className="flw-bx">
            <span className="bld">{posts.length}</span> Posts
          </Box>
          <Box className="flw-bx">
            {" "}
            <span className="bld">{following.length}</span> Following
          </Box>
          <Box className="flw-bx">
            <span className="bld">{followers.length}</span> Followers
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
