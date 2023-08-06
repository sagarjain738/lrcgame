import React from "react";

const Timer = () => {
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
  }, [page, setPage]);
  return <div>Timer</div>;
};

export default Timer;
