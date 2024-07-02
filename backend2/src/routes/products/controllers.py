from sqlalchemy.orm import Session

from src import models

def get_products(db: Session, user_id : int):
    return db.query(models.Product).filter_by(user_id=user_id).all()

