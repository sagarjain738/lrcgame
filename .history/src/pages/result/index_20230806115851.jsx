import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const Result = () => {
  const fetchSingleResult = () => {
    return axios.get("http://localhost:3000/api/results?name=sagar");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["IndividualResult"],
    queryFn: () => fetchSingleResult(),
  });

  useEffect(() => {
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
