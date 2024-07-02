import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar.tsx";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box height="100vh" width="100vw">
        <Navbar />
        <div className="container">{children}</div>
      </Box>
    </>
  );
};
