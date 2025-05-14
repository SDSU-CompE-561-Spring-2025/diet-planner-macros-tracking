from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, restaurants, recipes
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
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Diet Planner API"}