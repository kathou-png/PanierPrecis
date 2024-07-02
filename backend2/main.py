from typing import Annotated

from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request

from src import models
from src.models import User
from src.routes.users import main as users
from src.routes.invoices import main as invoices
from src.routes.categories import main as categories
from src.routes.groceryStores import main as groceryStores
from src.routes.products import main as products
from src.config.database import engine
from src.util.dependency import get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Panier Précis",
    version="V0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)
@app.get("/")
def hello_world():
    return "Hello World!"

@app.post("/login")
async def login(db: Session = Depends(get_db), request: Request = None):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")
    print(email, password)
    try :
        user = db.query(User).filter_by(email=email).one_or_none()

        if user is None:
            raise HTTPException(status_code=400, detail="User does not exists")
        elif user.password != password :
            raise HTTPException(status_code=400, detail="Incorrect password")


        return {user}
    except Exception as e:
        raise

app.include_router(users.router)
app.include_router(invoices.router)
app.include_router(products.router)
app.include_router(categories.router)
app.include_router(groceryStores.router)
