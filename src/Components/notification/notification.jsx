import { Box, Avatar, Flex, Heading } from "@chakra-ui/react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { usersdata } from "../../data";
const userData = usersdata;
export function NotificationTread({ image, message }) {
  return (
    <Box className="br-cr" p="0.5rem">
      <Flex alignContent="center" alignItems="center">
        <Avatar src={image} size="sm" />
        <Box ml="0.3rem" fontSize="0.9rem" fontWeight="bold">
          {message}
        </Box>
      </Flex>
    </Box>
  );
}
export function Notification() {
  return (
    <Box>
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
        <span className="con-title">Notification</span>
      </Box>
      <Box>
        {userData ? (
          userData.map((item) => (
            <NotificationTread image={item.userImage} message={item.about} />
          ))
        ) : (
          <Heading w="100%" textAlign="center" p="1rem" size="md">
            Nothing in Notification
          </Heading>
        )}
      </Box>
    </Box>
  );
}
