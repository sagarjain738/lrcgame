import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const AdminPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const fetchProjects = async () => {
    return fetch("http://localhost:3000/api/results").then((res) => res.json());
  };

  const { data, isLoading } = useQuery({
    queryKey: ["finalResult"],
    queryFn: () => fetchProjects(),
  });

  useEffect(() => {
    setAllUsers(Object.keys(data));
  }, [data]);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div>
      {allUsers.map((item, i) => (
        <Text key={i}>{item}</Text>
      ))}
    </div>
  );
};

export default AdminPage;
