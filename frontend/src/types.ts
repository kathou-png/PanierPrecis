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
  email: string;
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

// items
export type InvoiceItem = {
  id: number;
  category: Category;
  createdAt: Date;
  invoiceId: number;
  product: Product;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
};

// products
export type Product = {
  id: number;
  category: Category;
  createdAt: Date;
  reference: string;
  title: string;
};

// grocery_stores
export type GroceryStore = {
  id: number;
  location: string;
  title: string;
};
