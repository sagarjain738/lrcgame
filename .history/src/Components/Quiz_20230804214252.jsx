import React, { useEffect, useState } from "react";
import axios from "axios";

const Quiz = () => {
  const [question, setQuestions] = useState([]);

  const getRecords = async () => {
    const data = axios.get("http://localhost:3000/api/game");
  };

  useEffect(() => {}, []);

  return <div>Quiz</div>;
};

export default Quiz;
