from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, restaurants, recipes, meal_preferences, nutrition
from . import models
from .database import engine

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]  # Allow the client to read all response headers
)

# Include routers - ensure paths start with forward slashes
app.include_router(auth, prefix="/api/auth", tags=["auth"])
app.include_router(restaurants, prefix="/api/restaurants", tags=["restaurants"])
app.include_router(recipes, prefix="/api/recipes", tags=["recipes"])
app.include_router(meal_preferences, prefix="/api/preferences", tags=["preferences"])
app.include_router(nutrition, prefix="/api/nutrition", tags=["nutrition"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Diet Planner API"}