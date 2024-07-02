from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class InvoiceBase(BaseModel):
    title: str
    user_id: int
    grocery_store_id: int


class InvoiceCreate(InvoiceBase):
    pass


class Invoice(InvoiceBase):
    id: int
    created_at: datetime
    last_edited_date: Optional[str]
    user: User
    grocery_store: Optional[str] = None
    items: Optional[List['Item']] = []

    class Config:
        orm_mode = True


class ItemBase(BaseModel):
    invoice_id: int
    product_id: int
    quantity: int
    total_price: int
    unit_price: int


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    invoice: Optional[Invoice]
    product: Optional['Product']

    class Config:
        orm_mode = True


class ProductBase(BaseModel):
    title: str
    reference: str
    category_id: int
    user_id: int


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int
    created_at: datetime
    user: Optional['User']
    category: Optional[str] = None
    items: Optional[List['Item']] = []

    class Config:
        orm_mode = True


class GroceryStoreBase(BaseModel):
    title: str
    location: str
    user_id: int


class GroceryStoreCreate(GroceryStoreBase):
    pass


class GroceryStore(GroceryStoreBase):
    id: int
    invoices: Optional[List[Invoice]] = []
    user: Optional['User']

    class Config:
        orm_mode = True


class CategoryBase(BaseModel):
    title: str


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int
    products: Optional[List['Product']] = []

    class Config:
        orm_mode = True
