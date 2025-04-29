from pydantic import BaseModel
from typing import List, Dict

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class MealBase(BaseModel):
    name: str
    ingredients: Dict[str, int]  # Updated to match JSON type
    calories: int

class Meal(MealBase):
    id: int

    class Config:
        from_attributes = True

class MealPlan(BaseModel):
    user_id: int
    meal_plan: List[dict]

    class Config:
        from_attributes = True

class ShoppingList(BaseModel):
    user_id: int
    item_name: str
    quantity: int

    class Config:
        from_attributes = True

# New Nutrition schema
class Nutrition(BaseModel):
    food: str
    quantity: int
    calories: int
    protein: int
    fat: int
    sugars: int
    carbs: int

    class Config:
        from_attributes = True

class RecipeNutrition(BaseModel):
    ingredients: List[str]
    calories: int
    protein: int
    fat: int
    sugars: int
    carbs: int