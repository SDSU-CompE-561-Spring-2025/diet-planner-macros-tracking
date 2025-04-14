from fastapi import FastAPI
from .routers import users
from .database import Base, engine
from app.routers import meals, meal_plans, shopping_list, nutrition, restaurants

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(meals.router)
app.include_router(meal_plans.router)
app.include_router(shopping_list.router)
app.include_router(nutrition.router)
app.include_router(restaurants.router)
