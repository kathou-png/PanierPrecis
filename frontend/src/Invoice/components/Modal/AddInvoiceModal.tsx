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
import { useEffect, useState } from 'react';
import { createNewInvoice, getItemsByInvoice } from '../../helpers/invoice';
import { User } from "../../../types";
import { useInvoice } from "../../helpers/hooks/useInvoice";
import DropZone from './DropZone.tsx';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
};

export const AddInvoiceModal = ({ isOpen, onClose, user }: Props) => {
  const [name, setName] = useState("");
  const [dataType, setDataType] = useState('pdf');
  const [pdfFile, setPdfFile] = useState<any>(undefined);
  const [groceryStoreId, setGroceryStoreId] = useState(0);
  const { groceryStores } = useInvoice();
  useEffect(() => {
   console.log(pdfFile)
  }, [pdfFile]);


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new invoice</ModalHeader>
        <Flex justifyItems="center" padding="2rem" gap={2}>
          <Button onClick={()=> setDataType('pdf')} isActive={dataType  == "pdf"}>PDF</Button>
          <Button onClick={()=> setDataType('manual')} isActive={dataType  == "manual"}>Manual</Button>
        </Flex>
        {dataType == "pdf" && (<DropZone pdfFile={pdfFile} setPdfFile={setPdfFile}/>)}
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
                  pdfFile : pdfFile as File
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
