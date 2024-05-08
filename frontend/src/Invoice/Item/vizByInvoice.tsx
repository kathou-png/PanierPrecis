import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { InvoiceItem, ItemCategory } from "../types";
import { useState } from "react";

const invoiceDefaultList: InvoiceItem[] = [
  {
    id: "1",
    name: "Item 1",
    price: 100,
    quantity: 1,
    total: 100,
    invoiceId: "1",
    category: ItemCategory.AUTRE,
  },
  {
    id: "2",
    name: "Item 2",
    price: 200,
    quantity: 2,
    total: 400,
    invoiceId: "1",
    category: ItemCategory.AUTRE,
  },
  {
    id: "3",
    name: "Item 3",
    price: 300,
    quantity: 3,
    total: 900,
    invoiceId: "1",
    category: ItemCategory.AUTRE,
  },
];

const invoiceByCat: unknown[] = [
  {
    price: 100,
    category: ItemCategory.AUTRE,
  },
  {
    price: 200,
    category: ItemCategory.ANIMALERIE,
  },
  {
    price: 300,
    category: ItemCategory.BEAUTE,
  },
];
// Function to group data by category and calculate sum of prices

export const VizByInvoice = () => {
  const [dataGroup, setDataGroup] = useState("price");
  return (
    <Box>
      <ButtonGroup>
        <Button onClick={() => setDataGroup("byItem")}>By item price</Button>
        <Button onClick={() => setDataGroup("byCategory")}>By category</Button>
      </ButtonGroup>
      <BarChart
        width={730}
        height={250}
        data={dataGroup === "byItem" ? invoiceDefaultList : invoiceByCat}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataGroup === "byItem" ? "name" : "category"} />
        <YAxis />
        <Legend />
        <Bar dataKey={"price"} fill="#82ca9d" />
      </BarChart>
    </Box>
  );
};
