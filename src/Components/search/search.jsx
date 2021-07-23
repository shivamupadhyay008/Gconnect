import { Box, Spinner } from "@chakra-ui/react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { ConnectProfile } from "../index";
import { Link } from "react-router-dom";
import "./search.css";
import { useCallback, useState } from "react";
import axios from "axios";

export function Search() {
  const [userData, setUserData] = useState([]);
  const [status, setStatus] = useState({ state: "idle" });

  async function getResult(e) {
    try {
      setStatus({ state: "loading" });
      const result = await axios.get(
        `https://gconnect-backend.shivam008.repl.co/user/getuser/${e.target.value}`
      );
      console.log(result.data);
      if(result.data.users.length>0)setUserData(result.data.users)
      setStatus({ state: "fulfilled" });
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  function debounceFunctin(fun) {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      const context=this;
      timer= setTimeout(()=>{
        timer=null;
        fun.apply(context,args)
      },500)

    };
  }
  const optimisedFunction = useCallback(debounceFunctin(getResult))

  return (
    <div>
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
        <span className="con-title">Search</span>
      </Box>
      <div className="search-div">
        <input
          placeholder="Search User by name"
          className="activity-input"
          type="text"
          onChange={optimisedFunction}
        />
      </div>
      <Box>
        {status.state === "fulfilled" && userData.length <= 0 ? (
          <Box p="1rem" fontSize="1.2rem" textAlign="center">
            no results found
          </Box>
        ) : (
          ""
        )}
        {status.state === "idle" ? (
          <Box p="1rem" fontSize="1.2rem" textAlign="center">
            Start Search
          </Box>
        ) : (
          ""
        )}
        {status.state === "loading" ? (
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
    </div>
  );
}
