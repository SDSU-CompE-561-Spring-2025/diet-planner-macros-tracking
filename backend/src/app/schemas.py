from pydantic import BaseModel
from typing import List

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
    ingredients: str
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