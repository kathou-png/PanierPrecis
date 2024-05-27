import { Box } from "@chakra-ui/react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getItemsByInvoice } from "../helpers/invoice";
import { Item } from "../../types";

export const VizByInvoice = () => {
  const [itemList, setItemList] = useState<Item[]>([]);
  const { id } = useParams();
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
    <Box>
      <BarChart width={730} height={250} data={itemList}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"title"} />
        <YAxis />
        <Legend />
        <Bar dataKey={"totalPrice"} fill="#82ca9d" />
      </BarChart>
    </Box>
  );
};
