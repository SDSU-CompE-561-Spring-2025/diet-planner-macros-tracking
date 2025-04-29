from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import get_db
from external_api import fetch_food_nutrition, fetch_recipe_nutrition
router = APIRouter()

@router.post("/", response_model=schemas.Nutrition, responses={
    200: {"description": "Nutrition details retrieved successfully"},
    400: {"description": "Invalid request parameters"},
    500: {"description": "Internal server error"}
})
def get_food_nutrition(food: str, quantity: int, db: Session = Depends(get_db)):
    try:
        # Check if nutrition details already exist
        nutrition = db.query(models.Nutrition).filter(models.Nutrition.food == food).first()
        if nutrition:
            return nutrition

        # Fetch nutrition data for the food item
        app_id = "your_food_database_app_id"
        app_key = "your_food_database_app_key"
        data = fetch_food_nutrition(food, quantity, app_id, app_key)

        # Create new nutrition entry
        new_nutrition = models.Nutrition(
            food=food,
            quantity=quantity,
            calories=data["calories"],
            protein=data["protein"],
            fat=data["fat"],
            sugars=data["sugars"],
            carbs=data["carbs"]
        )
        db.add(new_nutrition)
        db.commit()
        db.refresh(new_nutrition)
        return new_nutrition
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", responses={
    200: {"description": "Recipe nutrition details retrieved successfully"},
    400: {"description": "Invalid request parameters"},
    500: {"description": "Internal server error"}
})
def get_recipe_nutrition(ingredients: list, db: Session = Depends(get_db)):
    try:
        # Fetch nutrition data for the recipe
        app_id = "your_nutrition_analysis_app_id"
        app_key = "your_nutrition_analysis_app_key"
        data = fetch_recipe_nutrition(ingredients, app_id, app_key)

        # Extract nutrition details
        calories = data.get("calories", 0)
        protein = data.get("totalNutrients", {}).get("PROCNT", {}).get("quantity", 0)
        fat = data.get("totalNutrients", {}).get("FAT", {}).get("quantity", 0)
        sugars = data.get("totalNutrients", {}).get("SUGAR", {}).get("quantity", 0)
        carbs = data.get("totalNutrients", {}).get("CHOCDF", {}).get("quantity", 0)

        return {
            "calories": calories,
            "protein": protein,
            "fat": fat,
            "sugars": sugars,
            "carbs": carbs
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))