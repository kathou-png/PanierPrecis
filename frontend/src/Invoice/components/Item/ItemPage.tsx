import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Heading, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../../Layout";
import { InvoiceItem } from "../../../types";
import { deleteInvoice, getItemsByInvoice } from "../../helpers/invoice";
import { ItemTable } from "./ItemTable";
import { VizByInvoice } from "./vizByInvoice";


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

      <ItemTable itemList={itemList} invoiceId={Number(id)}/>
      <VizByInvoice />
      <Button onClick={() => navigate("/dataviz")}>See total analysis</Button>
      <Button onClick={() => deleteInvoice(Number(id))}>Delete invoice</Button>
    </Layout>
  );
};