import { Tr, Td, Flex } from "@chakra-ui/react";
import { InvoiceItem } from "../../../../types";
type Props = {
  itemList: InvoiceItem[];
};
export const ItemList = ({ itemList }: Props) => {
  return (
    <>
      {itemList.map((item) => (
        <Tr key={item.id}>
          <Td>
            <Flex>{item.product.reference.slice(-5)}</Flex>
          </Td>
          <Td>
            <p>{item.product.title}</p>
          </Td>
          <Td>{item.unitPrice}</Td>
          <Td>{item.quantity}</Td>
          <Td>{item.category.title}</Td>
          <Td>{Number(item.totalPrice / Number(item.quantity)).toFixed(2)}</Td>
        </Tr>
      ))}
    </>
  );
};
