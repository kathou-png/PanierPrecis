import { Flex, Box, Button, Image, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.tsx';

export const LandingPage = () => {
  const navigate = useNavigate();
  const authData = useAuth();
  return (
    <Flex gap={2} direction="column" alignItems="center" justifyContent="center">
      <Box>
        <Heading paddingTop="5rem" paddingBottom={'1rem'} fontSize="4rem">Panier Précis</Heading>
        <Heading as="h3" size="xs" paddingBottom={'1rem'}>Contre l'inflation !!!</Heading>
        <Button onClick={() => {
          if (authData?.user) {
            navigate('/invoice');
          } else {
            navigate('/login');
          }
        }}>{authData?.user ? 'Voir mes factures' : 'Me connecter'}</Button>
        <Image src="https://doodleipsum.com/700/hand-drawn?i=0848956581f40974127edddf52b09f66" alt="Dan Abramov" />
      </Box>
    </Flex>
  );
};
