from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session

from src.routes.groceryStores.controllers import get_grocery_stores_by_user_id
from src.util.dependency import get_db

router = APIRouter(
    prefix="/groceryStores",
    tags=["GroceryStores"],
    responses={404: {"description": "Not found"}},
)


@router.get("/byUserId")
def read_grocery_stores(user_id : int, db: Session = Depends(get_db)):
    print(user_id)
    try:
        invoices = get_grocery_stores_by_user_id(db, user_id)
        return invoices
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
