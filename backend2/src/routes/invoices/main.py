from typing import Annotated

from fastapi import Depends, APIRouter, HTTPException, Form, UploadFile, File
from sqlalchemy.orm import Session
from starlette.requests import Request

from src import schemas
from src.models import Invoice, Product, Category, Item
from src.routes.invoices.controllers import get_invoices
from src.util.dependency import get_db

router = APIRouter(
    prefix="/invoices",
    tags=["Invoices"],
    responses={404: {"description": "Not found"}},
)
@router.get("/byUser")
def read_invoices(user_id : int, db: Session = Depends(get_db)):
    try:
        invoices = get_invoices(db, user_id)
        return invoices
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/byId")
async def get_items_by_invoice_id(invoice_id: int, db: Session = Depends(get_db)):
    items = db.query(Item).filter(Item.invoice_id == invoice_id).all()

    if not items:
        raise HTTPException(status_code=404, detail="Items not found for the given invoice ID")

    response_data = []
    for item in items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        category = db.query(Category).filter(Category.id == product.category_id).first()

        item_data = {
            "id": item.id,
            "product" : product,
            "category": category,
            "reference": product.reference,
            "quantity": item.quantity,
            "createdAt": item.invoice.created_at,
            "totalPrice": item.total_price,
            "unitPrice": item.unit_price
        }
        response_data.append(item_data)

    return response_data

@router.post("")
async def create_invoice(
    title: str = Form(...),
    password: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Process the PDF file
    contents = await file.read()
    # data = await request.json()
    # title = data.get("title")
    # grocery_store_id = data.get("grocery_store_id")
    # user_id = data.get("user_id")
    # pdf_file = data.get("pdf_file")
    # print(pdf_file)
    # try :
    #     invoice = Invoice(title=title, grocery_store_id=grocery_store_id, user_id=user_id)
    #     db.add(invoice)
    #     db.commit()
    #     db.refresh(invoice)
    #     return invoice
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))

@router.delete("")
async def delete_invoice(invoice_id : int , db: Session = Depends(get_db)):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    db.delete(invoice)
    db.commit()
    return {"message": "Invoice deleted successfully"}

