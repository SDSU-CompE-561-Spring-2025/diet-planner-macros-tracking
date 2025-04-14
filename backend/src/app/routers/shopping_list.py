from fastapi import APIRouter

router = APIRouter(
    prefix="/shopping_list",
    tags=["shopping_list"]
)

@router.get("/")
def get_shopping_list():
    return {"message": "shopping list"}
