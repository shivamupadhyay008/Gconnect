import { Box, Flex, Avatar, Button } from "@chakra-ui/react";
export function Suggestions() {
  return (
    <Box w="100%" h="max-content" p="0.5rem">
      <Flex justifyContent="center" alignItems="center" w="100%">
        <Box d="flex" alignItems="center" w="100%">
          <Avatar size="sm" />
          <Box fontWeight="bold" fontSize="1.2rem" ml="0.7rem" mr="0.3rem">
            shivam
          </Box>
        </Box>
        <Button size="sm" borderRadius="2rem" colorScheme="blue" p="1rem">
          Follow
        </Button>
      </Flex>
    </Box>
  );
}
export default function RightCluster() {
  return (
    <div>
      <Box
        d="flex"
        flexDir="column"
        mt="4rem"
        className="br-cr"
        borderRadius="1rem"
      >
        <Suggestions />
        <hr />
        <Suggestions />
        <hr /> <Suggestions />
        <hr /> <Suggestions /> <hr />
        <Suggestions />
      </Box>
    </div>
  );
}
