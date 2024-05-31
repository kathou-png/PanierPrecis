import { postData, fetchData, deleteData } from "../../../../helpers/crud";
import { Category } from "../../../../types";
import { PostItemPayload } from "./types";

export async function addItemToInvoice(payload: PostItemPayload) {
  const request = `/invoice/newItem`;
  return postData({ request, payload });
}

type DeleteItemPayload = {
  id: number;
  invoiceId: number;
};
export async function deleteItemFromInvoice(payload: DeleteItemPayload) {
  const request = `/invoice/item`;
  return deleteData({
    request,
    payload: [
      { name: "id", value: payload.id },
      { name: "invoiceId", value: payload.invoiceId },
    ],
  });
}

export async function fetchAllCategories(): Promise<Category[]> {
  const request = `/categories`;
  return fetchData({ request });
}
