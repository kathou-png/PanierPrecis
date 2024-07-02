import { createContext, useContext, useEffect, useMemo } from "react";
import { Category, GroceryStore, Product } from "../../../types";
import { fetchGroceryStoresByUserId } from "../../components/Modal/helpers/groceryStore";
import { getProductsByUser } from "../invoice";
import { fetchAllCategories } from "../../components/Item/helpers/item";
import useSWR from "swr";
const InvoiceContext = createContext<InvoiceContextType>({
  groceryStores: [],
  productList: [],
  categories: [],
});

export type InvoiceContextType = {
  groceryStores: GroceryStore[];
  productList: Product[];
  categories: Category[];
};

export const InvoiceProvider = ({
  children,
  userId,
}: {
  children?: React.ReactNode;
  userId: number;
}) => {
  const { data: groceryStores } = useSWR("/groceryStores/byUserId", () =>
    fetchGroceryStoresByUserId({ userId })
  );
  const { data: productList } = useSWR("/products/byUserId", () =>
    getProductsByUser({ userId })
  );
  const { data: categories } = useSWR("/categories", () =>
    fetchAllCategories()
  );
  useEffect;
  const value: InvoiceContextType = useMemo(
    () => ({
      groceryStores: groceryStores || [],
      productList: productList || [],
      categories: categories || [],
    }),
    [groceryStores, productList, categories]
  );
  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceContextType => {
  return useContext(InvoiceContext);
};
