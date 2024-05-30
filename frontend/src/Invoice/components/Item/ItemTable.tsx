import {
  TableContainer,
  Table,
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addItemToInvoice, fetchAllCategories } from "./helpers/item";
import { InvoiceItem, Category } from "../../../types";

type Props = {
  itemList: InvoiceItem[];
  invoiceId : number;
};
export const ItemTable = ({ itemList, invoiceId }: Props) => {
  const [newItem, setNewItem] = useState<InvoiceItem>({
        // Properties from Item type
      id: 0,
      unitPrice: 10,
      totalPrice: 1000,
      quantity: '3',
      invoiceId: 0,
      productId: 0,
      // Properties from Product type
      title: 'test',
      reference: 0,
      createdAt: new Date(),
      categoryId: 0,
      category : ""
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProductModal, setNewProductModal] = useState(false);
  const [existingProductModal, setExistingProductModal] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetchAllCategories();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();

    // Cleanup function if needed
    return () => {
      // Cleanup code here
    };
  }, []); // Empty dependency array to fetch categories only once

  const [addItem, setAddItem] = useState(false);
  return (
    <Box maxH="400px" overflowY="auto">
    <TableContainer margin={"2"} width={"100%"}>
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

        {addItem && (
            <Tr>
              <Td>
                <Input
                  isInvalid={newItem.title === ""}
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                />
              </Td>
              <Td>
                <InputGroup>
                  <Input
                    isInvalid={newItem.totalPrice <= 0}
                    value={newItem.totalPrice}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        totalPrice: parseFloat(
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
                  isInvalid={newItem.quantity <= '0'}
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: String(
                        e.target.value === "" ? "0" : e.target.value
                      ),
                    })
                  }
                />
              </Td>
              <Td>
                <Select placeholder="Select option" onChange={(e) => setNewItem({ ...newItem, categoryId: Number(e.target.value) })} value={newItem.categoryId}>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>{item.title} {item.id}</option>
                  ))}
                </Select>
              </Td>
              <Td>{Number(newItem.totalPrice / Number(newItem.quantity)).toFixed(2)}</Td>
            </Tr>
          )}
          {itemList.map((item) => (
            <Tr key={item.id}>
              <Td>{item.title}</Td>
              <Td>{item.unitPrice}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.category}</Td>
              <Td>{item.totalPrice / Number(item.quantity)}</Td>
            </Tr>
          ))}
          <Tr>
            <Td>
              {addItem ? (
                <Button
                  size={"sm"}
                  onClick={() => {
                    // setInvoiceList([...invoiceList, newItem]);
                    setAddItem(false);
                    addItemToInvoice(
                      {
                      unitPrice: newItem.unitPrice,
                      totalPrice: newItem.totalPrice,
                      quantity: newItem.quantity,
                      productId : 1,
                      categoryId : newItem.categoryId,
                      invoiceId
                    });
                  }}
                >
                  Créer
                </Button>
              ) : (
                <>
                <Button
                  size={"sm"}
                  colorScheme="green"
                  margin="0"
                  onClick={() => setNewProductModal(true)}
                >
                  New product
                </Button>
                 <Button
                 size={"sm"}
                 colorScheme="green"
                 margin="0"
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
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
    <Modal isOpen={newProductModal} onClose={() => setNewProductModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ici rentrer le nv produit
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => setNewProductModal(false)}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => setNewProductModal(false)}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={existingProductModal} onClose={() => setExistingProductModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ici rentrer le nv produit
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => setNewProductModal(false)}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => setNewProductModal(false)}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
  );
};
