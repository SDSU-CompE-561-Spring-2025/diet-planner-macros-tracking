from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class MealBase(BaseModel):
    name: str
    ingredients: dict
    calories: int

class Meal(MealBase):
    id: int

    class Config:
        orm_mode = True