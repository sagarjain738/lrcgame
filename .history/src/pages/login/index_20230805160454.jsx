import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {};

  return (
    <Box
      width="100vw"
      height="100vh"
      display="grid"
      placeItems="center"
      gap="-10rem"
    >
      <Box>
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
            outline: "none",
          }}
          _active={{
            border: "none",
            outline: "none",
          }}
          _selected={{
            border: "none",
            outline: "none",
          }}
        />

        <Button size="lg" width="10rem" height="4rem" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
