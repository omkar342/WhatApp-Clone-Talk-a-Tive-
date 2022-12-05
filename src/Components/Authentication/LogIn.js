import React, { useState } from "react";
import axios from "axios";
import { VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  InputRightElement,
  InputGroup,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function LogIn() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const history = useHistory();

  function handleClick() {
    setShow(!show);
  }

  async function submitClickHandler() {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Please fill all the fields.",
        description: "You haven't filled all the fields.",
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/api/user/login",
        data: {
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Login Successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));

      setLoading(false);

      history.push("/chats");
    } catch (e) {
      toast({
        title: "Error Occured!",
        description: e.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
  }

  return (
    <div>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            htmlFor="email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </FormControl>
        <FormControl id="passwordLogin" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              htmlFor="passwordLogin"
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          style={{ marginTop: "15px" }}
          onClick={submitClickHandler}
          width="100%"
          bg="#BEE3F8"
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("guest");
          }}
          variant="outline"
          width="100%"
          color="#9b2c2c"
          _hover={{ bg: "#fed7d7" }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </div>
  );
}

export default LogIn;
