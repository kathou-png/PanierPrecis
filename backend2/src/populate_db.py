# populate_db.py
import uuid
from database import SessionLocal
from models import User, Category, GroceryStore, Product, Invoice, Item
from datetime import datetime

def reset_database():
    print("Resetting database")
    with SessionLocal() as db:
        db.query(Item).delete()
        db.query(Invoice).delete()
        db.query(Product).delete()
        db.query(GroceryStore).delete()
        db.query(Category).delete()
        db.query(User).delete()
        db.commit()
        print("Database reset")


def seed_users():
    users = [
        {'username': "User 1", 'email': "user1@user1.com", 'password': "password1"},
        {'username': "User 2", 'email': "user2@user2.com", 'password': "password2"},
    ]
    with SessionLocal() as db:
        for user_data in users:
            user = User(**user_data, created_at=datetime.now())
            db.add(user)
        db.commit()
    print("*** Users populated successfully. ***")


def seed_categories():
    categories = [
        {'title': "home"}, {'title': "fruit"}, {'title': "vegetable"},
        {'title': "meat"}, {'title': "fish"}, {'title': "alcohol"},
        {'title': "drink"}, {'title': "hygenic"}, {'title': "beauty"},
        {'title': "saltedItems"}, {'title': "sweetItems"}, {'title': "baby"},
        {'title': "animals"}, {'title': "bio"}, {'title': "other"}
    ]
    with SessionLocal() as db:
        for category in categories:
            db.add(Category(**category))
        db.commit()
    print("*** Categories populated successfully. ***")


def seed_grocery_stores():
    grocery_stores = [
        {'title': "Auchan", 'location': "3 rue des connards"},
        {'title': "Liddl", 'location': "10 avenue des violettes"},
    ]
    with SessionLocal() as db:
        users = db.query(User).all()
        for user in users:
            for store in grocery_stores:
                db.add(GroceryStore(user_id=user.id, **store))
        db.commit()
    print("*** Grocery stores populated successfully. ***")


def seed_products():
    with SessionLocal() as db:
        categories = db.query(Category).all()
        users = db.query(User).all()
        for user in users:
            for category in categories:
                db.add(Product(
                    title=f"Product1 of {category.title} for user {user.id}",
                    reference=str(uuid.uuid4()),
                    category_id=category.id,
                    user_id=user.id
                ))
                db.add(Product(
                    title=f"Product2 of {category.title} for user {user.id}",
                    reference=str(uuid.uuid4()),
                    category_id=category.id,
                    user_id=user.id
                ))
        db.commit()
    print("*** Products populated successfully. ***")


def seed_invoices():
    with SessionLocal() as db:
        users = db.query(User).all()
        grocery_stores = db.query(GroceryStore).all()
        for user in users:
            for store in grocery_stores:
                db.add(Invoice(
                    title=f"Invoice for {user.username} at {store.title}",
                    user_id=user.id,
                    grocery_store_id=store.id
                ))
        db.commit()
    print("*** Invoices populated successfully. ***")


def seed_items():
    with SessionLocal() as db:
        invoices = db.query(Invoice).all()
        products = db.query(Product).all()
        price = 1
        for invoice in invoices:
            for product in products:
                db.add(Item(
                    quantity=1,  # Adjust quantity as needed
                    total_price=price * 1,  # Assuming price is stored in the product model
                    product_id=product.id,
                    invoice_id=invoice.id,
                    unit_price=price
                ))
                price += 1
        db.commit()
    print("*** Items populated successfully. ***")


def main():
    reset_database()
    print("---------- Database reset complete. ----------")
    seed_users()
    seed_categories()
    seed_grocery_stores()
    seed_products()
    seed_invoices()
    seed_items()
    print("---------- Population complete. ----------")


if __name__ == "__main__":
    main()
