import { fetchData, postData } from "../../helpers/crud";
import { Invoice, InvoiceItem } from "../../types";
import { PostInvoicePayload } from "./types";

export async function getInvoiceByUser({
  userId,
}: {
  userId: number;
}): Promise<Invoice[]> {
  const request = `/invoices/byUser`;
  return fetchData({ request, params: [{ name: "userId", value: userId }] });
}

export async function getItemsByInvoice({
  invoiceId,
}: {
  invoiceId: number;
}): Promise<InvoiceItem[]> {
  const request = `/invoices/byId`;
  return fetchData({ request, params: [{ name: "invoiceId", value: invoiceId }] });
}

export async function createNewInvoice(payload: PostInvoicePayload) {
  const request = `/invoice`;
  return postData({ request, payload });
}
