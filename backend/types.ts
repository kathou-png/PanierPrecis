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