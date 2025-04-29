from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    meal_plans = relationship("MealPlan", back_populates="user")
    shopping_list = relationship("ShoppingList", back_populates="user")

class Meal(Base):
    __tablename__ = "meals"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    ingredients = Column(JSON, nullable=False)
    calories = Column(Integer, nullable=False)

class MealPlan(Base):
    __tablename__ = "meal_plans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    meal_plan = Column(JSON, nullable=False)
    user = relationship("User", back_populates="meal_plans")

class ShoppingList(Base):
    __tablename__ = "shopping_list"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    item_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    user = relationship("User", back_populates="shopping_list")
    
# New Nutrition model
class Nutrition(Base):
    __tablename__ = "nutrition"
    id = Column(Integer, primary_key=True, index=True)
    food = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    calories = Column(Integer, nullable=False)
    protein = Column(Integer, nullable=False)
    fat = Column(Integer, nullable=False)
    sugars = Column(Integer, nullable=False)
    carbs = Column(Integer, nullable=False)