import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Button,
} from "@chakra-ui/react";
import { InvoiceItem, ItemCategory } from "../../types/types";
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
];

type Props = {
  itemList: InvoiceItem[];
};
export const ItemTable = ({ itemList }: Props) => {
  const [newItem, setNewItem] = useState<InvoiceItem>({
    id: "",
    name: "new item",
    price: 10,
    quantity: 1,
    total: 0,
    invoiceId: "",
    category: ItemCategory.AUTRE,
  });
  const [addItem, setAddItem] = useState(false);
  return (
    <TableContainer margin={"2"} width={"80%"}>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>price</Th>
            <Th>Quantity</Th>
            <Th>Category</Th>
            <Th>Price per unit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {itemList.map((invoice) => (
            <Tr key={invoice.id}>
              <Td>{invoice.name}</Td>
              <Td>{invoice.price}</Td>
              <Td>{invoice.quantity}</Td>
              <Td>{invoice.category}</Td>
              <Td>{invoice.price / invoice.quantity}</Td>
            </Tr>
          ))}
          {addItem && (
            <Tr>
              <Td>
                <Input
                  isInvalid={newItem.name === ""}
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </Td>
              <Td>
                <InputGroup>
                  <Input
                    isInvalid={newItem.price <= 0}
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: parseFloat(
                          e.target.value === "" ? "0" : e.target.value
                        ),
                      })
                    }
                  />
                  <InputRightElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                  >
                    $
                  </InputRightElement>
                </InputGroup>
              </Td>

              <Td>
                <Input
                  isInvalid={newItem.quantity <= 0}
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: parseFloat(
                        e.target.value === "" ? "0" : e.target.value
                      ),
                    })
                  }
                />
              </Td>
              <Td>
                <Select placeholder="Select option">
                  {Object.keys(ItemCategory).map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
              </Td>
              <Td>{newItem.price / newItem.quantity}</Td>
            </Tr>
          )}
          <Tr>
            <Td>
              {addItem ? (
                <Button
                  size={"sm"}
                  onClick={() => {
                    setInvoiceList([...invoiceList, newItem]);
                    setAddItem(false);
                    setNewItem({
                      id: "",
                      name: "",
                      price: 0,
                      quantity: 0,
                      total: 0,
                      invoiceId: "",
                      category: ItemCategory.AUTRE,
                    });
                  }}
                >
                  Créer
                </Button>
              ) : (
                <Button
                  size={"sm"}
                  colorScheme="green"
                  margin="0"
                  onClick={() => setAddItem(true)}
                >
                  Add item
                </Button>
              )}
            </Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
