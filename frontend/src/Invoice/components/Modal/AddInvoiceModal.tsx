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
import { useState } from "react";
import { createNewInvoice } from "../../helpers/invoice";
import { User } from "../../../types";
import { useInvoice } from "../../helpers/hooks/useInvoice";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
};
export const AddInvoiceModal = ({ isOpen, onClose, user }: Props) => {
  const [name, setName] = useState("");
  const [groceryStoreId, setGroceryStoreId] = useState(0);
  const { groceryStores } = useInvoice();
  console.log(groceryStores);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={2} flexDirection='column'>
            <Input
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              placeholder='Select Date and Time'
              size='md'
              onChange={(e) => setGroceryStoreId(Number(e.target.value))}
            >
              {groceryStores.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </Select>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              if (groceryStoreId && name) {
                createNewInvoice({
                  title: name,
                  groceryStoreId: Number(groceryStoreId),
                  userId: Number(user?.id),
                });
              }
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
