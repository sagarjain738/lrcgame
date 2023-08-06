import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Box, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

const Quiz = () => {
  const [question, setQuestions] = useState([]);

  const getRecords = async () => {
    const data = await axios.get("http://localhost:3000/api/game");
    // const aa = await JSON.parse(data.data);
    setQuestions(data.data);
  };

  useEffect(() => {
    getRecords();
  }, []);

  if (!question[0]) return <Loading />;

  return (
    <Box
      style={{
        display: "grid",
        placeItems: "center",
      }}
    >
      {question.map((item, index) => {
        if (item.type === "one") {
          return (
            <div key={index}>
              <Text>{item.Question}</Text>
              <Input
                maxWidth="20rem"
                isInvalid
                size="lg"
                errorBorderColor="crimson"
                placeholder="Here is a sample placeholder"
              />
            </div>
          );
        } else {
          return (
            <div key={index + 1}>
              <Text>{item.Question}</Text>
              <RadioGroup key={index}>
                <Stack direction="row">
                  {item.answer.map((option, index2) => (
                    <Radio value="1" key={index + index2}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </div>
          );
        }
      })}
    </Box>
  );
};

export default Quiz;
