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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const AddInvoiceModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={2} flexDirection="column">
            <Input placeholder="Name" />
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
          <Button variant="solid">Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
