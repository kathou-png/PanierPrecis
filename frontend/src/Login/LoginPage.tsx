import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Box,
} from "@chakra-ui/react";
import { Layout } from "../Layout";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getAllUsers, submitLogin } from "./helpers/users";
import { User } from "../types";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error
      }
    };

    fetchData();
  }, []); // Empty dependency array to only run once on mount

  return (
    <Layout>
      <Box>
        <FormControl width={"50vw"} p={5} justifyContent={"center"}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value as string)}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value as string)}
          />
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            onClick={() => submitLogin({ email, password, login, navigate })}
          >
            Submit
          </Button>
          <FormHelperText>We'll never share your email.</FormHelperText>
          {users.map((user) => (
            <Button
              onClick={() =>
                submitLogin({
                  email: user.email,
                  password: user.password,
                  login,
                  navigate,
                })
              }
            >
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.password}</p>
            </Button>
          ))}
        </FormControl>
      </Box>
    </Layout>
  );
};
