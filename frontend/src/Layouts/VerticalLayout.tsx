import { Box, Flex } from '@chakra-ui/react';
import VerticalNavbar from '../components/VerticalNavbar.tsx';

export const VerticalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box height="100vh" width="10vw">
      <Flex direction="row" height="100vh" width="100vw">
        <VerticalNavbar />
        <Box className="container" width='100%'>{children}</Box>
      </Flex>
    </Box>
  );
};
