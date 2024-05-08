import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../Layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { ItemTable } from "./ItemTable";
import { VizByInvoice } from "./vizByInvoice";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Convert the ID to a number (if needed)
  const itemId = parseInt(id, 10);

  return (
    <Layout>
      <ChevronLeftIcon
        position="absolute"
        top="60px"
        left="10px"
        onClick={() => window.history.back()}
      />
      <Heading>Item Page {itemId}</Heading>

      <ItemTable />
      <VizByInvoice />
      <Button onClick={() => navigate("/dataviz")}>See total analysis</Button>
    </Layout>
  );
};
