import { Box } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

const Result = () => {
  const fetchSingleResult = () => {
    return fetch("http://localhost:3000/api/results").then((res) => res.json());
  };

  return (
    <Box width="100vw" height="100vh" display="grid" placeItems="center">
      Show Result Here
    </Box>
  );
};

export default Result;
