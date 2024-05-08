import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../Layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { ItemTable } from "./ItemTable";
import { VizByInvoice } from "./vizByInvoice";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { InvoiceItem } from "../../types/types";
import { getItemsByInvoice } from "../helpers/invoice";

export const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [itemList, setItemList] = useState<InvoiceItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedItems = await getItemsByInvoice({
          invoiceId: Number(id) || 0,
        });
        console.log(fetchedItems);
        setItemList(fetchedItems);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        // Handle error
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <ChevronLeftIcon
        position="absolute"
        top="60px"
        left="10px"
        onClick={() => window.history.back()}
      />
      <Heading>Item Page {id}</Heading>

      <ItemTable itemList={itemList} />
      <VizByInvoice />
      <Button onClick={() => navigate("/dataviz")}>See total analysis</Button>
    </Layout>
  );
};
