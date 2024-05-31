import { Thead, Tr, Th } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Thead>
      <Tr>
        <Th>Reference</Th>
        <Th>name</Th>
        <Th>price</Th>
        <Th>Quantity</Th>
        <Th>Category</Th>
        <Th>Price per unit</Th>
      </Tr>
    </Thead>
  );
};
