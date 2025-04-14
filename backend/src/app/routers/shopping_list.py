from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import get_db

router = APIRouter()

@router.post("/", responses={
    200: {"description": "Shopping list created successfully"},
    400: {"description": "Invalid request parameters"},
    500: {"description": "Internal server error"}
})
def create_shopping_list(shopping_list: schemas.ShoppingList, db: Session = Depends(get_db)):
    try:
        # Logic to create shopping list
        return {"success": True, "message": "Shopping list created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{shopping_list_id}", responses={
    200: {"description": "Shopping list retrieved successfully"},
    404: {"description": "Shopping list not found"},
    500: {"description": "Internal server error"}
})
def get_shopping_list(shopping_list_id: int, db: Session = Depends(get_db)):
    db_shopping_list = db.query(models.ShoppingList).filter(models.ShoppingList.id == shopping_list_id).first()
    if not db_shopping_list:
        raise HTTPException(status_code=404, detail="Shopping list not found")
    return {"success": True, "shopping_list": db_shopping_list}

@router.put("/{shopping_list_id}", responses={
    200: {"description": "Shopping list updated successfully"},
    404: {"description": "Shopping list not found"},
    500: {"description": "Internal server error"}
})
def update_shopping_list(shopping_list_id: int, shopping_list: schemas.ShoppingList, db: Session = Depends(get_db)):
    db_shopping_list = db.query(models.ShoppingList).filter(models.ShoppingList.id == shopping_list_id).first()
    if not db_shopping_list:
        raise HTTPException(status_code=404, detail="Shopping list not found")
    db_shopping_list.item_name = shopping_list.item_name
    db_shopping_list.quantity = shopping_list.quantity
    db.commit()
    db.refresh(db_shopping_list)
    return {"success": True, "shopping_list": db_shopping_list}

@router.delete("/{shopping_list_id}", responses={
    200: {"description": "Shopping list deleted successfully"},
    404: {"description": "Shopping list not found"},
    500: {"description": "Internal server error"}
})
def delete_shopping_list(shopping_list_id: int, db: Session = Depends(get_db)):
    db_shopping_list = db.query(models.ShoppingList).filter(models.ShoppingList.id == shopping_list_id).first()
    if not db_shopping_list:
        raise HTTPException(status_code=404, detail="Shopping list not found")
    db.delete(db_shopping_list)
    db.commit()
    return {"success": True, "detail": "Shopping list deleted successfully"}