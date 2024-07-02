from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from starlette.requests import Request

from src import schemas
from src.models import Invoice
from src.routes.products.controllers import get_products
from src.util.dependency import get_db

router = APIRouter(
    prefix="/products",
    tags=["Products"],
    responses={404: {"description": "Not found"}},
)
@router.get("/byUserId")
def read_invoices(user_id : int, db: Session = Depends(get_db)):
    try:
        invoices = get_products(db, user_id)
        return invoices
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))