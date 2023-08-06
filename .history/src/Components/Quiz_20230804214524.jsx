import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Text } from "@chakra-ui/react";

const Quiz = () => {
  const [question, setQuestions] = useState([]);

  const getRecords = async () => {
    const data = await axios.get("http://localhost:3000/api/game");
    setQuestions(data.data);
  };

  useEffect(() => getRecords(), []);

  if (!question[0]) return <Loading />;

  return (
    <div>
      {question.map((item) => {
        if (item.type === "one") {
          return (
            <>
              <Text>{item.Question}</Text>
            </>
          );
        }
      })}
    </div>
  );
};

export default Quiz;