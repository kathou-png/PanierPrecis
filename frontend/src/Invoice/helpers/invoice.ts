import { deleteData, fetchData, postData } from "../../helpers/crud";
import { Invoice, Product } from "../../types";
import { PostInvoicePayload } from "./types";

export async function getInvoiceByUser({
  userId,
}: {
  userId: number;
}): Promise<Invoice[]> {
  const request = `/invoices/byUser`;
  return fetchData({ request, params: [{ name: "userId", value: userId }] });
}

type PayloadItems = {
  id: number;
  category: string;
  reference: string;
  quantity: number;
  createdAt: Date;
  totalPrice: number;
  unitPrice: number;
};
export async function getItemsByInvoice({
  invoiceId,
}: {
  invoiceId: number;
}): Promise<PayloadItems[]> {
  const request = `/invoices/byId`;
  return fetchData({
    request,
    params: [{ name: "invoiceId", value: invoiceId }],
  });
}

export async function getProductsByUser({
  userId,
}: {
  userId: number;
}): Promise<Product[]> {
  const request = `/products/byUserId`;
  return fetchData({
    request,
    params: [{ name: "userId", value: userId }],
  });
}

export async function createNewInvoice(payload: PostInvoicePayload) {
  const request = `/invoice`;
  return postData({ request, payload });
}

export async function deleteInvoice(payload: number) {
  const request = `/invoice`;
  return deleteData({
    request,
    payload: [{ name: "invoiceId", value: payload }],
  });
}
