import React from "react";
import { useQuery } from "react-query";

const AdminPage = () => {
  const fetchProjects = (page = 1) => {
    fetch("http://localhost:3000/api/results" + page).then((res) => res.json());
  };

  const { data } = useQuery({
    queryKey: ["finalResult"],
    queryFn: () => fetchProjects(),
  });
  console.log(data);
  return <div>index</div>;
};

export default AdminPage;
