import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation((newTodo) => {
    return axios.post("http://localhost:3000/api/login", newTodo);
  });
  const handleSubmit = () => {
    var nameRegex = /^[a-z][a-z]+/gi.test(username);
    if (nameRegex) {
      sessionStorage.setItem("username", username);
      mutation.mutate({ username: username });
      // console.log("Mutation", mutation.error?.response?.data);
    } else {
      setError("Please enter valid userName that");
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="grid"
      placeItems="center"
      gap="-10rem"
    >
      <Box display="grid" placeItems="center" gap="5rem">
        <Input
          onChange={(a) => setUsername(a.target.value)}
          value={username}
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

        <Text>{mutation.error?.response?.data}</Text>
      </Box>
    </Box>
  );
};

export default Login;
