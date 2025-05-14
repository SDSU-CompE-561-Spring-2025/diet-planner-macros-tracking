from typing import Optional
from sqlalchemy.orm import Session
from . import models, schemas
from .security import get_password_hash

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()

def create_meal(db: Session, meal: schemas.MealBase) -> models.Meal:
    db_meal = models.Meal(name=meal.name, ingredients=meal.ingredients, calories=meal.calories)
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    return db_meal