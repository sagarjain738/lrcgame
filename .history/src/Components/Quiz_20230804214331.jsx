import React, { useEffect, useState } from "react";
import axios from "axios";

const Quiz = () => {
  const [question, setQuestions] = useState([]);

  const getRecords = async () => {
    const data = await axios.get("http://localhost:3000/api/game");
    setQuestions(data.data);
  };

  useEffect(() => getRecords(), []);

  return <div>Quiz</div>;
};

export default Quiz;
