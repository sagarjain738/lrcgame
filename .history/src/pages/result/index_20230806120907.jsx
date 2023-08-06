import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Result = () => {
  const [user, setUser] = useState("");

  const fetchSingleResult = () => {
    return axios.get(
      `http://localhost:3000/api/results?name=${sessionStorage.getItem(
        "username"
      )}`
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["IndividualResult"],
    queryFn: () => fetchSingleResult(),
    enabled: false,
  });

  useEffect(() => {
    // setUser(sessionStorage.getItem("username"));
    console.log(data?.data);
  }, [data]);

  if (isLoading) return "Loading...";

  return (
    <Box width="100vw" height="100vh" display="grid" placeItems="center">
      Show Result Here
    </Box>
  );
};

export default Result;
