import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const SubmitTimer = ({
  page,
  setSubmitTimer,
  setSubmitTimerEnabled,
  subTimer,
}) => {
  useEffect(() => {
    let times = setInterval(() => {
      setSubmitTimer((prev) => {
        if (prev <= 0) {
          clearInterval(times);
          setSubmitTimer(0);
          setSubmitTimerEnabled(false);
          return;
        }
        return prev - 1;
      });
    }, 2000);

    return () => clearInterval(times);
  }, [page]);

  return (
    <Box width="100vw" height="50vh" display="grid" placeItems="center">
      <Text fontSize="2rem">{subTimer}</Text>
    </Box>
  );
};

export default SubmitTimer;
