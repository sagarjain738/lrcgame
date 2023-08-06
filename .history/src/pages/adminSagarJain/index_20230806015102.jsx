import React from "react";
import { useQuery } from "react-query";

const index = () => {
  const {} = useQuery({
    queryKey: ["finalResult"],
  });

  return <div>index</div>;
};

export default index;
