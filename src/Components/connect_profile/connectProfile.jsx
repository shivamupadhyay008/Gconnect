import { Box, Flex, Avatar} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
export function ConnectProfile({ userImage, name, username, about,id }) {
  const { pathname } = useLocation();
  return (
    <Box className="br-cr">
      <Flex margin="0.5rem">
        <Box w="10%" ml="1rem" mr="1rem">
          <Avatar size="md" src={userImage} name={name} />
        </Box>
        <Flex w="100%" justifyContent="space-between" w='100%'>
          <Link state={{from:pathname}} to={`/user/${username}`}>
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

          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
