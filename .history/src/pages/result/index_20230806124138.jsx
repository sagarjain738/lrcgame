import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Result = () => {
  const [user, setUser] = useState("");
  const [singleResult, setSingleResult] = useState([]);

  const fetchSingleResult = () => {
    return axios.get(`http://localhost:3000/api/results`);
    // return axios.get(`http://localhost:3000/api/results?name=${user}`);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["IndividualResult"],
    queryFn: () => fetchSingleResult(),
  });

  useEffect(() => {
    setUser(sessionStorage.getItem("username"));
    // setSingleResult(data?.data[user]);
    // console.log(data?.data);
    const unique = [...new Set(data?.data[user].map((item) => item.question))];

    const newData = data?.data[user].map((item) => {
      console.log(item);
      if (unique.includes(item.question)) {
        ({
          quetion: item.question,
          answer: item.result,
          timeTaken: item.duration,
        });
      }
    });
    // console.log(newData);

    return () => {};
  }, [data]);

  if (isLoading) return "Loading...";

  return (
    <Box width="100vw" height="100vh" display="grid" placeItems="center">
      Show Result Here of User: {user}
      {/* {singleResult &&
        singleResult.map((item, i) => (
          <Box key={i}>
            <Text>{item.question}</Text>
            <Text>{item.result}</Text>
            <Text>{item.duration}</Text>
          </Box>
        ))} */}
    </Box>
  );
};

export default Result;
