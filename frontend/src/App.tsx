import "./App.css";
import { Box, Button, Text, Heading } from "@chakra-ui/react";
import { Layout } from "./Layout";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const authData = useAuth();
  return (
    <Layout>
      <Box>
        {authData?.user ? (
          <Heading>Welcome, {authData.user.username}</Heading>
        ) : (
          <>
            <Text>"You are not logged in"</Text>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </>
        )}
      </Box>
    </Layout>
  );
}

export default App;
