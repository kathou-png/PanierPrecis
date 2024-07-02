from sqlalchemy.orm import Session

from src import models

def get_users(db: Session):
    return db.query(models.User).all()

