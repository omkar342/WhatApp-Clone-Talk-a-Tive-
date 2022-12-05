import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  useToast,
  Input,
  Box,
} from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

function GroupChatModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChat, setGroupChat] = useState();
  const [selectedUsers, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");

  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    if (!query) {
      toast({
        title: "Please enter something in search.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    setSearch(query);
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:3000/api/user?search=${search}`,
        config
      );

      console.log(data);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (!groupChatName || !selectedUsers.length) {
      toast({
        title: "Please enter all the fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );

      console.log(data);

      setChats([data, ...chats]);
      setLoading(false);
      onClose();
      toast({
        title: "Group chat created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    } catch (e) {
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }
  };

  const handleGroup = async (userToAdd) => {
    // e.preventDefault();
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    setSelectedUser([...selectedUsers, userToAdd]);
  };

  const handleDelete = (userToDelete) => {
    setSelectedUser(selectedUsers.filter((user) => user !== userToDelete));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Trispace"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            <Box width="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((user) => {
                return (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handleFunction={() => {
                      handleDelete(user);
                    }}
                  />
                );
              })}
            </Box>

            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult.slice(0, 4).map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => {
                      handleGroup(user);
                    }}
                  ></UserListItem>
                );
              })
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
