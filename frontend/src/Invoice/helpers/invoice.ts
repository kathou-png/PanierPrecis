import { fetchData } from "../../helpers/fetchData";
import { Invoice, InvoiceItem } from "../../types/types";

export async function getInvoiceByUser({
  userId,
}: {
  userId: number;
}): Promise<Invoice[]> {
  const url = `http://localhost:3000/invoices/byUser`;
  return fetchData({ url, params: [{ name: "userId", value: userId }] });
}

export async function getItemsByInvoice({
  invoiceId,
}: {
  invoiceId: number;
}): Promise<InvoiceItem[]> {
  const url = `http://localhost:3000/items/byInvoice`;
  return fetchData({ url, params: [{ name: "invoiceId", value: invoiceId }] });
}
