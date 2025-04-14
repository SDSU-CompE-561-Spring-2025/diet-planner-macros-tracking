from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Meal, responses={
    200: {"description": "Meal created successfully"},
    400: {"description": "Invalid request parameters"},
    500: {"description": "Internal server error"}
})
def create_meal(meal: schemas.MealBase, db: Session = Depends(get_db)):
    try:
        db_meal = crud.create_meal(db=db, meal=meal)
        return {"success": True, "meal": db_meal}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))