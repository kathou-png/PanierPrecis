import {
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { InvoiceItem } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const itemsList: InvoiceItem[] = [
  {
    id: "1",
    name: "Item 1",
    price: 100,
    quantity: 1,
    total: 100,
    invoiceId: "1",
  },
  {
    id: "2",
    name: "Item 2",
    price: 200,
    quantity: 2,
    total: 400,
    invoiceId: "1",
  },
];

export const EditInvoiceModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={2} flexDirection="column">
            <Grid gap={2}>
              {itemsList.map((item) => (
                <GridItem>
                  <Flex
                    key={item.id}
                    gap={2}
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Input placeholder="Item Name" value={item.name} />
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="solid">Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
