import { Box, Button, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import Loading from "./Loading";
import Timer from "./Timer";

const Quiz = () => {
  const [question, setQuestions] = useState([]);
  const [mainTimerEnabled, setMainTimerEnabled] = useState(true);
  const [mainTimer, setMainTimer] = useState(2);
  const [subTimerEnabled, setSubTimerEnabled] = useState(true);
  const [subTimer, setsubTimer] = useState(2);
  const [page, setPage] = useState(sessionStorage.getItem("page"));
  const [answer, setAnswer] = useState();
  const [user, setUser] = useState(sessionStorage.getItem("username"));
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
      name: user,
      question: parseInt(page),
      result: answer,
    });
    setAnswer("");
    setPage((prev) => +prev + 1);
    sessionStorage.setItem("page", page);
    setMainTimer(5);
    setMainTimerEnabled(true);
  };

  if (isLoading) return <Loading />;
  if (mutation.isLoading) return <Loading />;

  if (mainTimerEnabled)
    return (
      <Timer
        page={page}
        setMainTimer={setMainTimer}
        setMainTimerEnabled={setMainTimerEnabled}
        mainTimer={mainTimer}
      />
    );

  return (
    <Box
      style={{
        display: "grid",
        placeItems: "center",
        height: "70%",
      }}
    >
      {data.map((item, index) => {
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
