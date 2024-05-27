import { fetchData, postData } from "../../../helpers/crud";
import { Category } from "../../../types";
import { PostItemPayload } from "./types";

export async function addItemToInvoice( payload: PostItemPayload) {
  const request = `/invoice/newItem`;
  return postData({ request, payload });
}

export async function fetchAllCategories(): Promise<Category[]> {
    const request = `/categories`;
    return fetchData({ request});
  }
  