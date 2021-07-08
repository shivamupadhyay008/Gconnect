import "./followpage.css";
import { Box } from "@chakra-ui/react";
import { ConnectProfile } from "../index";
import { HiArrowNarrowLeft } from "react-icons/hi";
export function Followpage() {
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
        <span className="con-title">Connect</span>
      </Box>
      <Box>
        <ConnectProfile
          name={"shivam"}
          userImage={""}
          username={"user@121"}
          // about={"some hobbys : sdfjks | shiam up or kya ab kya"}
        />
      </Box>
    </Box>
  );
}
