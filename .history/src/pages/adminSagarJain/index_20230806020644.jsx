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

  for (let item in data) {
    console.log(item);
  }

  return <div>index</div>;
};

export default AdminPage;
