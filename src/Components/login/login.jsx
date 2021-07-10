import "./login.css";
import { Box, Input, Heading, Flex, Button, FormLabel } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin,userSignup } from "./user.slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export function InputComp({ type, placeHolder, text, setText, isValid }) {
  return (
    <Box m="1rem 0" w="100%" textAlign="left">
      <FormLabel>{type}</FormLabel>
      <Input
        isRequired={true}
        isInvalid={isValid}
        errorBorderColor="red.300"
        placeholder={placeHolder}
        onChange={(e) => setText(e.target.value)}
      />
    </Box>
  );
}

export function Login() {
  const userData = useSelector((state) => state.user);
  const error=useSelector((state)=>state.user.error)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signup, setSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (userData.userData.isUserLoggedIn) navigate("/");
  return (
    <section className="login-bx">
      <Box className="login-div" padding="0 1rem">
        <Heading as="h4" mt="1rem">
          Gconnect
        </Heading>
        <Heading as="h4" size="md" mt="1rem" mb="2rem ">
          {signup ? "Sign up" : "Login"}
        </Heading>
        <Box>
          {signup ? (
            <>
              <InputComp
                type={"Full Name"}
                placeHolder={"Enter your name"}
                text={name}
                setText={setName}
              />
              <InputComp
                type={"Username"}
                placeHolder={"Enter username"}
                text={username}
                setText={setUsername}
              />
            </>
          ) : (
            ""
          )}
          <InputComp
            type={"Email"}
            placeHolder={"Enter your email"}
            text={email}
            setText={setEmail}
          />
          <InputComp
            type={"Password"}
            placeHolder={"Enter your password"}
            text={userPassword}
            setText={setUserPassword}
          />
        </Box>
        <Button
          isLoading={userData.status === "loading" ? true : false}
          loadingText={!signup ? "Logging in" : "Signin up"}
          onClick={() => {
            !signup
              ? dispatch(userLogin({ email, password: userPassword }))
              : dispatch(userSignup({ name, email, username, password:userPassword }));
          }}
          borderRadius="2rem"
        >
          {signup ? "Signup" : "Login"}
        </Button>
        <Box mt="1rem">
          {signup ? "back to " : "new here?"}
          <Box
            onClick={() => setSignup((state) => !state)}
            d="inline"
            color="var(--BRAND_BLUE)"
            cursor="pointer"
          >
            {signup ? "Login" : "Signup"}
          </Box>
        </Box>
      </Box>
    </section>
  );
}
