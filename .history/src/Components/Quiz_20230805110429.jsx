import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import {
  Box,
  Button,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";

const Quiz = () => {
  const [question, setQuestions] = useState([]);
  const [page, setPage] = useState(1);

  const getRecords = async () => {
    const data = await axios.get("http://localhost:3000/api/game");
    setQuestions(data.data);
  };

  const fetchProjects = (page = 1) =>
    fetch("http://localhost:3000/api/game?question=" + page).then((res) =>
      res.json()
    );

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["projects", page], () => fetchProjects(page), {
      keepPreviousData: true,
    });

  useEffect(() => {
    // getRecords();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Box
      style={{
        display: "grid",
        placeItems: "center",
        // width: "100%",
        height: "70%",
      }}
    >
      {data.map((item, index) => {
        if (item.type === "one") {
          return (
            <Box key={index} m="1.rem 0">
              <Text fontSize="3rem">{item.Question}</Text>
              <Input
                maxWidth="20rem"
                isInvalid
                size="lg"
                errorBorderColor="crimson"
                placeholder="Here is a sample placeholder"
              />
            </Box>
          );
        } else {
          return (
            <Box key={index + 1} m="1.7rem 0">
              <Text fontSize="3rem" mb="2rem">
                {item.Question}
              </Text>
              <RadioGroup key={index}>
                <Stack direction="column">
                  {item.answer.map((option, index2) => (
                    <Radio value={option} key={index + index2}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
          );
        }
      })}

      <Button
        height="3rem"
        width="15rem"
        bg="red.700"
        _hover={{
          bg: "red.500",
        }}
        isLoading={false}
        colorScheme="blue"
        spinner={<BeatLoader size={8} color="white" />}
      >
        Submit Answer
      </Button>
    </Box>
  );
};

export default Quiz;
