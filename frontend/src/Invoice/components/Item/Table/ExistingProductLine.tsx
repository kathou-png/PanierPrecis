import {
  Tr,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Td,
} from "@chakra-ui/react";
import { InvoiceItem } from "../../../../types";
import { useInvoice } from "../../../helpers/hooks/useInvoice";

type Props = {
  newItem: InvoiceItem;
  setNewItem: React.Dispatch<React.SetStateAction<InvoiceItem>>;
};

export const ExistingProductLine = ({ newItem, setNewItem }: Props) => {
  const { categories, productList } = useInvoice();

  return (
    <Tr>
      <Td>
        <p>{newItem.product?.reference}</p>
      </Td>
      <Td>
        <Select
          placeholder='Select Reference'
          onChange={(e) =>
            setNewItem({
              ...newItem,
              product:
                productList.find((item) => item.title === e.target.value) ||
                productList[0],
              category:
                productList.find((item) => item.title === e.target.value)
                  ?.category || categories[0],
            })
          }
          value={newItem.product?.title}
        >
          {productList.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
        </Select>
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
            pointerEvents='none'
            color='gray.300'
            fontSize='1.2em'
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
              quantity: Number(e.target.value),
            })
          }
        />
      </Td>
      <Td>
        <p>{newItem.category?.title}</p>
      </Td>
      <Td>
        {Number(newItem.totalPrice / Number(newItem.quantity)).toFixed(2) || 0}
      </Td>
    </Tr>
  );
};
