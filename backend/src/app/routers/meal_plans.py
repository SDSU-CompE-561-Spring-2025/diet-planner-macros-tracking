from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import get_db

router = APIRouter()

@router.post("/", responses={
    200: {"description": "Meal plan created successfully"},
    400: {"description": "Invalid request parameters"},
    500: {"description": "Internal server error"}
})
def create_meal_plan(meal_plan: schemas.MealPlan, db: Session = Depends(get_db)):
    try:
        # Logic to create meal plan
        return {"success": True, "message": "Meal plan created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{meal_plan_id}", responses={
    200: {"description": "Meal plan retrieved successfully"},
    404: {"description": "Meal plan not found"},
    500: {"description": "Internal server error"}
})
def get_meal_plan(meal_plan_id: int, db: Session = Depends(get_db)):
    db_meal_plan = db.query(models.MealPlan).filter(models.MealPlan.id == meal_plan_id).first()
    if not db_meal_plan:
        raise HTTPException(status_code=404, detail="Meal plan not found")
    return {"success": True, "meal_plan": db_meal_plan}

@router.put("/{meal_plan_id}", responses={
    200: {"description": "Meal plan updated successfully"},
    404: {"description": "Meal plan not found"},
    500: {"description": "Internal server error"}
})
def update_meal_plan(meal_plan_id: int, meal_plan: schemas.MealPlan, db: Session = Depends(get_db)):
    db_meal_plan = db.query(models.MealPlan).filter(models.MealPlan.id == meal_plan_id).first()
    if not db_meal_plan:
        raise HTTPException(status_code=404, detail="Meal plan not found")
    db_meal_plan.meal_plan = meal_plan.meal_plan
    db.commit()
    db.refresh(db_meal_plan)
    return {"success": True, "meal_plan": db_meal_plan}

@router.delete("/{meal_plan_id}", responses={
    200: {"description": "Meal plan deleted successfully"},
    404: {"description": "Meal plan not found"},
    500: {"description": "Internal server error"}
})
def delete_meal_plan(meal_plan_id: int, db: Session = Depends(get_db)):
    db_meal_plan = db.query(models.MealPlan).filter(models.MealPlan.id == meal_plan_id).first()
    if not db_meal_plan:
        raise HTTPException(status_code=404, detail="Meal plan not found")
    db.delete(db_meal_plan)
    db.commit()
    return {"success": True, "detail": "Meal plan deleted successfully"}