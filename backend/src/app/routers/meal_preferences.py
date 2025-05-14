from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import MealPreferences
from ..schemas import MealPreferencesCreate, MealPreferencesResponse
from ..dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=MealPreferencesResponse)
def create_meal_preferences(
    preferences: MealPreferencesCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Create or update meal preferences for the current user"""
    # Check if preferences already exist
    existing_prefs = db.query(MealPreferences).filter(
        MealPreferences.user_id == current_user.id
    ).first()

    if existing_prefs:
        # Update existing preferences
        for key, value in preferences.dict().items():
            setattr(existing_prefs, key, value)
        db.commit()
        db.refresh(existing_prefs)
        return existing_prefs
    
    # Create new preferences
    db_preferences = MealPreferences(
        user_id=current_user.id,
        **preferences.dict()
    )
    db.add(db_preferences)
    db.commit()
    db.refresh(db_preferences)
    return db_preferences

@router.get("/", response_model=MealPreferencesResponse)
def get_meal_preferences(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get meal preferences for the current user"""
    preferences = db.query(MealPreferences).filter(
        MealPreferences.user_id == current_user.id
    ).first()
    
    if not preferences:
        raise HTTPException(status_code=404, detail="Meal preferences not found")
    
    return preferences 