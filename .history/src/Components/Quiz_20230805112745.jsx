import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import {
  Box,
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { BeatLoader } from "react-spinners";

const Quiz = () => {
  const [question, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [answer, setAnswer] = useState();

  const fetchProjects = (page = 1) =>
    fetch("http://localhost:3000/api/game?question=" + page).then((res) =>
      res.json()
    );

  const { isLoading, data } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    {
      keepPreviousData: true,
    }
  );

  const mutation = useMutation((newTodo) => {
    return axios.post("http://localhost:3000/api/game", newTodo);
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  useEffect(() => {
    console.log(answer);
  }, [setAnswer]);

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
            <Flex
              key={index}
              m="1.rem 0"
              flexDirection="column"
              height="50%"
              justifyContent="space-between"
              alignItems="center"
              width="50%"
            >
              <Text fontSize="3rem">{item.Question}</Text>
              <Input
                maxWidth="30rem"
                border="2px solid green"
                // size="lg"
                padding="1.5rem"
                width="50%"
                errorBorderColor="crimson"
                placeholder="Type Your answer here"
                _placeholder={{
                  fontSize: "1.2rem",
                }}
                onChange={(a) => setAnswer(a.target.value)}
              />
            </Flex>
          );
        } else {
          return (
            <Box key={index + 1} m="1.7rem 0">
              <Text fontSize="3rem" mb="2rem">
                {item.Question}
              </Text>
              <RadioGroup key={index} onChange={(a) => setAnswer(a)}>
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
        bg="teal.700"
        fontSize="1.2rem"
        _hover={{
          bg: "teal.500",
        }}
        isLoading={false}
        colorScheme="blue"
        spinner={<BeatLoader size={8} color="white" />}
        onClick={handleSubmit}
      >
        Submit Answer
      </Button>
    </Box>
  );
};

export default Quiz;
