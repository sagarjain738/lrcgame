import React from "react";

const Timer = ({ page }) => {
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
  }, []);

  return <div>Timer</div>;
};

export default Timer;