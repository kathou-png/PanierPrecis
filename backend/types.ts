import { Invoice, GroceryStore } from "@prisma/client";

export type PostUserPayload = {
    name: string;
    email: string;
    password: string;
}
export type Product = {
    id    : number;
    title    : string;
    reference    : number;
    categoryId : number
  }
export type Category = {
    id    : number;
    title    : string;
    products : Product[]
  }

export type User = {
    id    : number;
    email    : string;
    createdAt    : Date;
    username    : string;
    invoices : Invoice[]
    groceryStore : GroceryStore[]
  }
