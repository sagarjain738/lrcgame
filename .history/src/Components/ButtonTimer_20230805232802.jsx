import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const ButtonTimer = ({
  page,
  setMainTimer,
  setMainTimerEnabled,
  mainTimer,
}) => {
  useEffect(() => {
    let times = setInterval(() => {
      setMainTimer((prev) => {
        if (prev <= 0) {
          clearInterval(times);
          setMainTimer(0);
          setMainTimerEnabled(false);
          return;
        }
        return prev - 1;
      });
    }, 2000);

    return () => clearInterval(times);
  }, [page]);

  return (
    <Box width="100vw" height="50vh" display="grid" placeItems="center">
      <Text fontSize="20rem">{mainTimer}</Text>
    </Box>
  );
};

export default ButtonTimer;
