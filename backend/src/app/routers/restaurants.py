from fastapi import APIRouter

router = APIRouter(
    prefix="/restaurants",
    tags=["restaurants"]
)

@router.get("/")
def get_restaurants():
    return {"message": "List of restaurants"}
