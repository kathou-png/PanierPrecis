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
          <Heading>{authData?.user.email}</Heading>
        ) : (
          <>
            <Text>"Vous n'êtes pas connectés"</Text>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </>
        )}
      </Box>
    </Layout>
  );
}

export default App;
