import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { Input } from "postcss";

const Quiz = () => {
  const [question, setQuestions] = useState([]);

  const getRecords = async () => {
    const data = await axios.get("http://localhost:3000/api/game");
    console.log(data.data);
    setQuestions(data.data);
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
            <>
              <Text>{item.Question}</Text>
              <Input
                isInvalid
                errorBorderColor="crimson"
                placeholder="Here is a sample placeholder"
              />
            </>
          );
        }
      })}
    </div>
  );
};

export default Quiz;
