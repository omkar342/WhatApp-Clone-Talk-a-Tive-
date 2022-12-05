import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const toast = useToast();

  function handleClick(isShowConfirm) {
    if (isShowConfirm) {
      setShowConfirm(!showConfirm);
    } else {
      setShow(!show);
    }
  }

  async function postDetails(pics) {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select atleast one image file.",
        description: "You haven't selected any image file.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
        colorScheme: "yellow",
      });
      setLoading(false);
      return;
    }

    if (pics.type == "image/jpeg" || pics.type == "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatty");
      data.append("cloud_name", "chatty");

      // Here it is ok to not to add await before axios as we are only gonna proceed if we get the value of a promise.

      const response = axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/mysocialappforproject/image/upload",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          const data = res.data;
          setPic(data.url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

      // This is another method to use axios to post data to cloudinary without await.

      //   axios({
      //     method: "post",
      //     url: "https://api.cloudinary.com/v1_1/mysocialappforproject/image/upload",
      //     data: data,
      //     headers: { "Content-Type": "multipart/form-data" },
      //   })
      //     .then((res) => {
      //       const data = res.data;
      //       console.log(data);
      //       setPic(data.url);
      //       console.log(data.url);
      //       setLoading(false);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       setLoading(false);
      //     });
    }
  }

  async function submitClickHandler() {
    setLoading(true);

    if (!name || !email || !password || !confirmPassowrd) {
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

    if (password !== confirmPassowrd) {
      toast({
        title: "Password and Confirm Password doesn't match.",
        description: "Please check your password and confirm password.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/api/user/",
        data: {
          name,
          email,
          password,
          pic,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Registration Successful.",
        description: "Account created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));

      setLoading(false);

      history.push("/chats");
    } catch (e) {
      console.log(e);
      toast({
        title: "Error Occured!",
        description: e.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  }

  return (
    <div>
      <VStack spacing="5px">
        <FormControl id="nameRegistration" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            htmlFor="nameRegistration"
            placeholder="Enter Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            htmlFor="email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="passwordRegistration" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              htmlFor="passwordRegistration"
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  handleClick(0);
                }}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmPassword" isRequired>
          <FormLabel htmlFor="confirmPassword">Password</FormLabel>
          <InputGroup>
            <Input
              htmlFor="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Your Password"
              onChange={(e) => {
                setConfirmPassowrd(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  handleClick(1);
                }}
              >
                {showConfirm ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic" isRequired>
          <FormLabel>Profile Picture</FormLabel>
          <Input
            htmlFor="pic"
            multiple={true}
            type="file"
            accept="image/*"
            onChange={(e) => {
              postDetails(e.target.files[0]);
            }}
          />
        </FormControl>
        <Button
          style={{ marginTop: "15px" }}
          onClick={submitClickHandler}
          width="100%"
          bg="#BEE3F8"
          isLoading={loading}
        >
          Register
        </Button>
      </VStack>
    </div>
  );
}

export default Register;
