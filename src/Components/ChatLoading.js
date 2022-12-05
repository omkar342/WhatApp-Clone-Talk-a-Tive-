import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function ChatLoading() {
  return (
    <Stack mt="10px">
      <Skeleton height="55px" borderRadius="lg" />
      <Skeleton height="55px" borderRadius="lg" />
      <Skeleton height="55px" borderRadius="lg" />
      <Skeleton height="55px" borderRadius="lg" />
      <Skeleton height="55px" borderRadius="lg" />
      <Skeleton height="55px" borderRadius="lg" />
      <Skeleton height="55px" borderRadius="lg" />
      <Skeleton height="55px" borderRadius="lg" />
      <Skeleton height="55px" borderRadius="lg" />
    </Stack>
  );
}

export default ChatLoading;
