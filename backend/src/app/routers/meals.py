from fastapi import APIRouter

router = APIRouter(
    prefix="/meals",
    tags=["meals"]
)

@router.get("/")
def get_meals():
    return {"message": "List of meals"}
