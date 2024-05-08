import { Box, Button } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box height="100vh" width="100vw">
        <Navbar />
        <div className="container">{children}</div>
      </Box>
    </>
  );
};
