import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import LogIn from "../Components/Authentication/LogIn";
import Register from "../Components/Authentication/Register";
import { useHistory } from "react-router-dom";

function HomePage() {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <div>
      <Container color="#2c5282" maxW="2xl" p="10px 15px" mt="4" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          bg="white"
          width="100%"
          margin="5px"
          borderRadius="10px"
          border="10px solid #BEE3F8"
        >
          <Text fontFamily="trispace" fontSize="3xl">
            Talk-A-Tive
          </Text>
        </Box>
        <Box w="100%" bg="white" mt="4" borderRadius="10px" p={4}>
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab width="50%">Log In</Tab>
              <Tab width="50%">Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LogIn />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;
