from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import timedelta
import logging

from ..database import get_db
from ..models import User
from ..schemas import UserCreate, Token, UserResponse
from ..security import (
    create_access_token,
    get_password_hash,
    verify_password,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)
from ..dependencies import get_current_user

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter(
    tags=["authentication"]
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    logger.debug(f"Received registration request for email: {user.email}")
    logger.debug(f"Request data: name={user.name}, email={user.email}, password_length={len(user.password)}")
    
    try:
        # Check if user already exists
        logger.debug("Checking if user already exists...")
        db_user = db.query(User).filter(User.email == user.email).first()
        if db_user:
            logger.debug(f"User with email {user.email} already exists")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        logger.debug("Creating new user...")
        hashed_password = get_password_hash(user.password)
        db_user = User(
            email=user.email,
            name=user.name,
            hashed_password=hashed_password
        )
        
        logger.debug("Adding user to database...")
        db.add(db_user)
        
        logger.debug("Committing transaction...")
        db.commit()
        
        logger.debug("Refreshing user object...")
        db.refresh(db_user)
        
        logger.debug(f"Successfully created user with email: {user.email}")
        return UserResponse(
            id=db_user.id,
            email=db_user.email,
            name=db_user.name
        )
    except Exception as e:
        logger.error(f"Error creating user: {str(e)}")
        logger.error(f"Error type: {type(e).__name__}")
        logger.error(f"Error details: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create user: {str(e)}"
        )

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    logger.debug(f"Login attempt for email: {form_data.username}")
    
    # Authenticate user
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        logger.debug(f"User with email {form_data.username} not found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(form_data.password, user.hashed_password):
        logger.debug("Invalid password provided")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    logger.debug(f"Successfully logged in user: {user.email}")
    return Token(access_token=access_token, token_type="bearer")

@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get information about the currently logged-in user"""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name
    ) 