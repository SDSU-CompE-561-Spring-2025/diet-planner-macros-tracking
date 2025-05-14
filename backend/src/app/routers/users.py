from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, models
from ..database import get_db

router = APIRouter(tags=["users"])

@router.post("/", response_model=schemas.UserResponse, responses={
    200: {"description": "User created successfully"},
    400: {"description": "Email already registered"},
    500: {"description": "Internal server error"}
})
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return {"success": True, "user": crud.create_user(db=db, user=user)}

@router.get("/", response_model=List[schemas.UserResponse])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users

@router.get("/{user_id}", response_model=schemas.UserResponse, responses={
    200: {"description": "User retrieved successfully"},
    404: {"description": "User not found"},
    500: {"description": "Internal server error"}
})
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"success": True, "user": db_user}

@router.put("/{user_id}", response_model=schemas.UserResponse, responses={
    200: {"description": "User updated successfully"},
    404: {"description": "User not found"},
    500: {"description": "Internal server error"}
})
def update_user(user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.name = user.name
    db_user.email = user.email
    db_user.password = user.password  # Add hashing logic if needed
    db.commit()
    db.refresh(db_user)
    return {"success": True, "user": db_user}

@router.delete("/{user_id}", responses={
    200: {"description": "User deleted successfully"},
    404: {"description": "User not found"},
    500: {"description": "Internal server error"}
})
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"success": True, "detail": "User deleted successfully"}