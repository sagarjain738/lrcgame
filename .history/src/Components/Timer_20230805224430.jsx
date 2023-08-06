import React from "react";

const Timer = ({ page, setMainTimer, setMainTimerEnabled, mainTimer }) => {
  useEffect(() => {
    setMainTimer(5);
    setMainTimerEnabled(true);

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

  return <div>{mainTimer}</div>;
};

export default Timer;
