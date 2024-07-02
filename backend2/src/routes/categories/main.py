from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session

from src import models
from src.util.dependency import get_db

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
    responses={404: {"description": "Not found"}},
)
@router.get("")
def read_categories(db: Session = Depends(get_db)):
    try:
        categories = db.query(models.Category).all()
        return categories
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
