import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

const Quiz = () => {
  const [question, setQuestions] = useState([]);

  const getRecords = async () => {
    const data = await axios.get("http://localhost:3000/api/game");
    const aa = await JSON.parse(data.data);
    setQuestions();
  };

  useEffect(() => {
    getRecords();
  }, []);

  if (!question[0]) return <Loading />;

  return (
    <div>
      {question.map((item, index) => {
        if (item.type === "one") {
          return (
            <div key={index}>
              <Text>{item.Question}</Text>
              <Input
                isInvalid
                errorBorderColor="crimson"
                placeholder="Here is a sample placeholder"
              />
            </div>
          );
        } else {
          return (
            <RadioGroup key={index}>
              <Stack direction="row">
                {item.answer.map((option, index2) => (
                  <Radio value="1" key={index + index2}>
                    {option}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          );
        }
      })}
    </div>
  );
};

export default Quiz;
