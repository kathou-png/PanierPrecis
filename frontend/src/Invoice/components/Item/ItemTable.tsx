import { TableContainer, Table, Tbody, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InvoiceItem } from "../../../types";
import { Header } from "./Table/Header";
import { ExistingProductLine } from "./Table/ExistingProductLine";
import { ItemList } from "./Table/ItemList";
import { ButtonSection } from "./Table/ButtonSection";
import { useInvoice } from "../../helpers/hooks/useInvoice";
import { getItemsByInvoice } from "../../helpers/invoice";

type Props = {
  invoiceId: number;
};
export const ItemTable = ({ invoiceId }: Props) => {
  const { categories, productList } = useInvoice();
  const [newItem, setNewItem] = useState<InvoiceItem>({
    id: 0,
    category: categories[0],
    createdAt: new Date(),
    invoiceId: 0,
    product: productList[0],
    quantity: 0,
    totalPrice: 0,
    unitPrice: 0,
  });
  const [itemList, setItemList] = useState<InvoiceItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedItems = await getItemsByInvoice({
          invoiceId: invoiceId,
        });
        console.log(
          fetchedItems.map((item) => ({
            ...item,
            invoiceId: invoiceId,
            category:
              categories.find((category) => category.title === item.category) ??
              categories[0],
            product:
              productList.find(
                (product) => product.reference === item.reference
              ) ?? productList[0],
          }))
        );

        setItemList(
          fetchedItems.map((item) => ({
            ...item,
            invoiceId: invoiceId,
            category:
              categories.find((category) => category.title === item.category) ??
              categories[0],
            product:
              productList.find(
                (product) => product.reference === item.reference
              ) ?? productList[0],
          }))
        );
      } catch (error) {
        console.error("Error fetching invoices:", error);
        // Handle error
      }
    };
    if (categories.length > 0 && productList.length > 0) {
      fetchData();
    }
  }, [categories, productList, invoiceId]);
  const [addItem, setAddItem] = useState(false);
  return (
    <Box maxH='400px' overflowY='auto'>
      <TableContainer margin={"2"} width={"100%"}>
        <Table variant='simple'>
          <Header />
          <Tbody>
            <ButtonSection
              addItem={addItem}
              newItem={newItem}
              invoiceId={invoiceId}
              setAddItem={setAddItem}
              resetNewItem={() =>
                setNewItem({
                  id: 0,
                  category: categories[0],
                  createdAt: new Date(),
                  invoiceId: 0,
                  product: productList[0],
                  quantity: 0,
                  totalPrice: 0,
                  unitPrice: 0,
                })
              }
            />
            {addItem && (
              <ExistingProductLine newItem={newItem} setNewItem={setNewItem} />
            )}
            <ItemList itemList={itemList} />
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
