import React from "react";
import { useQuery } from "react-query";

const AdminPage = () => {
  const fetchProjects = (page = 1) =>
    fetch("http://localhost:3000/api/game?question=" + page).then((res) =>
      res.json()
    );

  const {} = useQuery({
    queryKey: ["finalResult"],
    queryFn: fetchProjects,
  });

  return <div>index</div>;
};

export default AdminPage;
