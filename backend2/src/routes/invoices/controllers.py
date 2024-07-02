from sqlalchemy.orm import Session

from src import models

def get_invoices(db: Session, user_id : int):
    return db.query(models.Invoice).filter_by(user_id=user_id).all()

