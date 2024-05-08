import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getItemsByInvoice } from "../helpers/invoice";
import { InvoiceItem } from "../../types/types";

export const VizByInvoice = () => {
  const [dataGroup, setDataGroup] = useState("price");
  const [itemList, setItemList] = useState<InvoiceItem[]>([]);
  const { id } = useParams();
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
    <Box>
      <ButtonGroup>
        <Button onClick={() => setDataGroup("byItem")}>By item price</Button>
        <Button onClick={() => setDataGroup("byCategory")}>By category</Button>
      </ButtonGroup>
      <BarChart width={730} height={250} data={itemList}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataGroup === "byItem" ? "name" : "category"} />
        <YAxis />
        <Legend />
        <Bar dataKey={"price"} fill="#82ca9d" />
      </BarChart>
    </Box>
  );
};
