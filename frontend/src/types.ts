
export enum ItemCategory {
  MAISON = "home",
  FRUIT = "fruit",
  LEGUME = "vegetable",
  VIANDE = "meat",
  POISSON = "fish",
  ALCOOL = "alcohol",
  BOISSON = "drink",
  HYGIENE = "hygenic",
  BEAUTE = "beauty",
  EPICERIE_SALEE = "saltedItems",
  EPICERIE_SUCREE = "sweetItems",
  BEBE = "baby",
  ANIMALERIE = "animals",
  BIO = "bio",
  AUTRE = "other",
} 

// users
export type User = {
  id: number;
  username: string;
  password: string;
  email: string; // Assuming email is a new field
  createdAt: Date;
};

// invoices
export type Invoice = {
  id: number;
  title: string;
  userId: number;
  status: string;
  createdAt: Date;
  groceryStore: GroceryStore;
};

// categories
export type Category = {
  id: number;
  title: string;
};

export type InvoiceItem = Item & Product & {
  category : string;
};

// items
export type Item = {
  id: number;
  unitPrice: number;
  totalPrice: number;
  quantity: string;
  invoiceId: number;
  productId: number;
};

// products
export type Product = {
  id: number;
  title: string;
  reference: number;
  createdAt: Date;
  categoryId: number;
};

// grocery_stores
export type GroceryStore = {
  id: number;
  title: string;
  location: string;
};
