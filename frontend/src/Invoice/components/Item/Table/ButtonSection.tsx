import { Tr, Td, Button } from "@chakra-ui/react";
import { addItemToInvoice } from "../helpers/item";
import { InvoiceItem } from "../../../../types";

type Props = {
  addItem: boolean;
  newItem: InvoiceItem;
  invoiceId: number;
  setAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  resetNewItem: () => void;
};
export const ButtonSection = ({
  addItem,
  newItem,
  invoiceId,
  setAddItem,
  resetNewItem,
}: Props) => {
  return (
    <Tr>
      <Td>
        {addItem ? (
          <Button
            size={"sm"}
            onClick={() => {
              setAddItem(false);
              addItemToInvoice({
                unitPrice: newItem.unitPrice,
                totalPrice: newItem.totalPrice,
                quantity: newItem.quantity,
                productReference: newItem.product.reference,
                invoiceId,
              });
              resetNewItem();
            }}
          >
            Créer
          </Button>
        ) : (
          <>
            <Button
              size={"sm"}
              colorScheme='green'
              margin='0'
              onClick={() => {}}
            >
              New product
            </Button>
            <Button
              size={"sm"}
              colorScheme='green'
              margin='0'
              onClick={() => setAddItem(true)}
            >
              Add existing
            </Button>
          </>
        )}
      </Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
    </Tr>
  );
};
