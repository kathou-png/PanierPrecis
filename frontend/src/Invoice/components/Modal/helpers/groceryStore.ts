import { fetchData } from "../../../../helpers/crud";
import { GroceryStore } from "../../../../types";

export async function fetchGroceryStoresByUserId({
  userId,
}: {
  userId: number;
}): Promise<GroceryStore[]> {
  const request = `/groceryStores/byUserId`;
  return fetchData({ request, params: [{ name: "userId", value: userId }] });
}
