import { useEffect, useState } from "react";
import "./App.css";
import { Box, Button, Text, Heading } from "@chakra-ui/react";
import { Layout } from "./Layout";
import { useAuth } from "./hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
function App() {
  const [data, setData] = useState<string>("Not connected");
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);
  const navigate = useNavigate();
  const authData = useAuth();
  console.log(authData);
  return (
    <Layout>
      <Box>
        {authData?.user ? (
          <Heading>{authData?.user.email}</Heading>
        ) : (
          <>
            <Text>"Vous n'êtes pas conenctés"</Text>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </>
        )}
      </Box>
    </Layout>
  );
}

export default App;
