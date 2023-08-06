import { Box, Button, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import Loading from "./Loading";
import Timer from "./Timer";
import ButtonTimer from "./ButtonTimer";
import SubmitTimer from "./SubmitTimer";

const Quiz = () => {
  const [question, setQuestions] = useState([]);
  const [mainTimerEnabled, setMainTimerEnabled] = useState(true);
  const [mainTimer, setMainTimer] = useState(2);
  const [subTimerEnabled, setSubTimerEnabled] = useState(false);
  const [subTimer, setSubTimer] = useState(0);
  const [submitTimerEnabled, setSubmitTimerEnabled] = useState(false);
  const [submitTimer, setSubmitTimer] = useState(0);
  const [page, setPage] = useState(sessionStorage.getItem("page"));
  const [answer, setAnswer] = useState("");
  const [enableWarning, setEnableWarning] = useState(false);
  const [user, setUser] = useState(sessionStorage.getItem("username"));
  const [showResult, setShowResult] = useState(false);

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
      duration: parseInt(10 - submitTimer),
    });
    if (page == 5) {
      setShowResult(true);
      return;
    }
    setAnswer("");
    setPage((prev) => +prev + 1);
    sessionStorage.setItem("page", page);
    setMainTimer(5);
    setMainTimerEnabled(true);
    setSubTimer(0);
    setSubTimerEnabled(false);
    setSubmitTimer(0);
    setSubmitTimerEnabled(false);
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
        setSubTimer={setSubTimer}
        setSubTimerEnabled={setSubTimerEnabled}
      />
    );

  {
    showResult && (
      <Box
        style={{
          display: "grid",
          placeItems: "center",
          height: "50%",
          padding: "0 2rem",
        }}
      >
        {/* Radio Buttons */}
        {data.map((item, index) => {
          return (
            <Box key={index + 1} m="1.7rem 0">
              <Text fontSize="3rem" mb="2rem">
                {item.Question}
              </Text>
              <RadioGroup key={index} onChange={(a) => setAnswer(a)}>
                <Stack direction="column">
                  {item.options.map((option, index2) => {
                    return (
                      <Radio value={option} key={index + index2}>
                        {option}
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </Box>
          );
        })}

        {/* Timer For Submitting Answer */}
        {submitTimerEnabled && (
          <SubmitTimer
            page={page}
            setSubmitTimer={setSubmitTimer}
            setSubmitTimerEnabled={setSubmitTimerEnabled}
            submitTimer={submitTimer}
            handleSubmit={handleSubmit}
          />
        )}

        {/* Timer To Read Question */}
        {subTimerEnabled && (
          <ButtonTimer
            page={page}
            setSubTimer={setSubTimer}
            setSubTimerEnabled={setSubTimerEnabled}
            subTimer={subTimer}
            setSubmitTimer={setSubmitTimer}
            setSubmitTimerEnabled={setSubmitTimerEnabled}
            setEnableWarning={setEnableWarning}
          />
        )}

        {!subTimerEnabled && (
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
            isDisabled={!answer}
          >
            Submit Answer
          </Button>
        )}

        {!answer && enableWarning && (
          <Text mt="2rem" color="red">
            Please Select an Answer
          </Text>
        )}
      </Box>
    );
  }

  {
    !showResult && <Text>Result To Be Shown Here</Text>;
  }
};

export default Quiz;
