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
} from "@chakra-ui/react";
import { createNewInvoice } from "../helpers/invoice";
import { useState } from "react";
import { useParams } from "react-router";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const AddInvoiceModal = ({ isOpen, onClose }: Props) => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [markplaceId, setMarketplaceId] = useState(0);
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
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
            <Input placeholder="market place" />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="solid"
            onClick={() =>
              createNewInvoice({
                name,
                userId: Number(userId) || 0,
                marketplaceId: 1,
              })
            }
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
