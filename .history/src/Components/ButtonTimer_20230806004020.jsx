import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const ButtonTimer = ({ page, setsubTimer, setSubTimerEnabled, subTimer }) => {
  useEffect(() => {
    let times = setInterval(() => {
      setsubTimer((prev) => {
        if (prev <= 0) {
          clearInterval(times);
          setsubTimer(0);
          setSubTimerEnabled(false);
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

export default ButtonTimer;