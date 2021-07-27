import "./followpage.css";
import { Box, Spinner } from "@chakra-ui/react";
import { ConnectProfile } from "../index";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { fetchUsers } from "./followList.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export function Followpage() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const status = useSelector((state) => state.usersArray.status);
  const userData = useSelector((state) => state.usersArray.usersList);
  const user = useSelector((state) => state.user.userData);
  const error = useSelector((state) => state.usersArray.error);
  console.log("status ye hai", status, error);
  useEffect(() => {
    console.log("working in effect");
    if (status === "idle") {
      console.log("idle");
      dispatch(fetchUsers(user._id));
    }
  }, []);
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
          onClick={() => {
            navigate(state?.from);
          }}
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
        {status === "loading" ? (
          <Box p="1rem" textAlign="center">
            <Spinner color="blue.400" size="lg" />
          </Box>
        ) : (
          userData.map((item) => (
            <ConnectProfile
              key={item._id}
              id={item._id}
              name={item.name}
              userImage={item.image}
              username={item.username}
              about={item.about}
            />
          ))
        )}
      </Box>
    </Box>
  );
}
