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
import { useRouter } from "next/router";

const Quiz = () => {
  const [question, setQuestions] = useState([]);
  const [mainTimerEnabled, setMainTimerEnabled] = useState(true);
  const [mainTimer, setMainTimer] = useState(5);
  const [page, setPage] = useState(sessionStorage.getItem("page"));
  const [answer, setAnswer] = useState();
  const [user, setUser] = useState("");
  const router = useRouter();

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
    mutation.mutate({
      name: "Sagarjain738",
      question: page,
      result: answer,
    });
    setAnswer("");
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    let times = setInterval(() => {
      setMainTimer((prev) => {
        if (prev <= 0) clearInterval(times);
        return prev - 1;
      });
    }, 2000);

    return () => clearInterval(times);
  }, []);

  if (isLoading) return <Loading />;
  if (mutation.isLoading) return <Loading />;

  if (mainTimerEnabled) return <Text>{mainTimer}</Text>;

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
