import React from "react";
import { useQuery } from "react-query";

const AdminPage = () => {
  const fetchProjects = async () => {
    return fetch("http://localhost:3000/api/results").then((res) => res.json());
  };

  const { data } = useQuery({
    queryKey: ["finalResult"],
    queryFn: () => fetchProjects(),
  });

  console.log(Object?.keys(data));

  //   console.log(data[]);

  return <div>index</div>;
};

export default AdminPage;
