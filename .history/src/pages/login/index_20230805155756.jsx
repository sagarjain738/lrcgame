import { Box, Input } from "@chakra-ui/react";
import React from "react";

const Login = () => {
  return (
    <Box width="100vw" height="100vh" display="grid" placeItems="center">
      <Input maxWidth="30rem" border="2px solid blue.500" />
    </Box>
  );
};

export default Login;
