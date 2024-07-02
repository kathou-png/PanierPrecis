from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

from src.config.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime, default=func.now())
    email = Column(String, unique=True, index=True)
    password = Column(String)
    username = Column(String)
    invoices = relationship("Invoice", back_populates="user")
    grocery_stores = relationship("GroceryStore", back_populates="user")
    products = relationship("Product", back_populates="user")

class Invoice(Base):
    __tablename__ = 'invoices'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime, default=func.now())
    title = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    grocery_store_id = Column(Integer, ForeignKey('grocery_stores.id'))
    last_edited_date = Column(DateTime, default=func.now(), onupdate=func.now())
    user = relationship("User", back_populates="invoices")
    grocery_store = relationship("GroceryStore", back_populates="invoices")
    items = relationship("Item", back_populates="invoice")

class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    invoice_id = Column(Integer, ForeignKey('invoices.id'))
    product_id = Column(Integer, ForeignKey('products.id'))
    quantity = Column(Integer)
    total_price = Column(Integer)
    unit_price = Column(Integer)
    invoice = relationship("Invoice", back_populates="items")
    product = relationship("Product", back_populates="items")

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String)
    reference = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=func.now())
    category_id = Column(Integer, ForeignKey('categories.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="products")
    category = relationship("Category", back_populates="products")
    items = relationship("Item", back_populates="product")

class GroceryStore(Base):
    __tablename__ = 'grocery_stores'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String)
    location = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="grocery_stores")
    invoices = relationship("Invoice", back_populates="grocery_store")

class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String)
    products = relationship("Product", back_populates="category")