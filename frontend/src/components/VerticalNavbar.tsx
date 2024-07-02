import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const VerticalNavbar = () => {
  const navigate = useNavigate()
  return (
    <Flex
      flexDirection="column"
      width="25vw"
      padding="1rem"
      height="100vh"
      justifyContent="flex-start"
      backgroundColor="#F7FAFC"
    >
      <Heading color="#718096" fontSize={"2xl"} padding="1rem"> Panier Précis</Heading>
      <Button margin="1rem 0" onClick={()=>  navigate("/")}>Accueil</Button>
      <Button margin="1rem 0"  onClick={()=>  navigate("/")}>Produits</Button>
      <Button margin="1rem 0"  onClick={()=>  navigate("/invoice")}>Factures</Button>
      <Button margin="1rem 0"  onClick={()=>  navigate("/")}>Paramètres</Button>
    </Flex>
  );
};

export default VerticalNavbar;
