from sqlalchemy.orm import Session

from src import models

def get_grocery_stores_by_user_id(db: Session, user_id : int):
    return db.query(models.GroceryStore).filter_by(user_id=user_id).all()

