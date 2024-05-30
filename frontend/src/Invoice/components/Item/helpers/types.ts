export type PostItemPayload = {
    unitPrice: number;
    totalPrice: number;
    quantity: string;
    categoryId : number;
    productId?: number;
    invoiceId : number;
}