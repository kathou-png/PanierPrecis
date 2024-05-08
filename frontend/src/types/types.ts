export type Invoice = {
  id: string;
  name: string;
  lastEditedDate: Date;
  marketPlace: string;
};

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

export type InvoiceItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  invoiceId: string;
  category: ItemCategory;
};
export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
