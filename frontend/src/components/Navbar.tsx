import { Button, Flex } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Flex
      flexDirection="row"
      width="100%"
      justifyContent="space-around"
      padding="1rem"
    >
      <div>
        <Link to="/">Home</Link>
      </div>
      {user && (
        <>
          <div>
            <Link to="/invoice">Facture</Link>
          </div>
        
          <Button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
