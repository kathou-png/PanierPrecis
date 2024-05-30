import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createNewInvoice } from "../../helpers/invoice";
import { fetchGroceryStoresByUserId } from "./helpers/groceryStore";
import { GroceryStore, User } from "../../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user : User | null;
}; 
export const AddInvoiceModal = ({ isOpen, onClose, user }: Props) => {
  const [name, setName] = useState("");
  const [groceryStoreList, setGroceryStoreList] = useState<GroceryStore[]>([])
  const [groceryStoreId, setGroceryStoreId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const fetchGroceryStores : GroceryStore[] = await fetchGroceryStoresByUserId({userId: Number(user.id)})
        setGroceryStoreList(fetchGroceryStores);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        // Handle error
      }
    };

    if(user){
      fetchData()
    }
  }, [user]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={2} flexDirection="column">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              placeholder="Select Date and Time"
              size="md"
              onChange={(e) => setGroceryStoreId(Number(e.target.value))}>
              {groceryStoreList.map((item) => (
                <option value={item.id}>{item.title}</option>
              ))}
              </Select>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() =>{
              if(groceryStoreId && name){
              createNewInvoice(
                {
                title : name,
                groceryStoreId : Number(groceryStoreId),
                userId: Number(user?.id),
              })
            }}}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
