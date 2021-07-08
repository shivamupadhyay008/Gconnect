import "./login.css";
import { Box, Input, Heading, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
export function InputComp({ type, placeHolder, text, setText }) {
  return (
    <Box m="1rem 0" w="100%" textAlign="left">
      <Box  mb="0.5rem">{type}</Box>
      <Input placeholder={placeHolder} onChange={(e)=>setTimeout(()=>setText(e.target.value),1500)}/>
    </Box>
  );
}
export function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword,setUserPassword] = useState("");
  const [userId,setUserId]=useState("");
  const [signup,setSignup]=useState(false)
  return (
    <section className="login-bx">
      <Box className="login-div" padding="0 1rem">
        <Heading as="h4" mt="1rem">Gconnect</Heading>
        <Heading as="h4" size="md" mt="1rem" mb="2rem ">
          {signup ? "Sign up" : "Login"}
        </Heading>
        <Box>
          <InputComp
            type={"em ail"}
            placeHolder={"Enter your email"}
            text={email}
            setText={setEmail}
          />{" "}
          {signup ? (
            <>
              <InputComp
                type={"Full Name"}
                placeHolder={"Enter your name"}
                text={name}
                setText={setName}
              />
              <InputComp
                type={"username"}
                placeHolder={"Enter username"}
                text={userId}
                setText={setUserId}
              />
            </>
          ) : (
            ""
          )}
          <InputComp
            type={"password"}
            placeHolder={"Enter your password"}
            text={userPassword}
            setText={setUserPassword}
          />
        </Box>
        <Button borderRadius="2rem">{signup ? "Signup" : "Login"}</Button>
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
