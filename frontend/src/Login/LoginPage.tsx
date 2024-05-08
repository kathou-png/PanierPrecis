import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Box,
} from "@chakra-ui/react";
import { Layout } from "../Layout";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const submitLogin = async () => {
    if (mail !== "" && password !== "") {
      console.log(mail, password);
      try {
        const response = await fetch(
          `http://localhost:3000/login?email=${encodeURIComponent(
            mail
          )}&password=${encodeURIComponent(password)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.json();

        if (res.data) {
          console.log(res);
          if (res.data) {
            await login({ email: mail, password });
            navigate("/invoice");
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("please provide a valid input");
    }
  };
  return (
    <Layout>
      <Box>
        <FormControl width={"50vw"} p={5} justifyContent={"center"}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value as string)}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value as string)}
          />
          <Button mt={4} colorScheme="teal" type="submit" onClick={submitLogin}>
            Submit
          </Button>
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
      </Box>
    </Layout>
  );
};
