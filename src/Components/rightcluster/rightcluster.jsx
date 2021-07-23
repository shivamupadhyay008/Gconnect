import { Box, Flex, Avatar, Button } from "@chakra-ui/react";
import { userLogout } from "../login/user.slice";
import { useSelector, useDispatch } from "react-redux";
export default function RightCluster() {
  const userdata = useSelector((state) => state.user.userData);
const dispatch=useDispatch();
  return (
    <Box h="100vh" className="br-cr" borderRadius="0. 4rem" p="1rem">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        <Avatar src={userdata?.image} name={userdata?.name} />
        <Box p="10px" fontSize="1.2rem">
          hii {userdata?.name}😎
        </Box>
        <Box p="10px" fontSize="1.2rem">
          <Box fontWeight="bold">{userdata?.followers?.length}</Box>
          followers
        </Box>
        <Box p="10px" fontSize="1.2rem">
          <Box fontWeight="bold">{userdata?.following?.length}</Box>
          following
        </Box>
        <Button
          variant="outline"
          borderRadius="2rem"
          colorScheme="red"
          onClick={() => dispatch(userLogout())}
        >
          Sign Out
        </Button>
      </Flex>
    </Box>
  );
}
