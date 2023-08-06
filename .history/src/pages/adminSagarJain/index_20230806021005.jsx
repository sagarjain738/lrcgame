import React from "react";
import { useQuery } from "react-query";

const AdminPage = () => {
  const fetchProjects = async () => {
    return fetch("http://localhost:3000/api/results").then((res) => res.json());
  };

  const { data, isLoading } = useQuery({
    queryKey: ["finalResult"],
    queryFn: () => fetchProjects(),
  });
  if (isLoading) return <h1>Loading</h1>;

  console.log(Object.keys(data)[0]);

  //   co(data[Object.keys(data)[0]])

  return <div>index</div>;
};

export default AdminPage;
