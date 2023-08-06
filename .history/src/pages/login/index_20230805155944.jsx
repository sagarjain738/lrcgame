import { Box, Input } from "@chakra-ui/react";
import React from "react";

const Login = () => {
  return (
    <Box width="100vw" height="100vh" display="grid" placeItems="center">
      <Input
        maxWidth="30rem"
        border="2px solid black"
        p="1.4rem 1rem"
        fontSize="1.2rem"
        placeholder="Enter Login Name"
        _placeholder={{
          color: "green",
        }}
        _hover={{
          border: "2px solid black",
        }}
        _focus={{
          border: "none",
        }}
      />
    </Box>
  );
};

export default Login;
