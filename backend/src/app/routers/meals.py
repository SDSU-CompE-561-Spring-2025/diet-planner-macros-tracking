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

@router.get("/{meal_id}", response_model=schemas.Meal, responses={
    200: {"description": "Meal retrieved successfully"},
    404: {"description": "Meal not found"},
    500: {"description": "Internal server error"}
})
def get_meal(meal_id: int, db: Session = Depends(get_db)):
    db_meal = db.query(models.Meal).filter(models.Meal.id == meal_id).first()
    if not db_meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    return {"success": True, "meal": db_meal}

@router.put("/{meal_id}", response_model=schemas.Meal, responses={
    200: {"description": "Meal updated successfully"},
    404: {"description": "Meal not found"},
    500: {"description": "Internal server error"}
})
def update_meal(meal_id: int, meal: schemas.MealBase, db: Session = Depends(get_db)):
    db_meal = db.query(models.Meal).filter(models.Meal.id == meal_id).first()
    if not db_meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    db_meal.name = meal.name
    db_meal.ingredients = meal.ingredients
    db_meal.calories = meal.calories
    db.commit()
    db.refresh(db_meal)
    return {"success": True, "meal": db_meal}

@router.delete("/{meal_id}", responses={
    200: {"description": "Meal deleted successfully"},
    404: {"description": "Meal not found"},
    500: {"description": "Internal server error"}
})
def delete_meal(meal_id: int, db: Session = Depends(get_db)):
    db_meal = db.query(models.Meal).filter(models.Meal.id == meal_id).first()
    if not db_meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    db.delete(db_meal)
    db.commit()
    return {"success": True, "detail": "Meal deleted successfully"}