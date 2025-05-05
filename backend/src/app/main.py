from fastapi import FastAPI
from .routers import users, meals, meal_plans, shopping_list, nutrition, restaurants
from .database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)


app = FastAPI()
# Middleware to handle CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users, prefix="/api/users", tags=["users"])
app.include_router(meals, prefix="/api/meals", tags=["meals"])
app.include_router(meal_plans, prefix="/api/meal-plans", tags=["meal_plans"])
app.include_router(shopping_list, prefix="/api/shopping-list", tags=["shopping_list"])
app.include_router(nutrition, prefix="/api/nutrition", tags=["nutrition"])
app.include_router(restaurants, prefix="/api/restaurants", tags=["restaurants"])