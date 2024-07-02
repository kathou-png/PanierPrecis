from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session

from src import schemas, models
from src.routes.users.controllers import get_users
from src.util.dependency import get_db

router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
)

@router.get("", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    try:
        users = get_users(db)
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))