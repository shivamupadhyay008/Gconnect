import "./login.css";
import {
  Box,
  Input,
  Heading,
  Button,
  FormLabel,
  useMediaQuery,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, userSignup } from "./user.slice";
import { useState } from "react";
import { useNavigate } from "react-router";
export function InputComp({ type, placeHolder, text, setText, isValid, err }) {
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
      <span className={`frm-err ${err?.error ? "sh-dis" : ""}`}>
        {err?.message}
      </span>
    </Box>
  );
}
export function Login() {
  const userData = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signup, setSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileWidth] = useMediaQuery("(max-width: 600px)");
  if (userData.userData.isUserLoggedIn) navigate("/");
  console.log(userData.loginError,userData.error)
  return (
    <section className="login-bx">
      <Box
        padding="0 1rem"
        className={`login-div ${mobileWidth ? "login-dv-qr" : ""}`}
      >
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
        {userData.loginError === "error" ? (
          <Box mb="0.3rem" fontSize="0.9rem" color="red">
            {!signup ? userData.error : ""}
          </Box>
        ) : (
          ""
        )}
        {userData.singupError === "error" ? (
          <Box mb="0.3rem" fontSize="0.9rem" color="red">
            {!signup ? userData.error : ""}
          </Box>
        ) : (
          ""
        )}
        {userData.status === "fullfilled" ? (
          <Box mb="0.3rem" fontSize="0.9rem" color="green">
            {!signup ? " Login Success" : "Signup Success"}
          </Box>
        ) : (
          ""
        )}
        <Box mb="0.3rem" fontSize="0.9rem"></Box>
        <Button
          isLoading={userData.status === "loading" ? true : false}
          loadingText={!signup ? "Logging in" : "Signin up"}
          onClick={() => {
            !signup
              ? dispatch(userLogin({ email, password: userPassword }))
              : dispatch(
                  userSignup({ name, email, username, password: userPassword })
                );
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
           or login as
          <Box
            onClick={() =>
              dispatch(userLogin({ email:"user12@gmail.com", password:"user1234"}))
            }
            d="inline"
            color="var(--BRAND_BLUE)"
            cursor="pointer"
          >
            guest
          </Box>
        </Box>
      </Box>
    </section>
  );
}
