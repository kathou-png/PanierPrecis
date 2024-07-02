export type PostInvoicePayload = {
  title: string;
  userId: number;
  groceryStoreId: number;
  pdfFile : File | undefined;
};
